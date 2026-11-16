const CAPE_TYPES = [
  { code: "CAPE", name: "Обычный плащ" },
  { code: "CAPEITEM_AVALON", name: "Авалонский плащ" },
  { code: "CAPEITEM_DEMON", name: "Демонический плащ" },
  { code: "CAPEITEM_FW_BRECILIEN", name: "Плащ Бресилиона" },
  { code: "CAPEITEM_FW_BRIDGEWATCH", name: "Накидка Бриджуотча" },
  { code: "CAPEITEM_FW_CAERLEON", name: "Плащ Карлеона" },
  { code: "CAPEITEM_FW_FORTSTERLING", name: "Накидка Форт Стерлинга" },
  { code: "CAPEITEM_FW_LYMHURST", name: "Накидка Люмхурста" },
  { code: "CAPEITEM_FW_MARTLOCK", name: "Накидка Мартлока" },
  { code: "CAPEITEM_FW_THETFORD", name: "Накидка Тетфорда" },
  { code: "CAPEITEM_HERETIC", name: "Плащ еретиков" },
  { code: "CAPEITEM_KEEPER", name: "Плащ хранителей" },
  { code: "CAPEITEM_MORGANA", name: "Плащ Морганы" },
  { code: "CAPEITEM_SMUGGLER", name: "Плащ контрабандистов" },
  { code: "CAPEITEM_UNDEAD", name: "Плащ нежити" }
];

const ARMOR_TYPES = [
  // Ткань
  { code: "ARMOR_CLOTH_SET1", name: "Мантия ученого" },
  { code: "ARMOR_CLOTH_SET2", name: "Мантия клирика" },
  { code: "ARMOR_CLOTH_SET3", name: "Мантия чародея" },
  { code: "ARMOR_CLOTH_ROYAL", name: "Королевская мантия" },
  { code: "ARMOR_CLOTH_KEEPER", name: "Мантия друида" },
  { code: "ARMOR_CLOTH_HELL", name: "Дьявольская мантия" },
  { code: "ARMOR_CLOTH_MORGANA", name: "Мантия культиста" },
  { code: "ARMOR_CLOTH_AVALON", name: "Мантия чистоты" },
  { code: "ARMOR_CLOTH_FEY", name: "Мантия из сказочной чешуи" },
  // Кожа
  { code: "ARMOR_LEATHER_SET1", name: "Куртка наемника" },
  { code: "ARMOR_LEATHER_SET2", name: "Куртка охотника" },
  { code: "ARMOR_LEATHER_SET3", name: "Куртка убийцы" },
  { code: "ARMOR_LEATHER_ROYAL", name: "Королевская куртка" },
  { code: "ARMOR_LEATHER_MORGANA", name: "Куртка лазутчика" },
  { code: "ARMOR_LEATHER_HELL", name: "Адская куртка" },
  { code: "ARMOR_LEATHER_UNDEAD", name: "Куртка призрака" },
  { code: "ARMOR_LEATHER_AVALON", name: "Куртка упорства" },
  { code: "ARMOR_LEATHER_FEY", name: "Куртка туманного охотника" },
  { code: "ARMOR_LEATHER_DRAGON", name: "Куртка драконоборца" },
  // Латы
  { code: "ARMOR_PLATE_SET1", name: "Броня солдата" },
  { code: "ARMOR_PLATE_SET2", name: "Броня рыцаря" },
  { code: "ARMOR_PLATE_SET3", name: "Броня хранителя" },
  { code: "ARMOR_PLATE_ROYAL", name: "Королевская броня" },
  { code: "ARMOR_PLATE_KEEPER", name: "Броня вершителя" },
  { code: "ARMOR_PLATE_HELL", name: "Демоническая броня" },
  { code: "ARMOR_PLATE_UNDEAD", name: "Могильная броня" },
  { code: "ARMOR_PLATE_AVALON", name: "Броня доблести" },
  { code: "ARMOR_PLATE_FEY", name: "Броня сумеречного ткача" }
];

