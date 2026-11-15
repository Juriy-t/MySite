const CAPE_TYPES = [
  { code: "CAPE", name: "Обычный плащ" },
  { code: "CAPEITEM_AVALON", name: "Авалонский плащ" },
  { code: "CAPEITEM_DEMON", name: "Демонический плащ" },
  { code: "CAPEITEM_FW_BRECILIEN", name: "Плащ Бресилиона" },
  { code: "CAPEITEM_FW_BRIDGEWATCH", name: "Плащ Бриджуотча" },
  { code: "CAPEITEM_FW_CAERLEON", name: "Плащ Карлеона" },
  { code: "CAPEITEM_FW_FORTSTERLING", name: "Плащ Форт Стерлинга" },
  { code: "CAPEITEM_FW_LYMHURST", name: "Плащ Лимхерста" },
  { code: "CAPEITEM_FW_MARTLOCK", name: "Плащ Мартлока" },
  { code: "CAPEITEM_FW_THETFORD", name: "Плащ Тетфорда" },
  { code: "CAPEITEM_HERETIC", name: "Плащ еретиков" },
  { code: "CAPEITEM_KEEPER", name: "Плащ хранителей" },
  { code: "CAPEITEM_MORGANA", name: "Плащ Морганы" },
  { code: "CAPEITEM_SMUGGLER", name: "Плащ контрабандистов" },
  { code: "CAPEITEM_UNDEAD", name: "Плащ нежити" }
];

const CLOTH_ARMOR_TYPES = [
  { code: "ARMOR_CLOTH_SET1", name: "Мантия ученого" },
  { code: "ARMOR_CLOTH_SET2", name: "Мантия клирика" },
  { code: "ARMOR_CLOTH_SET3", name: "Мантия чародея" },
  { code: "ARMOR_CLOTH_ROYAL", name: "Королевская мантия" },
  { code: "ARMOR_CLOTH_KEEPER", name: "Мантия друида" },
  { code: "ARMOR_CLOTH_HELL", name: "Дьявольская мантия" },
  { code: "ARMOR_CLOTH_MORGANA", name: "Мантия культиста" },
  { code: "ARMOR_CLOTH_AVALON", name: "Мантия чистоты" },
  { code: "ARMOR_CLOTH_FEY", name: "Мантия из чешуи фей" }
];

const ITEMS_DB = [];

function registerItemGroup(list, category) {
  list.forEach(item => {
    for (let tier = 4; tier <= 8; tier++) {
      for (let ench = 0; ench <= 4; ench++) {
        const enchSuffix = ench === 0 ? "" : `@${ench}`;
        ITEMS_DB.push({
          id: `T${tier}_${item.code}${enchSuffix}`,
          name: `${item.name} (T${tier}.${ench})`,
          cat: category
        });
      }
    }
  });
}

registerItemGroup(CAPE_TYPES, "cape");
registerItemGroup(CLOTH_ARMOR_TYPES, "armor");

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
let draggedItem = null;

function getRenderUrl(fullString, overrideQuality) {
  var parts = fullString.split(":");
  var itemCode = parts[0];
  var quality = overrideQuality || parts[1] || "1";

  var host = "render." + "jesucristo69" + ".com";
  var path = "/render/item/" + itemCode + ".webp?size=128&quality=" + quality;
  var original = "https://" + host + path;
  return "https://" + "wsrv.nl" + "/?url=" + encodeURIComponent(original) + "&output=png";
}
function startBuilder() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("builderScreen").classList.add("active");
  renderParty();
}

