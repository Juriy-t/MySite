const ITEMS_DB = [
  // Обычный плащ (T4)
  { id: "T4_CAPE", name: "Обычный плащ (T4)", cat: "cape" },
  { id: "T4_CAPE@1", name: "Обычный плащ (T4.1)", cat: "cape" },
  { id: "T4_CAPE@2", name: "Обычный плащ (T4.2)", cat: "cape" },
  { id: "T4_CAPE@3", name: "Обычный плащ (T4.3)", cat: "cape" },

  // Авалонский плащ (T4)
  { id: "T4_CAPEITEM_AVALON", name: "Авалонский плащ (T4)", cat: "cape" },
  { id: "T4_CAPEITEM_AVALON@1", name: "Авалонский плащ (T4.1)", cat: "cape" },
  { id: "T4_CAPEITEM_AVALON@2", name: "Авалонский плащ (T4.2)", cat: "cape" },
  { id: "T4_CAPEITEM_AVALON@3", name: "Авалонский плащ (T4.3)", cat: "cape" },
  { id: "T4_CAPEITEM_AVALON@4", name: "Авалонский плащ (T4.4)", cat: "cape" },

  // Демонический плащ (T4)
  { id: "T4_CAPEITEM_DEMON", name: "Демонический плащ (T4)", cat: "cape" },
  { id: "T4_CAPEITEM_DEMON@1", name: "Демонический плащ (T4.1)", cat: "cape" },
  { id: "T4_CAPEITEM_DEMON@2", name: "Демонический плащ (T4.2)", cat: "cape" },
  { id: "T4_CAPEITEM_DEMON@3", name: "Демонический плащ (T4.3)", cat: "cape" }
];
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
        if (itemCode) slotDiv.innerHTML = `<img src="${getRenderUrl(itemCode)}" alt="" />`;
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
      if (swapCode) sDiv.innerHTML = `<img src="${getRenderUrl(swapCode)}" alt="" />`;
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
  list.innerHTML = "";

  const filtered = ITEMS_DB.filter(item => {
    const matchesCat = category === "all" || item.cat === category;
    const matchesQuery = item.name.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
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