const HEAD_TYPES = [
  // Ткань
  { code: "HEAD_CLOTH_SET1", name: "Колпак ученого" },
  { code: "HEAD_CLOTH_SET2", name: "Колпак клирика" },
  { code: "HEAD_CLOTH_SET3", name: "Колпак чародея" },
  { code: "HEAD_CLOTH_ROYAL", name: "Королевский колпак" },
  { code: "HEAD_CLOTH_KEEPER", name: "Колпак друида" },
  { code: "HEAD_CLOTH_HELL", name: "Дьявольский колпак" },
  { code: "HEAD_CLOTH_MORGANA", name: "Колпак культиста" },
  { code: "HEAD_CLOTH_AVALON", name: "Колпак чистоты" },
  { code: "HEAD_CLOTH_FEY", name: "Шляпа из сказочной чешуи" },
  // Кожа
  { code: "HEAD_LEATHER_SET1", name: "Капюшон наемника" },
  { code: "HEAD_LEATHER_SET2", name: "Капюшон охотника" },
  { code: "HEAD_LEATHER_SET3", name: "Капюшон убийцы" },
  { code: "HEAD_LEATHER_ROYAL", name: "Королевский капюшон" },
  { code: "HEAD_LEATHER_MORGANA", name: "Капюшон лазутчика" },
  { code: "HEAD_LEATHER_HELL", name: "Адский капюшон" },
  { code: "HEAD_LEATHER_UNDEAD", name: "Капюшон призрака" },
  { code: "HEAD_LEATHER_AVALON", name: "Капюшон упорства" },
  { code: "HEAD_LEATHER_FEY", name: "Капюшон туманного охотника" },
  { code: "HEAD_LEATHER_DRAGON", name: "Капюшон драконоборца" },
  // Латы
  { code: "HEAD_PLATE_SET1", name: "Шлем солдата" },
  { code: "HEAD_PLATE_SET2", name: "Шлем рыцаря" },
  { code: "HEAD_PLATE_SET3", name: "Шлем хранителя" },
  { code: "HEAD_PLATE_ROYAL", name: "Королевский шлем" },
  { code: "HEAD_PLATE_KEEPER", name: "Шлем вершителя" },
  { code: "HEAD_PLATE_HELL", name: "Демонический шлем" },
  { code: "HEAD_PLATE_UNDEAD", name: "Могильный шлем" },
  { code: "HEAD_PLATE_AVALON", name: "Шлем доблести" },
  { code: "HEAD_PLATE_FEY", name: "Шлем сумеречного ткача" }
];

const SHOES_TYPES = [
  // Ткань
  { code: "SHOES_CLOTH_SET1", name: "Сандалии ученого" },
  { code: "SHOES_CLOTH_SET2", name: "Сандалии клирика" },
  { code: "SHOES_CLOTH_SET3", name: "Сандалии чародея" },
  { code: "SHOES_CLOTH_ROYAL", name: "Королевские сандалии" },
  { code: "SHOES_CLOTH_KEEPER", name: "Сандалии друида" },
  { code: "SHOES_CLOTH_HELL", name: "Дьявольские сандалии" },
  { code: "SHOES_CLOTH_MORGANA", name: "Сандалии культиста" },
  { code: "SHOES_CLOTH_AVALON", name: "Сандалии чистоты" },
  { code: "SHOES_CLOTH_FEY", name: "Сандалии из сказочной чешуи" },
  // Кожа
  { code: "SHOES_LEATHER_SET1", name: "Ботинки наемника" },
  { code: "SHOES_LEATHER_SET2", name: "Ботинки охотника" },
  { code: "SHOES_LEATHER_SET3", name: "Ботинки убийцы" },
  { code: "SHOES_LEATHER_ROYAL", name: "Королевские ботинки" },
  { code: "SHOES_LEATHER_MORGANA", name: "Ботинки лазутчика" },
  { code: "SHOES_LEATHER_HELL", name: "Адские ботинки" },
  { code: "SHOES_LEATHER_UNDEAD", name: "Ботинки призрака" },
  { code: "SHOES_LEATHER_AVALON", name: "Ботинки упорства" },
  { code: "SHOES_LEATHER_FEY", name: "Ботинки туманного охотника" },
  { code: "SHOES_LEATHER_DRAGON", name: "Сапоги драконоборца" },
  // Латы
  { code: "SHOES_PLATE_SET1", name: "Сапоги солдата" },
  { code: "SHOES_PLATE_SET2", name: "Сапоги рыцаря" },
  { code: "SHOES_PLATE_SET3", name: "Сапоги хранителя" },
  { code: "SHOES_PLATE_ROYAL", name: "Королевские сапоги" },
  { code: "SHOES_PLATE_KEEPER", name: "Сапоги вершителя" },
  { code: "SHOES_PLATE_HELL", name: "Демонические сапоги" },
  { code: "SHOES_PLATE_UNDEAD", name: "Могильные сапоги" },
  { code: "SHOES_PLATE_AVALON", name: "Сапоги доблести" },
  { code: "SHOES_PLATE_FEY", name: "Сапоги сумеречного ткача" }
];

