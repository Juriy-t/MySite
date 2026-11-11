const ITEMS_DB = [
  { id: "HEAD_PLATE_SET2", name: "Шлем вершителя", cat: "head" },
  { id: "HEAD_PLATE_SET3", name: "Шлем хранителя", cat: "head" },
  { id: "HEAD_LEATHER_SET3", name: "Капюшон убийцы", cat: "head" },
  { id: "HEAD_LEATHER_MORGANA", name: "Капюшон лазутчика", cat: "head" },
  { id: "HEAD_CLOTH_SET2", name: "Колпак клирика", cat: "head" },
  { id: "HEAD_CLOTH_ROYAL", name: "Королевский колпак", cat: "head" },
  { id: "HEAD_CLOTH_MORGANA", name: "Колпак культиста", cat: "head" },
  { id: "ARMOR_PLATE_SET3", name: "Броня хранителя", cat: "armor" },
  { id: "ARMOR_PLATE_HELL", name: "Демоническая броня", cat: "armor" },
  { id: "ARMOR_PLATE_AVALON", name: "Броня доблести", cat: "armor" },
  { id: "ARMOR_CLOTH_SET3", name: "Мантия чародея", cat: "armor" },
  { id: "ARMOR_CLOTH_ROYAL", name: "Королевская мантия", cat: "armor" },
  { id: "ARMOR_CLOTH_KEEPER", name: "Мантия друида", cat: "armor" },
  { id: "ARMOR_LEATHER_HELL", name: "Куртка адского огня", cat: "armor" },
  { id: "SHOES_PLATE_SET1", name: "Сапоги солдата", cat: "shoes" },
  { id: "SHOES_PLATE_SET2", name: "Сапоги рыцаря", cat: "shoes" },
  { id: "SHOES_LEATHER_SET2", name: "Ботинки охотника", cat: "shoes" },
  { id: "SHOES_LEATHER_MORGANA", name: "Ботинки лазутчика", cat: "shoes" },
  { id: "SHOES_CLOTH_SET2", name: "Сандалии клирика", cat: "shoes" },
  { id: "SHOES_CLOTH_ROYAL", name: "Королевские сандалии", cat: "shoes" },
  { id: "MAIN_MACE_HELL", name: "Булава инкуба", cat: "weapon" },
  { id: "2H_MACE", name: "Тяжелая булава", cat: "weapon" },
  { id: "MAIN_HOLYSTAFF_AVALON", name: "Священный посох", cat: "weapon" },
  { id: "2H_HOLYSTAFF_HELL", name: "Посох падших", cat: "weapon" },
  { id: "MAIN_CURSEDSTAFF_AVALON", name: "Призыватель теней", cat: "weapon" },
  { id: "2H_ARCANESTAFF_HELL", name: "Оккультный посох", cat: "weapon" },
  { id: "2H_FROSTSTAFF_CRYSTAL", name: "Ледяная призма", cat: "weapon" },
  { id: "2H_BOW_AVALON", name: "Туманный пронзатель", cat: "weapon" },
  { id: "2H_FIRESTAFF_HELL", name: "Пылающий посох", cat: "weapon" },
  { id: "OFF_SHIELD_AVALON", name: "Эгида (Щит)", cat: "offhand" },
  { id: "OFF_HORN_KEEPER", name: "Туманный зов", cat: "offhand" },
  { id: "OFF_BOOK", name: "Книга заклинаний", cat: "offhand" },
  { id: "OFF_ORB_MORGANA", name: "Корень природы", cat: "offhand" },
  { id: "CAPEITEM_FW_MARTLOCK", name: "Плащ Мартлока", cat: "cape" },
  { id: "CAPEITEM_FW_LYMHURST", name: "Плащ Лимхерста", cat: "cape" },
  { id: "CAPEITEM_HERETIC", name: "Плащ еретиков", cat: "cape" },
  { id: "CAPEITEM_MORGANA", name: "Плащ Морганы", cat: "cape" },
  { id: "CAPEITEM_UNDEAD", name: "Плащ нежити", cat: "cape" },
  { id: "MEAL_OMELETTE", name: "Свиной омлет", cat: "food", fixedTier: "T7" },
  { id: "MEAL_STEW", name: "Жаркое из говядины", cat: "food", fixedTier: "T8" },
  { id: "MEAL_SANDWICH", name: "Сэндвич с говядиной", cat: "food", fixedTier: "T8" },
  { id: "POTION_RESIST", name: "Зелье защиты", cat: "potion", fixedTier: "T7" },
  { id: "POTION_HEAL", name: "Зелье здоровья", cat: "potion", fixedTier: "T6" },
  { id: "POTION_ENERGY", name: "Зелье энергии", cat: "potion", fixedTier: "T6" },
  { id: "POTION_COOLDOWN", name: "Зелье яда", cat: "potion", fixedTier: "T8" }
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
  return `https://albiononline.com{itemCode}.png?size=120`;
}

function renderParty() {
  const row = document.getElementById("partyRow");
  row.innerHTML = "";

  party.forEach((member, idx) => {
    const col = document.createElement("div");
    col.className = "role-column";

    // Шапка с редактируемым именем и кнопкой удаления (если ролей > 1)
    const header = document.createElement("div");
    header.className = "role-header";
    header.innerHTML = `
      <input type="text" value="${member.name}" onchange="renameMember(${idx}, this.value)" />
      ${party.length > 1 ? `<button class="remove-role-btn" title="Удалить роль" onclick="removeMember(${idx})">✕</button>` : ""}
    `;
    col.appendChild(header);

    // Карточка билда
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

    // Блок настраиваемых свапов
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

  // Карточка "+" для добавления нового участника пати
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

function renderItemChoices() {
  const list = document.getElementById("itemsList");
  const query = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categorySelect").value;
  const tier = document.getElementById("tierSelect").value;
  const enchant = document.getElementById("enchantSelect").value;
  list.innerHTML = "";

  const filtered = ITEMS_DB.filter(item => {
    const matchesCat = category === "all" || item.cat === category;
    const matchesQuery = item.name.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  filtered.forEach(item => {
    const effectiveTier = item.fixedTier || tier;
    const fullCode = `${effectiveTier}_${item.id}${enchant}`;
    const div = document.createElement("div");
    div.className = "item-option";
    div.innerHTML = `<img src="${getRenderUrl(fullCode)}" loading="lazy" alt="" /><span>${item.name}</span>`;
    div.onclick = () => selectItem(fullCode);
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
