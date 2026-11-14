const CAPE_TYPES = [
  { code: "CAPE", name: "Обычный плащ" },
  { code: "CAPEITEM_AVALON", name: "Авалонский плащ" },
  { code: "CAPEITEM_DEMON", name: "Демонический плащ" },
  { code: "CAPEITEM_FW_BRECILIEN", name: "Плащ Бресилиона" },
  { code: "CAPEITEM_FW_BRIDGEWATCH", name: "Плащ Бриджуотча" },
  { code: "CAPEITEM_FW_CAERLEON", name: "Плащ Карлеона" },
  { code: "CAPEITEM_FW_FORTSTERLING", name: "Плащ Форт Стерлинга" },
  { code: "CAPEITEM_FW_LYMHURST", name: "Плащ Люмхурста" },
  { code: "CAPEITEM_FW_MARTLOCK", name: "Плащ Мартлока" },
  { code: "CAPEITEM_FW_THETFORD", name: "Плащ Тетфорда" },
  { code: "CAPEITEM_HERETIC", name: "Плащ еретиков" },
  { code: "CAPEITEM_KEEPER", name: "Плащ хранителей" },
  { code: "CAPEITEM_MORGANA", name: "Плащ Морганы" },
  { code: "CAPEITEM_SMUGGLER", name: "Плащ контрабандистов" },
  { code: "CAPEITEM_UNDEAD", name: "Плащ нежити" }
];

const ITEMS_DB = [];

// Автоматически создаем все тиры (T4-T8) и зачарования (.0-.4) для каждого плаща
CAPE_TYPES.forEach(cape => {
  for (let tier = 4; tier <= 8; tier++) {
    for (let ench = 0; ench <= 4; ench++) {
      const enchSuffix = ench === 0 ? "" : `@${ench}`;
      ITEMS_DB.push({
        id: `T${tier}_${cape.code}${enchSuffix}`,
        name: `${cape.name} (T${tier}.${ench})`,
        cat: "cape"
      });
    }
  }
});

const MAIN_SLOTS = [
  { key: "bag", label: "Сумка", hidden: true },
  { key: "head", label: "Голова" },
  { key: "cape", label: "Плащ" },
  { key: "weapon", label: "Оружие" },
  { key: "armor", label: "Броня" },
  { key: "offhand", label: "Лев. рука" },
  { key: "potion", label: "Зелье" },
  { key: "shoes", label: "Обувь" },
  { key: "food", label: "Еда" }
];

let party = JSON.parse(localStorage.getItem("albion_custom_party")) || [
  { name: "Человек 1", equip: {}, swaps: [] }
];

let activeTarget = null;

function startBuilder() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("builderScreen").classList.add("active");
  renderParty();
}

function showWelcome() {
  document.getElementById("builderScreen").classList.remove("active");
  document.getElementById("welcomeScreen").style.display = "block";
}

function getRenderUrl(itemCode) {
  return `icons/${itemCode}.png`;
}

let draggedItem = null; // Хранит информацию о перетаскиваемом предмете