const OFFHAND_TYPES = [
  { code: "OFF_SHIELD", name: "Щит" },
  { code: "OFF_TOWERSHIELD_UNDEAD", name: "Саркофаг" },
  { code: "OFF_SHIELD_HELL", name: "Щит негодяя" },
  { code: "OFF_SPIKEDSHIELD_MORGANA", name: "Лицелом" },
  { code: "OFF_SHIELD_AVALON", name: "Эгида звёзд" },
  { code: "OFF_TORCH", name: "Факел" },
  { code: "OFF_HORN_KEEPER", name: "Зов тумана" },
  { code: "OFF_TALISMAN_AVALON", name: "Священный скипетр" },
  { code: "OFF_LAMP_UNDEAD", name: "Могильная свеча" },
  { code: "OFF_CENSER_AVALON", name: "Небесное кадило" },
  { code: "OFF_BOOK", name: "Книга заклинаний" },
  { code: "OFF_ORB_MORGANA", name: "Око тайн" },
  { code: "OFF_DEMONSKULL_HELL", name: "Череп-трофей" },
  { code: "OFF_TOTEM_KEEPER", name: "Корень природы" },
  { code: "OFF_TOME_CRYSTAL", name: "Гримуар сокрытого времени" },
  { code: "OFF_TORCH_CRYSTAL", name: "Факел синего пламени" },
  { code: "OFF_JESTERCANE_HELL", name: "Зловещая трость" },
  { code: "OFF_SHIELD_CRYSTAL", name: "Несокрушимый бастион" },
];
const WEAPON_TYPES = [
  // Мечи
  { code: "MAIN_SWORD", name: "Палаш" },
  { code: "2H_CLAYMORE", name: "Клеймор" },
  { code: "2H_DUALSWORD", name: "Парные мечи" },
  { code: "MAIN_SCIMITAR_MORGANA", name: "Королевский меч" },
  { code: "2H_CLEAVER_HELL", name: "Меч резни" },
  { code: "2H_DUALSCIMITAR_UNDEAD", name: "Галатины" },
  { code: "2H_CLAYMORE_AVALON", name: "Царедворец" },
  { code: "MAIN_SWORD_CRYSTAL", name: "Клинок бесконечности" },
  // Топоры
  { code: "MAIN_AXE", name: "Боевой топор" },
  { code: "2H_AXE", name: "Большой топор" },
  { code: "2H_HALBERD", name: "Алебарда" },
  { code: "2H_HALBERD_MORGANA", name: "Падальщик" },
  { code: "2H_SCYTHE_HELL", name: "Адская коса" },
  { code: "2H_DUALAXE_KEEPER", name: "Медвежьи лапы" },
  { code: "2H_AXE_AVALON", name: "Разрушитель миров" },
  { code: "2H_SCYTHE_CRYSTAL", name: "Хрустальный жнец" },
  // Булавы
  { code: "MAIN_MACE", name: "Булава" },
  { code: "2H_MACE", name: "Тяжелая булава" },
  { code: "2H_FLAIL", name: "Моргенштерн" },
  { code: "MAIN_ROCKMACE_KEEPER", name: "Каменная булава" },
  { code: "MAIN_MACE_HELL", name: "Булава инкуба" },
  { code: "2H_MACE_MORGANA", name: "Булава Камланна" },
  { code: "2H_DUALMACE_AVALON", name: "Хранители клятвы" },
  { code: "MAIN_MACE_CRYSTAL", name: "Грозовой монарх" },
  // Молоты
  { code: "MAIN_HAMMER", name: "Молот" },
  { code: "2H_POLEHAMMER", name: "Чекан" },
  { code: "2H_HAMMER", name: "Большой молот" },
  { code: "2H_HAMMER_UNDEAD", name: "Могильный молот" },
  { code: "2H_DUALHAMMER_HELL", name: "Молоты кузни" },
  { code: "2H_RAM_KEEPER", name: "Хранитель рощи" },
  { code: "2H_HAMMER_AVALON", name: "Длань правосудия" },
  { code: "2H_HAMMER_CRYSTAL", name: "Молот истенных снарядов" },
  
  // Боевые перчатки
  { code: "2H_KNUCKLES_SET1", name: "Перчатки крушителя" },
  { code: "2H_KNUCKLES_SET2", name: "Боевые наручи" },
  { code: "2H_KNUCKLES_SET3", name: "Шипастые рукавицы" },
  { code: "2H_KNUCKLES_KEEPER", name: "Медвежьи перчатки" },
  { code: "2H_KNUCKLES_HELL", name: "Адские длани" },
  { code: "2H_KNUCKLES_MORGANA", name: "Вороний цестус" },
  { code: "2H_KNUCKLES_AVALON", name: "Кулаки Авалона" },
  { code: "2H_KNUCKLES_CRYSTAL", name: "Силовые наручи" },
  // Копья
  { code: "MAIN_SPEAR", name: "Копье" },
  { code: "2H_SPEAR", name: "Пика" },
  { code: "2H_GLAIVE", name: "Глефа" },
  { code: "MAIN_SPEAR_KEEPER", name: "Копье цапли" },
  { code: "2H_HARPOON_HELL", name: "Охотник за душами" },
  { code: "2H_TRIDENT_UNDEAD", name: "Трезубец" },
  { code: "MAIN_SPEAR_LANCE_AVALON", name: "Копье Рассвета" },
  { code: "2H_GLAIVE_CRYSTAL", name: "Глефа разлома" },
  // Кинжалы
  { code: "MAIN_DAGGER", name: "Кинжал" },
  { code: "2H_DAGGERPAIR", name: "Парные кинжалы" },
  { code: "2H_CLAWPAIR", name: "Когти" },
  { code: "MAIN_RAPIER_MORGANA", name: "Кровопускатель" },
  { code: "MAIN_DAGGER_HELL", name: "Клык демона" },
  { code: "2H_DUALSICKLE_UNDEAD", name: "Вестники смерти" },
  { code: "2H_DAGGER_KATAR_AVALON", name: "Укротитель ярости" },
  { code: "2H_DAGGERPAIR_CRYSTAL", name: "Парные истребители" },
  // Боевые шесты
  { code: "2H_QUARTERSTAFF", name: "Боевой шест" },
  { code: "2H_IRONCLADEDSTAFF", name: "Железный посох" },
  { code: "2H_DOUBLEBLADEDSTAFF", name: "Острый шест" },
  { code: "2H_COMBATSTAFF_MORGANA", name: "Посох черного монаха" },
  { code: "2H_TWINSCYTHE_HELL", name: "Коса душ" },
  { code: "2H_ROCKSTAFF_KEEPER", name: "Посох равновесия" },
  { code: "2H_QUARTERSTAFF_AVALON", name: "Искатель Грааля" },
  { code: "2H_DOUBLEBLADEDSTAFF_CRYSTAL", name: "Парные призрачные клинки" },
  // Луки
  { code: "2H_BOW", name: "Лук" },
  { code: "2H_WARBOW", name: "Боевой лук" },
  { code: "2H_LONGBOW", name: "Длинный лук" },
  { code: "2H_LONGBOW_UNDEAD", name: "Шепчущий лук" },
  { code: "2H_BOW_HELL", name: "Воющий лук" },
  { code: "2H_BOW_KEEPER", name: "Лук Бадона" },
  { code: "2H_BOW_AVALON", name: "Туманный пронзатель" },
  { code: "2H_BOW_CRYSTAL", name: "Лук небесного странника" },
  // Арбалеты
  { code: "2H_CROSSBOW", name: "Арбалет" },
  { code: "2H_CROSSBOWLARGE", name: "Тяжелый арбалет" },
  { code: "MAIN_1HCROSSBOW", name: "Легкий арбалет" },
  { code: "2H_REPEATINGCROSSBOW_UNDEAD", name: "Плачущий арбалет" },
  { code: "2H_DUALCROSSBOW_HELL", name: "Самострелы" },
  { code: "2H_CROSSBOWLARGE_MORGANA", name: "Осадный арбалет" },
  { code: "2H_CROSSBOW_CANNON_AVALON", name: "Творец энергии" },
  { code: "2H_DUALCROSSBOW_CRYSTAL", name: "Искрящиеся бластеры" },
  // Огонь
  { code: "MAIN_FIRESTAFF", name: "Огненный посох" },
  { code: "2H_FIRESTAFF", name: "Большой огненный посох" },
  { code: "2H_INFERNOSTAFF", name: "Адский посох" },
  { code: "MAIN_FIRESTAFF_KEEPER", name: "Посох лесного пожара" },
  { code: "2H_FIRESTAFF_HELL", name: "Посох серы" },
  { code: "2H_INFERNOSTAFF_MORGANA", name: "Пылающий посох" },
  { code: "2H_FIRE_RINGPAIR_AVALON", name: "Песнь рассвета" },
  { code: "MAIN_FIRESTAFF_CRYSTAL", name: "Посох пламенного странника" },
  // Лед
  { code: "MAIN_FROSTSTAFF", name: "Морозный посох" },
  { code: "2H_FROSTSTAFF", name: "Большой морозный посох" },
  { code: "2H_GLACIALSTAFF", name: "Ледяной посох" },
  { code: "MAIN_FROSTSTAFF_KEEPER", name: "Посох инея" },
  { code: "2H_ICEGAUNTLETS_HELL", name: "Заледенелый посох" },
  { code: "2H_ICECRYSTAL_UNDEAD", name: "Призма вечного холода" },
  { code: "MAIN_FROSTSTAFF_AVALON", name: "Леденящий вой" },
  { code: "2H_FROSTSTAFF_CRYSTAL", name: "Снежный посох" },
  // Мистик
  { code: "MAIN_ARCANESTAFF", name: "Мистический посох" },
  { code: "2H_ARCANESTAFF", name: "Большой мистический посох" },
  { code: "2H_ENIGMATICSTAFF", name: "Загадочный посох" },
  { code: "MAIN_ARCANESTAFF_UNDEAD", name: "Ведьмовской посох" },
  { code: "2H_ARCANESTAFF_HELL", name: "Оккультный посох" },
  { code: "2H_ENIGMATICORB_MORGANA", name: "Средоточие злобы" },
  { code: "2H_ARCANE_RINGPAIR_AVALON", name: "Песнь заката" },
  { code: "2H_ARCANESTAFF_CRYSTAL", name: "Астральный посох" },
  // Свет
  { code: "MAIN_HOLYSTAFF", name: "Священный посох" },
  { code: "2H_HOLYSTAFF", name: "Большой священный посох" },
  { code: "2H_DIVINESTAFF", name: "Божественный посох" },
  { code: "MAIN_HOLYSTAFF_MORGANA", name: "Посох жизни" },
  { code: "2H_HOLYSTAFF_HELL", name: "Посох падших" },
  { code: "2H_HOLYSTAFF_UNDEAD", name: "Посох искупления" },
  { code: "MAIN_HOLYSTAFF_AVALON", name: "Благодатный посох" },
  { code: "2H_HOLYSTAFF_CRYSTAL", name: "Посох возвышения" },
  // Природа
  { code: "MAIN_NATURESTAFF", name: "Древесный посох" },
  { code: "2H_NATURESTAFF", name: "Большой древесный посох" },
  { code: "2H_WILDSTAFF", name: "Дикий посох" },
  { code: "MAIN_NATURESTAFF_KEEPER", name: "Друидский посох" },
  { code: "2H_NATURESTAFF_KEEPER", name: "Неудержимий посох" },
  { code: "2H_NATURESTAFF_HELL", name: "Посох порчи" },
  { code: "MAIN_NATURESTAFF_AVALON", name: "Посох Железного корня" },
  { code: "MAIN_NATURESTAFF_CRYSTAL", name: "Кузнечный посох" },
  // Курсы
  { code: "MAIN_CURSEDSTAFF", name: "Проклятый посох" },
  { code: "2H_CURSEDSTAFF", name: "Большой проклятый посох" },
  { code: "2H_DEMONICSTAFF", name: "Демонический посох" },
  { code: "MAIN_CURSEDSTAFF_UNDEAD", name: "Гибельный посох" },
  { code: "2H_SKULLORB_HELL", name: "Проклятый череп" },
  { code: "2H_CURSEDSTAFF_MORGANA", name: "Посох обреченности" },
  { code: "MAIN_CURSEDSTAFF_AVALON", name: "Призыватель теней" },
  { code: "MAIN_CURSEDSTAFF_CRYSTAL", name: "Посох гниения" },
  // Оборотни
  { code: "2H_SHAPESHIFTER_SET1", name: "Посох бродяги" },
  { code: "2H_SHAPESHIFTER_SET2", name: "Непреодолимый посох" },
  { code: "2H_SHAPESHIFTER_SET3", name: "Первобытный посох" },
  { code: "2H_SHAPESHIFTER_MORGANA", name: "Посох кровавой луны" },
  { code: "2H_SHAPESHIFTER_HELL", name: "Посох порождения Ада" },
  { code: "2H_SHAPESHIFTER_KEEPER", name: "Рунный посох Земли" },
  { code: "2H_SHAPESHIFTER_AVALON", name: "Светоч" },
  { code: "2H_SHAPESHIFTER_CRYSTAL", name: "Посох неподвижного взгляда" },
];

