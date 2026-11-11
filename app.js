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
  { id: "MAIN_HOLYSTAFF_AVALON", name: "Священный посох (Искупление)", cat: "weapon" },
  { id: "2H_HOLYSTAFF_HELL", name: "Посох падших", cat: "weapon" },
  { id: "MAIN_CURSEDSTAFF_AVALON", name: "Призыватель теней", cat: "weapon" },
  { id: "2H_ARCANESTAFF_HELL", name: "Оккультный посох", cat: "weapon" },
  { id: "2H_FROSTSTAFF_CRYSTAL", name: "Ледяная призма", cat: "weapon" },
  { id: "2H_BOW_AVALON", name: "Туманный пронзатель", cat: "weapon" },
  { id: "2H_FIRESTAFF_HELL", name: "Пылающий посох", cat: "weapon" },
  { id: "OFF_SHIELD_AVALON", name: "Эгида (Авалонский щит)", cat: "offhand" },
  { id: "OFF_HORN_KEEPER", name: "Туманный зов", cat: "offhand" },
  { id: "OFF_BOOK", name: "Книга заклинаний", cat: "offhand" },
  { id: "OFF_ORB_MORGANA", name: "Корень природы / Сфера", cat: "offhand" },
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
  { id: "POTION_COOLDOWN", name: "Зелье яда / КД", cat: "potion", fixedTier: "T8" }
];

const DEFAULT_ROLES = ["Tank", "Heal", "Shadow Caller", "Prism", "Mistpiercer"];
const ACTIVITIES = ["PVE", "PVP"];
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

let state = JSON.parse(localStorage.getItem("albion_party_builds")) || {
  roles: [...DEFAULT_ROLES],
  builds: {}
};
let activeTarget = null;

function getRenderUrl(itemCode) {
  return `https://albiononline.com{itemCode}.png?size=120`;
}

function renderBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  state.roles.forEach((roleName, idx) => {
    const div = document.createElement("div");
    div.className = "role-header";
    div.innerHTML = `<input type="text" value="${roleName}" onchange="updateRoleName(${idx}, this.value)" />`;
    board.appendChild(div);
  });

  board.appendChild(document.createElement("div"));

  ACTIVITIES.forEach(activity => {
    state.roles.forEach((_, roleIdx) => {
      const buildId = `${activity}_${roleIdx}`;
      const buildData = state.builds[buildId] || {};
      const card = document.createElement("div");
      card.className = "build-card";

      const grid = document.createElement("div");
      grid.className = "equip-grid";

      MAIN_SLOTS.forEach(s => {
        const slotDiv = document.createElement("div");
        slotDiv.className = "slot" + (s.hidden ? " invisible" : "") + (!buildData[s.key] ? " empty" : "");
        slotDiv.setAttribute("data-label", s.label);
        if (!s.hidden) {
          slotDiv.onclick = () => openModal(activity, roleIdx, s.key, s.label);
          if (buildData[s.key]) {
            slotDiv.innerHTML = `<img src="${getRenderUrl(buildData[s.key])}" alt="" />`;
          }
        }
        grid.appendChild(slotDiv);
      });

      card.appendChild(grid);

      const swapsWrap = document.createElement("div");
      swapsWrap.className = "swaps-section";
      swapsWrap.innerHTML = `<div class="swaps-title">Swaps / Замена</div>`;
      const swapsRow = document.createElement("div");
      swapsRow.className = "swaps-row";

      ["swap1", "swap2", "swap3"].forEach((swapKey, i) => {
        const sDiv = document.createElement("div");
        sDiv.className = "slot" + (!buildData[swapKey] ? " empty" : "");
        sDiv.setAttribute("data-label", `Swap ${i + 1}`);
        sDiv.onclick = () => openModal(activity, roleIdx, swapKey, `Замена ${i + 1}`);
        if (buildData[swapKey]) {
          sDiv.innerHTML = `<img src="${getRenderUrl(buildData[swapKey])}" alt="" />`;
        }
        swapsRow.appendChild(sDiv);
      });

      swapsWrap.appendChild(swapsRow);
      card.appendChild(swapsWrap);
      board.appendChild(card);
    });

    const label = document.createElement("div");
    label.className = "row-label";
    label.textContent = activity;
    board.appendChild(label);
  });
}

function updateRoleName(idx, val) {
  state.roles[idx] = val;
  saveBuilds(true);
}