function showWelcome() {
  document.getElementById("builderScreen").classList.remove("active");
  document.getElementById("welcomeScreen").style.display = "block";
}
function renderParty() {
  const row = document.getElementById("partyRow");
  row.innerHTML = "";
  localStorage.setItem("albion_custom_party", JSON.stringify(party));

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
          slotDiv.innerHTML = `<img src="${getRenderUrl(itemCode)}" crossorigin="anonymous" alt="" />`;
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
        sDiv.innerHTML = `<img src="${getRenderUrl(swapCode)}" crossorigin="anonymous" alt="" />`;
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

  if (
    draggedItem.memberIdx === targetMemberIdx &&
    draggedItem.type === targetType &&
    draggedItem.key === targetKey
  ) {
    return;
  }

  if (targetType === "equip") {
    const cleanCode = draggedItem.code.split(":")[0];
    const itemObj = ITEMS_DB.find(i => i.id === cleanCode);
    if (itemObj && itemObj.cat !== targetKey) {
      return;
    }
  }

  const isCopy = e.ctrlKey || e.shiftKey;
  const targetExistingCode = targetType === "equip"
    ? party[targetMemberIdx].equip[targetKey]
    : party[targetMemberIdx].swaps[targetKey];

  if (targetType === "equip") {
    party[targetMemberIdx].equip[targetKey] = draggedItem.code;
  } else {
    party[targetMemberIdx].swaps[targetKey] = draggedItem.code;
  }

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
  localStorage.setItem("albion_custom_party", JSON.stringify(party));
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
    catSelect.style.display = "none";
  } else {
    catSelect.value = "all";
    catSelect.style.display = "inline-block";
  }

  document.getElementById("modal").classList.add("active");
  renderItemChoices();
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.remove("active");
}

window.addEventListener("click", function(e) {
  const modal = document.getElementById("modal");
  if (e.target === modal) closeModal();
});

window.addEventListener("keydown", function(e) {
  if (e.key === "Escape") closeModal();
});

function renderItemChoices() {
  const list = document.getElementById("itemsList");
  const query = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categorySelect").value;
  const tier = document.getElementById("tierSelect").value;
  const enchant = document.getElementById("enchantSelect").value;
  const quality = document.getElementById("qualitySelect").value;

  list.innerHTML = "";

  const filtered = ITEMS_DB.filter(item => {
    const matchesCat = category === "all" || item.cat === category;
    const matchesQuery = item.name.toLowerCase().includes(query);
    const matchesTier = item.id.startsWith(`${tier}_`);
    const matchesEnch = enchant === ""
      ? !item.id.includes("@")
      : item.id.endsWith(enchant);

    return matchesCat && matchesQuery && matchesTier && matchesEnch;
  });

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = "item-option";
    div.innerHTML = `<img src="${getRenderUrl(item.id, quality)}" loading="lazy" alt="" /><span>${item.name}</span>`;
    div.onclick = () => selectItem(`${item.id}:${quality}`);
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
  else party[memberIdx].swaps.splice(key, 1);
  closeModal();
  renderParty();
}

function shareBuildLink() {
  try {
    const jsonStr = JSON.stringify(party);
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
    const shareUrl = `${window.location.origin}${window.location.pathname}#build=${encoded}`;

    window.history.replaceState(null, "", `#build=${encoded}`);
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Ссылка на вашу сборку скопирована в буфер обмена!");
    }).catch(() => {
      prompt("Скопируйте ссылку вручную:", shareUrl);
    });
  } catch (e) {
    alert("Не удалось создать ссылку.");
    console.error(e);
  }
}

function loadFromUrlHash() {
  const hash = window.location.hash;
  if (hash && hash.startsWith("#build=")) {
    try {
      const encoded = hash.replace("#build=", "");
      const jsonStr = decodeURIComponent(escape(atob(encoded)));
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        party = parsed;
        startBuilder();
      }
    } catch (e) {
      console.error("Ошибка чтения сборки из ссылки:", e);
    }
  }
}

loadFromUrlHash();

function resetParty() {
  if (confirm("Сбросить всё и оставить 1 пустую карточку?")) {
    party = [{ name: "Слот 1", equip: {}, swaps: [] }];
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
      backgroundColor: "#06120e",
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