function renderParty() {
  const row = document.getElementById("partyRow");
  row.innerHTML = "";

  party.forEach((member, idx) => {
    const col = document.createElement("div");
    col.className = "role-column";

    const header = document.createElement("div");
    header.className = "role-header";
    header.innerHTML = `
      <input type="text" value="${member.name}" onchange="renameMember(${idx}, this.value)" />
      ${party.length > 1 ? `<button class="remove-role-btn" title="Удалить роль" onclick="removeMember(${idx})">✕</button>` : ""}
    `;
    col.appendChild(header);

    const card = document.createElement("div");
    card.className = "build-card";

    const grid = document.createElement("div");
    grid.className = "equip-grid";

    MAIN_SLOTS.forEach(s => {
      const slotDiv = document.createElement("div");
      const itemCode = member.equip[s.key];
      slotDiv.className = "slot" + (s.hidden ? " invisible" : "") + (!itemCode ? " empty" : "");
      slotDiv.setAttribute("data-label", s.label);

      if (!s.hidden) {
        slotDiv.onclick = () => openModal(idx, "equip", s.key, s.label);
        if (itemCode) {
          slotDiv.innerHTML = `<img src="${getRenderUrl(itemCode)}" alt="" />`;
          slotDiv.draggable = true;
          slotDiv.ondragstart = (e) => handleDragStart(e, idx, "equip", s.key, itemCode);
        }
        slotDiv.ondragover = (e) => e.preventDefault();
        slotDiv.ondrop = (e) => handleDrop(e, idx, "equip", s.key);
      }
      grid.appendChild(slotDiv);
    });
    card.appendChild(grid);

    const swapsSec = document.createElement("div");
    swapsSec.className = "swaps-section";
    swapsSec.innerHTML = `<div class="swaps-title">Замены (Swaps)</div>`;

    const swapsRow = document.createElement("div");
    swapsRow.className = "swaps-row";

    member.swaps.forEach((swapCode, swapIdx) => {
      const sDiv = document.createElement("div");
      sDiv.className = "slot" + (!swapCode ? " empty" : "");
      sDiv.setAttribute("data-label", `Свап ${swapIdx + 1}`);
      sDiv.onclick = () => openModal(idx, "swap", swapIdx, `Замена ${swapIdx + 1}`);

      if (swapCode) {
        sDiv.innerHTML = `<img src="${getRenderUrl(swapCode)}" alt="" />`;
        sDiv.draggable = true;
        sDiv.ondragstart = (e) => handleDragStart(e, idx, "swap", swapIdx, swapCode);
      }
      sDiv.ondragover = (e) => e.preventDefault();
      sDiv.ondrop = (e) => handleDrop(e, idx, "swap", swapIdx);

      swapsRow.appendChild(sDiv);
    });

    const addSwapBtn = document.createElement("div");
    addSwapBtn.className = "add-swap-btn";
    addSwapBtn.title = "Добавить слот замены";
    addSwapBtn.textContent = "+";
    addSwapBtn.onclick = () => addSwapSlot(idx);
    swapsRow.appendChild(addSwapBtn);

    swapsSec.appendChild(swapsRow);
    card.appendChild(swapsSec);
    col.appendChild(card);
    row.appendChild(col);
  });

  const addRoleCard = document.createElement("div");
  addRoleCard.className = "add-role-card";
  addRoleCard.onclick = addMember;
  addRoleCard.innerHTML = `<span>+</span><small>Добавить роль</small>`;
  row.appendChild(addRoleCard);
}

function handleDragStart(e, memberIdx, type, key, code) {
  draggedItem = { memberIdx, type, key, code };
  e.dataTransfer.effectAllowed = "copyMove";
}

function handleDrop(e, targetMemberIdx, targetType, targetKey) {
  e.preventDefault();
  if (!draggedItem) return;

  // Не делаем ничего, если бросили в тот же самый слот
  if (
    draggedItem.memberIdx === targetMemberIdx &&
    draggedItem.type === targetType &&
    draggedItem.key === targetKey
  ) {
    return;
  }

  // Проверка категории: в основной слот (голова, плащ и т.д.) можно класть только подходящий тип предмета
  if (targetType === "equip") {
    const itemObj = ITEMS_DB.find(i => i.id === draggedItem.code);
    if (itemObj && itemObj.cat !== targetKey) {
      return; // Игнорируем сброс, если категория не совпадает со слотом
    }
  }

  const isCopy = e.ctrlKey || e.shiftKey; // Удерживание Ctrl или Shift копирует предмет
  const targetExistingCode = targetType === "equip"
    ? party[targetMemberIdx].equip[targetKey]
    : party[targetMemberIdx].swaps[targetKey];

  // Записываем перетащенный предмет в целевой слот
  if (targetType === "equip") {
    party[targetMemberIdx].equip[targetKey] = draggedItem.code;
  } else {
    party[targetMemberIdx].swaps[targetKey] = draggedItem.code;
  }

  // Если не зажато копирование — очищаем старый слот (или меняем предметы местами)
  if (!isCopy) {
    if (draggedItem.type === "equip") {
      if (targetExistingCode) party[draggedItem.memberIdx].equip[draggedItem.key] = targetExistingCode;
      else delete party[draggedItem.memberIdx].equip[draggedItem.key];
    } else {
      party[draggedItem.memberIdx].swaps[draggedItem.key] = targetExistingCode || null;
    }
  }

  draggedItem = null;
  renderParty();
}

function addMember() {
  party.push({ name: `Человек ${party.length + 1}`, equip: {}, swaps: [] });
  renderParty();
}

function removeMember(idx) {
  party.splice(idx, 1);
  renderParty();
}

function renameMember(idx, val) {
  party[idx].name = val;
}

function addSwapSlot(memberIdx) {
  party[memberIdx].swaps.push(null);
  renderParty();
}