function openModal(activity, roleIdx, slotKey, label) {
  activeTarget = { activity, roleIdx, slotKey };
  document.getElementById("modalTitle").textContent = `${state.roles[roleIdx]} (${activity}) — ${label}`;
  document.getElementById("searchInput").value = "";
  document.getElementById("modal").classList.add("active");
  renderItemChoices();
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

function renderItemChoices() {
  const list = document.getElementById("itemsList");
  const query = document.getElementById("searchInput").value.toLowerCase();
  const tier = document.getElementById("tierSelect").value;
  const enchant = document.getElementById("enchantSelect").value;
  list.innerHTML = "";

  ITEMS_DB.filter(item => item.name.toLowerCase().includes(query)).forEach(item => {
    const effectiveTier = item.fixedTier || tier;
    const fullCode = `${effectiveTier}_${item.id}${enchant}`;
    const div = document.createElement("div");
    div.className = "item-option";
    div.innerHTML = `<img src="${getRenderUrl(fullCode)}" loading="lazy" alt="${item.name}" /><span>${item.name}</span>`;
    div.onclick = () => selectItem(fullCode);
    list.appendChild(div);
  });
}

function selectItem(fullCode) {
  if (!activeTarget) return;
  const buildId = `${activeTarget.activity}_${activeTarget.roleIdx}`;
  if (!state.builds[buildId]) state.builds[buildId] = {};
  state.builds[buildId][activeTarget.slotKey] = fullCode;
  closeModal();
  renderBoard();
}

function clearCurrentSlot() {
  if (!activeTarget) return;
  const buildId = `${activeTarget.activity}_${activeTarget.roleIdx}`;
  if (state.builds[buildId]) delete state.builds[buildId][activeTarget.slotKey];
  closeModal();
  renderBoard();
}

function saveBuilds(silent = false) {
  localStorage.setItem("albion_party_builds", JSON.stringify(state));
  if (!silent) alert("Билды сохранены в памяти браузера!");
}

function clearBoard() {
  if (confirm("Очистить все слоты?")) {
    state.builds = {};
    renderBoard();
  }
}

function loadPreset() {
  state.roles = [...DEFAULT_ROLES];
  state.builds = {
    "PVE_0": { head: "T8_HEAD_PLATE_SET2@1", cape: "T8_CAPEITEM_FW_MARTLOCK", weapon: "T8_MAIN_MACE_HELL@2", armor: "T8_ARMOR_PLATE_SET3@2", offhand: "T8_OFF_SHIELD_AVALON@2", potion: "T7_POTION_RESIST", shoes: "T8_SHOES_LEATHER_SET2@1", food: "T7_MEAL_OMELETTE@1", swap1: "T8_ARMOR_PLATE_HELL@1", swap2: "T8_HEAD_PLATE_SET3@1", swap3: "T8_SHOES_PLATE_SET1" },
    "PVE_1": { head: "T8_HEAD_CLOTH_MORGANA@1", cape: "T8_CAPEITEM_FW_LYMHURST", weapon: "T8_MAIN_HOLYSTAFF_AVALON@2", armor: "T8_ARMOR_CLOTH_ROYAL@2", offhand: "T8_OFF_HORN_KEEPER@2", potion: "T6_POTION_ENERGY", shoes: "T8_SHOES_CLOTH_ROYAL@1", food: "T7_MEAL_OMELETTE@1", swap1: "T8_ARMOR_CLOTH_SET3@1" },
    "PVE_2": { head: "T8_HEAD_LEATHER_MORGANA@1", cape: "T8_CAPEITEM_FW_LYMHURST", weapon: "T8_MAIN_CURSEDSTAFF_AVALON@2", armor: "T8_ARMOR_CLOTH_ROYAL@2", offhand: "T8_OFF_HORN_KEEPER@2", potion: "T6_POTION_ENERGY", shoes: "T8_SHOES_CLOTH_ROYAL@1", food: "T7_MEAL_OMELETTE@1", swap1: "T8_HEAD_CLOTH_SET2", swap2: "T8_2H_ARCANESTAFF_HELL@1" },
    "PVE_3": { head: "T8_HEAD_LEATHER_MORGANA@1", cape: "T8_CAPEITEM_MORGANA", weapon: "T8_2H_FROSTSTAFF_CRYSTAL@2", armor: "T8_ARMOR_CLOTH_KEEPER@2", potion: "T6_POTION_ENERGY", shoes: "T8_SHOES_CLOTH_ROYAL@1", food: "T7_MEAL_OMELETTE@1", swap1: "T6_POTION_HEAL" },
    "PVE_4": { head: "T8_HEAD_LEATHER_MORGANA@1", cape: "T8_CAPEITEM_FW_LYMHURST", weapon: "T8_2H_BOW_AVALON@2", armor: "T8_ARMOR_CLOTH_KEEPER@2", potion: "T6_POTION_ENERGY", shoes: "T8_SHOES_CLOTH_ROYAL@1", food: "T7_MEAL_OMELETTE@1", swap1: "T6_POTION_HEAL" }
  };
    renderBoard();
  }
  renderBoard();