const CONSUMABLE_ITEMS = [
  // Зелья
  { code: "POTION_HEAL", name: "Зелье здоровья", cat: "potion", tiers: "4,6" },
  { code: "POTION_ENERGY", name: "Зелье энергии", cat: "potion", tiers: "4,6" },
  { code: "POTION_STONESKIN", name: "Зелье защиты", cat: "potion", tiers: "5,7" },
  { code: "POTION_REVIVE", name: "Зелье гиганта", cat: "potion", tiers: "5,7" },
  { code: "POTION_COOLDOWN", name: "Зелье яда", cat: "potion", tiers: "4,6,8" },
  { code: "POTION_SLOWFIELD", name: "Зелье вязкости", cat: "potion", tiers: "5,7" },
  { code: "POTION_CLEANSE2", name: "Зелье очищения", cat: "potion", tiers: "5,7" },
  { code: "POTION_ACID", name: "Кислотное зелье", cat: "potion", tiers: "5,7" },
  { code: "POTION_BERSERK", name: "Зелье берсерка", cat: "potion", tiers: "4,6,8" },
  { code: "POTION_LAVA", name: "Зелье адского пламени", cat: "potion", tiers: "4,6,8" },
  { code: "POTION_TORNADO", name: "Смерч в бутылке", cat: "potion", tiers: "4,6,8" },
  { code: "POTION_LIFEWARD", name: "Зелье защиты жизни", cat: "potion", tiers: "4,6,8" },
  { code: "POTION_CLEANSE", name: "Зелье невидимости", cat: "potion", tiers: "8" },
  { code: "POTION_GATHER", name: "Зелье собирателя", cat: "potion", tiers: "4,6,8" },
  { code: "POTION_MOB_RESET", name: "Успокаивающее зелье", cat: "potion", tiers: "5,7" },

  // Еда
  { code: "MEAL_SOUP", name: "Суп", cat: "food", tiers: "5" },
  { code: "MEAL_SOUP_FISH", name: "Суп из моллюсков", cat: "food", tiers: "5" },
  { code: "MEAL_SALAD", name: "Салат", cat: "food", tiers: "4,6" },
  { code: "MEAL_SALAD_FISH", name: "Салат с кракеном", cat: "food", tiers: "6" },
  { code: "MEAL_PIE", name: "Пирог", cat: "food", tiers: "5,7" },
  { code: "MEAL_PIE_FISH", name: "Пирог с туманным окунем", cat: "food", tiers: "7" },
  { code: "MEAL_OMELETTE", name: "Омлет", cat: "food", tiers: "5,7" },
  { code: "MEAL_OMELETTE_AVALON", name: "Авалонский омлет", cat: "food", tiers: "5,7" },
  { code: "MEAL_OMELETTE_FISH", name: "Крабовый омлет", cat: "food", tiers: "7" },
  { code: "MEAL_OMELETTE_DRAGONAREA", name: "Омлет из лейфина", cat: "food", tiers: "5,7" },
  { code: "MEAL_STEW", name: "Жаркое", cat: "food", tiers: "4,6,8" },
  { code: "MEAL_STEW_AVALON", name: "Авалонское жаркое", cat: "food", tiers: "4,6,8" },
  { code: "MEAL_STEW_FISH", name: "Жаркое из болотного угря", cat: "food", tiers: "4,6,8" },
  { code: "MEAL_SANDWICH", name: "Сэндвич", cat: "food", tiers: "4,6,8" },
  { code: "MEAL_SANDWICH_AVALON", name: "Авалонский сэндвич", cat: "food", tiers: "4,6,8" },
  { code: "MEAL_SANDWICH_FISH", name: "Сэндвич с громобоем", cat: "food", tiers: "4,6,8" },
  { code: "MEAL_ROAST", name: "Жареная свинина", cat: "food", tiers: "5,7" },
  { code: "MEAL_ROAST_FISH", name: "Жареный туманный окунь", cat: "food", tiers: "7" },
  { code: "MEAL_SPECIAL_FOOD_DRAKE_EGG", name: "Печенье из яиц дрейков", cat: "food", tiers: "8" }
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
CONSUMABLE_ITEMS.forEach(item => {
  item.tiers.split(",").forEach(tier => {
    for (let ench = 0; ench <= 3; ench++) {
      const enchSuffix = ench === 0 ? "" : `@${ench}`;
      ITEMS_DB.push({
        id: `T${tier}_${item.code}${enchSuffix}`,
        name: `${item.name} (T${tier}.${ench})`,
        cat: item.cat
      });
    }
  });
});

registerItemGroup(CAPE_TYPES, "cape");
registerItemGroup(ARMOR_TYPES, "armor");
registerItemGroup(HEAD_TYPES, "head");
registerItemGroup(SHOES_TYPES, "shoes");
registerItemGroup(OFFHAND_TYPES, "offhand");
registerItemGroup(WEAPON_TYPES, "weapon");

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
  party.push({ name: `Солот ${party.length + 1}`, equip: {}, swaps: [] });
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

    // Для еды и зелий в игре максимальное зачарование .3 (если выбрано .4, показываем .3)
    const isConsumable = item.cat === "potion" || item.cat === "food";
    const effectiveEnch = (isConsumable && enchant === "@4") ? "@3" : enchant;
    const matchesEnch = effectiveEnch === ""
      ? !item.id.includes("@")
      : item.id.endsWith(effectiveEnch);

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