function openModal(memberIdx, type, key, label) {
  activeTarget = { memberIdx, type, key };
  document.getElementById("modalTitle").textContent = `${party[memberIdx].name} — ${label}`;
  document.getElementById("searchInput").value = "";

  const catSelect = document.getElementById("categorySelect");
  if (type === "equip") {
    catSelect.value = key;
    catSelect.disabled = true; // Жесткая привязка к слоту
  } else {
    catSelect.value = "all";
    catSelect.disabled = false; // Для свапов доступны все категории
  }

  document.getElementById("modal").classList.add("active");
  renderItemChoices();
}
function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

// Закрытие при клике на темный фон вокруг окна
document.getElementById("modal").addEventListener("click", function(e) {
  if (e.target === this) closeModal();
});

function getRenderUrl(itemCode) {
  return `icons/${itemCode}.png`;
}

function renderItemChoices() {
  const list = document.getElementById("itemsList");
  const query = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categorySelect").value;
  const tier = document.getElementById("tierSelect").value;       // "T4" .. "T8"
  const enchant = document.getElementById("enchantSelect").value; // "", "@1" .. "@4"

  list.innerHTML = "";

  const filtered = ITEMS_DB.filter(item => {
    const matchesCat = category === "all" || item.cat === category;
    const matchesQuery = item.name.toLowerCase().includes(query);

    // Проверяем совпадение тира и зачарования по ID предмета
    const matchesTier = item.id.startsWith(`${tier}_`);
    const matchesEnch = enchant === ""
      ? !item.id.includes("@")
      : item.id.endsWith(enchant);

    return matchesCat && matchesQuery && matchesTier && matchesEnch;
  });

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = "item-option";
    div.innerHTML = `<img src="${getRenderUrl(item.id)}" loading="lazy" alt="" /><span>${item.name}</span>`;
    div.onclick = () => selectItem(item.id);
    list.appendChild(div);
  });
}
function selectItem(fullCode) {
  if (!activeTarget) return;
  const { memberIdx, type, key } = activeTarget;
  if (type === "equip") party[memberIdx].equip[key] = fullCode;
  else party[memberIdx].swaps[key] = fullCode;
  closeModal();
  renderParty();
}

function clearCurrentSlot() {
  if (!activeTarget) return;
  const { memberIdx, type, key } = activeTarget;
  if (type === "equip") delete party[memberIdx].equip[key];
  else party[memberIdx].swaps.splice(key, 1); // Удаляет сам слот замены
  closeModal();
  renderParty();
}

function saveBuilds() {
  localStorage.setItem("albion_custom_party", JSON.stringify(party));
  alert("Сборка сохранена!");
}

function resetParty() {
  if (confirm("Сбросить всё и оставить 1 пустую карточку?")) {
    party = [{ name: "Человек 1", equip: {}, swaps: [] }];
    renderParty();
  }
}
async function exportToPng() {
  if (typeof html2canvas === "undefined") {
    alert("Библиотека html2canvas не подключена в index.html! Проверьте тег <script>.");
    return;
  }

  const captureArea = document.getElementById("captureArea");
  const titleInput = document.getElementById("partyTitleInput").value.trim();
  const bannerTitle = document.getElementById("bannerTitle");

  bannerTitle.textContent = titleInput || "Albion Online — Сборка группы";
  captureArea.classList.add("is-exporting");

  // Временно заменяем поля ввода имен на обычный текст, чтобы html2canvas не выдавал ошибку
  const inputs = captureArea.querySelectorAll(".role-header input");
  const tempSpans = [];
  inputs.forEach(inp => {
    const span = document.createElement("span");
    span.textContent = inp.value;
    span.style.cssText = "font-weight:700; font-size:1rem; width:100%; text-align:center; display:block;";
    inp.style.display = "none";
    inp.parentNode.insertBefore(span, inp);
    tempSpans.push({ inp, span });
  });

  try {
    const canvas = await html2canvas(captureArea, {
      backgroundColor: "#0f171e",
      useCORS: true,
      allowTaint: false,
      scale: 2
    });

    const link = document.createElement("a");
    link.download = (titleInput ? titleInput.replace(/\s+/g, "_") : "albion_party") + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (err) {
    alert("Ошибка экспорта: " + err.message);
    console.error(err);
  } finally {
    tempSpans.forEach(({ inp, span }) => {
      span.remove();
      inp.style.display = "";
    });
    captureArea.classList.remove("is-exporting");
  }
}
