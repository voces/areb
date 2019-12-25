//===========================================================================
// Blizzard.j ( define Jass2 functions that need to be in every map script )
//===========================================================================

//-----------------------------------------------------------------------
// Constants
//

// Misc constants
const bj_PI = 3.14159;
const bj_E = 2.71828;
const bj_CELLWIDTH = 128;
const bj_CLIFFHEIGHT = 128;
const bj_UNIT_FACING = 270;
const bj_RADTODEG = 180 / bj_PI;
const bj_DEGTORAD = bj_PI / 180;
const bj_TEXT_DELAY_QUEST = 20;
const bj_TEXT_DELAY_QUESTUPDATE = 20;
const bj_TEXT_DELAY_QUESTDONE = 20;
const bj_TEXT_DELAY_QUESTFAILED = 20;
const bj_TEXT_DELAY_QUESTREQUIREMENT = 20;
const bj_TEXT_DELAY_MISSIONFAILED = 20;
const bj_TEXT_DELAY_ALWAYSHINT = 12;
const bj_TEXT_DELAY_HINT = 12;
const bj_TEXT_DELAY_SECRET = 10;
const bj_TEXT_DELAY_UNITACQUIRED = 15;
const bj_TEXT_DELAY_UNITAVAILABLE = 10;
const bj_TEXT_DELAY_ITEMACQUIRED = 10;
const bj_TEXT_DELAY_WARNING = 12;
const bj_QUEUE_DELAY_QUEST = 5;
const bj_QUEUE_DELAY_HINT = 5;
const bj_QUEUE_DELAY_SECRET = 3;
const bj_HANDICAP_EASY = 60;
const bj_GAME_STARTED_THRESHOLD = 0.01;
const bj_WAIT_FOR_COND_MIN_INTERVAL = 0.1;
const bj_POLLED_WAIT_INTERVAL = 0.1;
const bj_POLLED_WAIT_SKIP_THRESHOLD = 2;

// Game constants
const bj_MAX_INVENTORY = 6;
const bj_MAX_PLAYERS = GetBJMaxPlayers();
const bj_PLAYER_NEUTRAL_VICTIM = GetBJPlayerNeutralVictim();
const bj_PLAYER_NEUTRAL_EXTRA = GetBJPlayerNeutralExtra();
const bj_MAX_PLAYER_SLOTS = GetBJMaxPlayerSlots();
const bj_MAX_SKELETONS = 25;
const bj_MAX_STOCK_ITEM_SLOTS = 11;
const bj_MAX_STOCK_UNIT_SLOTS = 11;
const bj_MAX_ITEM_LEVEL = 10;

// Ideally these would be looked up from Units/MiscData.txt,
// but there is currently no script functionality exposed to do that
const bj_TOD_DAWN = 6;
const bj_TOD_DUSK = 18;

// Melee game settings:
//   - Starting Time of Day (TOD)
//   - Starting Gold
//   - Starting Lumber
//   - Starting Hero Tokens (free heroes)
//   - Max heroes allowed per player
//   - Max heroes allowed per hero type
//   - Distance from start loc to search for nearby mines
//
const bj_MELEE_STARTING_TOD = 8;
const bj_MELEE_STARTING_GOLD_V0 = 750;
const bj_MELEE_STARTING_GOLD_V1 = 500;
const bj_MELEE_STARTING_LUMBER_V0 = 200;
const bj_MELEE_STARTING_LUMBER_V1 = 150;
const bj_MELEE_STARTING_HERO_TOKENS = 1;
const bj_MELEE_HERO_LIMIT = 3;
const bj_MELEE_HERO_TYPE_LIMIT = 1;
const bj_MELEE_MINE_SEARCH_RADIUS = 2000;
const bj_MELEE_CLEAR_UNITS_RADIUS = 1500;
const bj_MELEE_CRIPPLE_TIMEOUT = 120;
const bj_MELEE_CRIPPLE_MSG_DURATION = 20;
const bj_MELEE_MAX_TWINKED_HEROES_V0 = 3;
const bj_MELEE_MAX_TWINKED_HEROES_V1 = 1;

// Delay between a creep's death and the time it may drop an item.
const bj_CREEP_ITEM_DELAY = 0.5;

// Timing settings for Marketplace inventories.
const bj_STOCK_RESTOCK_INITIAL_DELAY = 120;
const bj_STOCK_RESTOCK_INTERVAL = 30;
const bj_STOCK_MAX_ITERATIONS = 20;

// Max events registered by a single "dest dies in region" event.
const bj_MAX_DEST_IN_REGION_EVENTS = 64;

// Camera settings
const bj_CAMERA_MIN_FARZ = 100;
const bj_CAMERA_DEFAULT_DISTANCE = 1650;
const bj_CAMERA_DEFAULT_FARZ = 5000;
const bj_CAMERA_DEFAULT_AOA = 304;
const bj_CAMERA_DEFAULT_FOV = 70;
const bj_CAMERA_DEFAULT_ROLL = 0;
const bj_CAMERA_DEFAULT_ROTATION = 90;

// Rescue
const bj_RESCUE_PING_TIME = 2;

// Transmission behavior settings
const bj_NOTHING_SOUND_DURATION = 5;
const bj_TRANSMISSION_PING_TIME = 1;
const bj_TRANSMISSION_IND_RED = 255;
const bj_TRANSMISSION_IND_BLUE = 255;
const bj_TRANSMISSION_IND_GREEN = 255;
const bj_TRANSMISSION_IND_ALPHA = 255;
const bj_TRANSMISSION_PORT_HANGTIME = 1.5;

// Cinematic mode settings
const bj_CINEMODE_INTERFACEFADE = 0.5;
const bj_CINEMODE_GAMESPEED = MAP_SPEED_NORMAL;

// Cinematic mode volume levels
const bj_CINEMODE_VOLUME_UNITMOVEMENT = 0.4;
const bj_CINEMODE_VOLUME_UNITSOUNDS = 0;
const bj_CINEMODE_VOLUME_COMBAT = 0.4;
const bj_CINEMODE_VOLUME_SPELLS = 0.4;
const bj_CINEMODE_VOLUME_UI = 0;
const bj_CINEMODE_VOLUME_MUSIC = 0.55;
const bj_CINEMODE_VOLUME_AMBIENTSOUNDS = 1;
const bj_CINEMODE_VOLUME_FIRE = 0.6;

// Speech mode volume levels
const bj_SPEECH_VOLUME_UNITMOVEMENT = 0.25;
const bj_SPEECH_VOLUME_UNITSOUNDS = 0;
const bj_SPEECH_VOLUME_COMBAT = 0.25;
const bj_SPEECH_VOLUME_SPELLS = 0.25;
const bj_SPEECH_VOLUME_UI = 0;
const bj_SPEECH_VOLUME_MUSIC = 0.55;
const bj_SPEECH_VOLUME_AMBIENTSOUNDS = 1;
const bj_SPEECH_VOLUME_FIRE = 0.6;

// Smart pan settings
const bj_SMARTPAN_TRESHOLD_PAN = 500;
const bj_SMARTPAN_TRESHOLD_SNAP = 3500;

// QueuedTriggerExecute settings
const bj_MAX_QUEUED_TRIGGERS = 100;
const bj_QUEUED_TRIGGER_TIMEOUT = 180;

// Campaign indexing constants
const bj_CAMPAIGN_INDEX_T = 0;
const bj_CAMPAIGN_INDEX_H = 1;
const bj_CAMPAIGN_INDEX_U = 2;
const bj_CAMPAIGN_INDEX_O = 3;
const bj_CAMPAIGN_INDEX_N = 4;
const bj_CAMPAIGN_INDEX_XN = 5;
const bj_CAMPAIGN_INDEX_XH = 6;
const bj_CAMPAIGN_INDEX_XU = 7;
const bj_CAMPAIGN_INDEX_XO = 8;

// Campaign offset constants (for mission indexing)
const bj_CAMPAIGN_OFFSET_T = 0;
const bj_CAMPAIGN_OFFSET_H = 1;
const bj_CAMPAIGN_OFFSET_U = 2;
const bj_CAMPAIGN_OFFSET_O = 3;
const bj_CAMPAIGN_OFFSET_N = 4;
const bj_CAMPAIGN_OFFSET_XN = 0;
const bj_CAMPAIGN_OFFSET_XH = 1;
const bj_CAMPAIGN_OFFSET_XU = 2;
const bj_CAMPAIGN_OFFSET_XO = 3;

// Mission indexing constants
// Tutorial
const bj_MISSION_INDEX_T00 = bj_CAMPAIGN_OFFSET_T * 1000 + 0;
const bj_MISSION_INDEX_T01 = bj_CAMPAIGN_OFFSET_T * 1000 + 1;
// Human
const bj_MISSION_INDEX_H00 = bj_CAMPAIGN_OFFSET_H * 1000 + 0;
const bj_MISSION_INDEX_H01 = bj_CAMPAIGN_OFFSET_H * 1000 + 1;
const bj_MISSION_INDEX_H02 = bj_CAMPAIGN_OFFSET_H * 1000 + 2;
const bj_MISSION_INDEX_H03 = bj_CAMPAIGN_OFFSET_H * 1000 + 3;
const bj_MISSION_INDEX_H04 = bj_CAMPAIGN_OFFSET_H * 1000 + 4;
const bj_MISSION_INDEX_H05 = bj_CAMPAIGN_OFFSET_H * 1000 + 5;
const bj_MISSION_INDEX_H06 = bj_CAMPAIGN_OFFSET_H * 1000 + 6;
const bj_MISSION_INDEX_H07 = bj_CAMPAIGN_OFFSET_H * 1000 + 7;
const bj_MISSION_INDEX_H08 = bj_CAMPAIGN_OFFSET_H * 1000 + 8;
const bj_MISSION_INDEX_H09 = bj_CAMPAIGN_OFFSET_H * 1000 + 9;
const bj_MISSION_INDEX_H10 = bj_CAMPAIGN_OFFSET_H * 1000 + 10;
const bj_MISSION_INDEX_H11 = bj_CAMPAIGN_OFFSET_H * 1000 + 11;
// Undead
const bj_MISSION_INDEX_U00 = bj_CAMPAIGN_OFFSET_U * 1000 + 0;
const bj_MISSION_INDEX_U01 = bj_CAMPAIGN_OFFSET_U * 1000 + 1;
const bj_MISSION_INDEX_U02 = bj_CAMPAIGN_OFFSET_U * 1000 + 2;
const bj_MISSION_INDEX_U03 = bj_CAMPAIGN_OFFSET_U * 1000 + 3;
const bj_MISSION_INDEX_U05 = bj_CAMPAIGN_OFFSET_U * 1000 + 4;
const bj_MISSION_INDEX_U07 = bj_CAMPAIGN_OFFSET_U * 1000 + 5;
const bj_MISSION_INDEX_U08 = bj_CAMPAIGN_OFFSET_U * 1000 + 6;
const bj_MISSION_INDEX_U09 = bj_CAMPAIGN_OFFSET_U * 1000 + 7;
const bj_MISSION_INDEX_U10 = bj_CAMPAIGN_OFFSET_U * 1000 + 8;
const bj_MISSION_INDEX_U11 = bj_CAMPAIGN_OFFSET_U * 1000 + 9;
// Orc
const bj_MISSION_INDEX_O00 = bj_CAMPAIGN_OFFSET_O * 1000 + 0;
const bj_MISSION_INDEX_O01 = bj_CAMPAIGN_OFFSET_O * 1000 + 1;
const bj_MISSION_INDEX_O02 = bj_CAMPAIGN_OFFSET_O * 1000 + 2;
const bj_MISSION_INDEX_O03 = bj_CAMPAIGN_OFFSET_O * 1000 + 3;
const bj_MISSION_INDEX_O04 = bj_CAMPAIGN_OFFSET_O * 1000 + 4;
const bj_MISSION_INDEX_O05 = bj_CAMPAIGN_OFFSET_O * 1000 + 5;
const bj_MISSION_INDEX_O06 = bj_CAMPAIGN_OFFSET_O * 1000 + 6;
const bj_MISSION_INDEX_O07 = bj_CAMPAIGN_OFFSET_O * 1000 + 7;
const bj_MISSION_INDEX_O08 = bj_CAMPAIGN_OFFSET_O * 1000 + 8;
const bj_MISSION_INDEX_O09 = bj_CAMPAIGN_OFFSET_O * 1000 + 9;
const bj_MISSION_INDEX_O10 = bj_CAMPAIGN_OFFSET_O * 1000 + 10;
// Night Elf
const bj_MISSION_INDEX_N00 = bj_CAMPAIGN_OFFSET_N * 1000 + 0;
const bj_MISSION_INDEX_N01 = bj_CAMPAIGN_OFFSET_N * 1000 + 1;
const bj_MISSION_INDEX_N02 = bj_CAMPAIGN_OFFSET_N * 1000 + 2;
const bj_MISSION_INDEX_N03 = bj_CAMPAIGN_OFFSET_N * 1000 + 3;
const bj_MISSION_INDEX_N04 = bj_CAMPAIGN_OFFSET_N * 1000 + 4;
const bj_MISSION_INDEX_N05 = bj_CAMPAIGN_OFFSET_N * 1000 + 5;
const bj_MISSION_INDEX_N06 = bj_CAMPAIGN_OFFSET_N * 1000 + 6;
const bj_MISSION_INDEX_N07 = bj_CAMPAIGN_OFFSET_N * 1000 + 7;
const bj_MISSION_INDEX_N08 = bj_CAMPAIGN_OFFSET_N * 1000 + 8;
const bj_MISSION_INDEX_N09 = bj_CAMPAIGN_OFFSET_N * 1000 + 9;
// Expansion Night Elf
const bj_MISSION_INDEX_XN00 = bj_CAMPAIGN_OFFSET_XN * 1000 + 0;
const bj_MISSION_INDEX_XN01 = bj_CAMPAIGN_OFFSET_XN * 1000 + 1;
const bj_MISSION_INDEX_XN02 = bj_CAMPAIGN_OFFSET_XN * 1000 + 2;
const bj_MISSION_INDEX_XN03 = bj_CAMPAIGN_OFFSET_XN * 1000 + 3;
const bj_MISSION_INDEX_XN04 = bj_CAMPAIGN_OFFSET_XN * 1000 + 4;
const bj_MISSION_INDEX_XN05 = bj_CAMPAIGN_OFFSET_XN * 1000 + 5;
const bj_MISSION_INDEX_XN06 = bj_CAMPAIGN_OFFSET_XN * 1000 + 6;
const bj_MISSION_INDEX_XN07 = bj_CAMPAIGN_OFFSET_XN * 1000 + 7;
const bj_MISSION_INDEX_XN08 = bj_CAMPAIGN_OFFSET_XN * 1000 + 8;
const bj_MISSION_INDEX_XN09 = bj_CAMPAIGN_OFFSET_XN * 1000 + 9;
const bj_MISSION_INDEX_XN10 = bj_CAMPAIGN_OFFSET_XN * 1000 + 10;
// Expansion Human
const bj_MISSION_INDEX_XH00 = bj_CAMPAIGN_OFFSET_XH * 1000 + 0;
const bj_MISSION_INDEX_XH01 = bj_CAMPAIGN_OFFSET_XH * 1000 + 1;
const bj_MISSION_INDEX_XH02 = bj_CAMPAIGN_OFFSET_XH * 1000 + 2;
const bj_MISSION_INDEX_XH03 = bj_CAMPAIGN_OFFSET_XH * 1000 + 3;
const bj_MISSION_INDEX_XH04 = bj_CAMPAIGN_OFFSET_XH * 1000 + 4;
const bj_MISSION_INDEX_XH05 = bj_CAMPAIGN_OFFSET_XH * 1000 + 5;
const bj_MISSION_INDEX_XH06 = bj_CAMPAIGN_OFFSET_XH * 1000 + 6;
const bj_MISSION_INDEX_XH07 = bj_CAMPAIGN_OFFSET_XH * 1000 + 7;
const bj_MISSION_INDEX_XH08 = bj_CAMPAIGN_OFFSET_XH * 1000 + 8;
const bj_MISSION_INDEX_XH09 = bj_CAMPAIGN_OFFSET_XH * 1000 + 9;
// Expansion Undead
const bj_MISSION_INDEX_XU00 = bj_CAMPAIGN_OFFSET_XU * 1000 + 0;
const bj_MISSION_INDEX_XU01 = bj_CAMPAIGN_OFFSET_XU * 1000 + 1;
const bj_MISSION_INDEX_XU02 = bj_CAMPAIGN_OFFSET_XU * 1000 + 2;
const bj_MISSION_INDEX_XU03 = bj_CAMPAIGN_OFFSET_XU * 1000 + 3;
const bj_MISSION_INDEX_XU04 = bj_CAMPAIGN_OFFSET_XU * 1000 + 4;
const bj_MISSION_INDEX_XU05 = bj_CAMPAIGN_OFFSET_XU * 1000 + 5;
const bj_MISSION_INDEX_XU06 = bj_CAMPAIGN_OFFSET_XU * 1000 + 6;
const bj_MISSION_INDEX_XU07 = bj_CAMPAIGN_OFFSET_XU * 1000 + 7;
const bj_MISSION_INDEX_XU08 = bj_CAMPAIGN_OFFSET_XU * 1000 + 8;
const bj_MISSION_INDEX_XU09 = bj_CAMPAIGN_OFFSET_XU * 1000 + 9;
const bj_MISSION_INDEX_XU10 = bj_CAMPAIGN_OFFSET_XU * 1000 + 10;
const bj_MISSION_INDEX_XU11 = bj_CAMPAIGN_OFFSET_XU * 1000 + 11;
const bj_MISSION_INDEX_XU12 = bj_CAMPAIGN_OFFSET_XU * 1000 + 12;
const bj_MISSION_INDEX_XU13 = bj_CAMPAIGN_OFFSET_XU * 1000 + 13;

// Expansion Orc
const bj_MISSION_INDEX_XO00 = bj_CAMPAIGN_OFFSET_XO * 1000 + 0;
const bj_MISSION_INDEX_XO01 = bj_CAMPAIGN_OFFSET_XO * 1000 + 1;
const bj_MISSION_INDEX_XO02 = bj_CAMPAIGN_OFFSET_XO * 1000 + 2;
const bj_MISSION_INDEX_XO03 = bj_CAMPAIGN_OFFSET_XO * 1000 + 3;

// Cinematic indexing constants
const bj_CINEMATICINDEX_TOP = 0;
const bj_CINEMATICINDEX_HOP = 1;
const bj_CINEMATICINDEX_HED = 2;
const bj_CINEMATICINDEX_OOP = 3;
const bj_CINEMATICINDEX_OED = 4;
const bj_CINEMATICINDEX_UOP = 5;
const bj_CINEMATICINDEX_UED = 6;
const bj_CINEMATICINDEX_NOP = 7;
const bj_CINEMATICINDEX_NED = 8;
const bj_CINEMATICINDEX_XOP = 9;
const bj_CINEMATICINDEX_XED = 10;

// Alliance settings
const bj_ALLIANCE_UNALLIED = 0;
const bj_ALLIANCE_UNALLIED_VISION = 1;
const bj_ALLIANCE_ALLIED = 2;
const bj_ALLIANCE_ALLIED_VISION = 3;
const bj_ALLIANCE_ALLIED_UNITS = 4;
const bj_ALLIANCE_ALLIED_ADVUNITS = 5;
const bj_ALLIANCE_NEUTRAL = 6;
const bj_ALLIANCE_NEUTRAL_VISION = 7;

// Keyboard Event Types
const bj_KEYEVENTTYPE_DEPRESS = 0;
const bj_KEYEVENTTYPE_RELEASE = 1;

// Keyboard Event Keys
const bj_KEYEVENTKEY_LEFT = 0;
const bj_KEYEVENTKEY_RIGHT = 1;
const bj_KEYEVENTKEY_DOWN = 2;
const bj_KEYEVENTKEY_UP = 3;

// Mouse Event Types
const bj_MOUSEEVENTTYPE_DOWN = 0;
const bj_MOUSEEVENTTYPE_UP = 1;
const bj_MOUSEEVENTTYPE_MOVE = 2;

// Transmission timing methods
const bj_TIMETYPE_ADD = 0;
const bj_TIMETYPE_SET = 1;
const bj_TIMETYPE_SUB = 2;

// Camera bounds adjustment methods
const bj_CAMERABOUNDS_ADJUST_ADD = 0;
const bj_CAMERABOUNDS_ADJUST_SUB = 1;

// Quest creation states
const bj_QUESTTYPE_REQ_DISCOVERED = 0;
const bj_QUESTTYPE_REQ_UNDISCOVERED = 1;
const bj_QUESTTYPE_OPT_DISCOVERED = 2;
const bj_QUESTTYPE_OPT_UNDISCOVERED = 3;

// Quest message types
const bj_QUESTMESSAGE_DISCOVERED = 0;
const bj_QUESTMESSAGE_UPDATED = 1;
const bj_QUESTMESSAGE_COMPLETED = 2;
const bj_QUESTMESSAGE_FAILED = 3;
const bj_QUESTMESSAGE_REQUIREMENT = 4;
const bj_QUESTMESSAGE_MISSIONFAILED = 5;
const bj_QUESTMESSAGE_ALWAYSHINT = 6;
const bj_QUESTMESSAGE_HINT = 7;
const bj_QUESTMESSAGE_SECRET = 8;
const bj_QUESTMESSAGE_UNITACQUIRED = 9;
const bj_QUESTMESSAGE_UNITAVAILABLE = 10;
const bj_QUESTMESSAGE_ITEMACQUIRED = 11;
const bj_QUESTMESSAGE_WARNING = 12;

// Leaderboard sorting methods
const bj_SORTTYPE_SORTBYVALUE = 0;
const bj_SORTTYPE_SORTBYPLAYER = 1;
const bj_SORTTYPE_SORTBYLABEL = 2;

// Cinematic fade filter methods
const bj_CINEFADETYPE_FADEIN = 0;
const bj_CINEFADETYPE_FADEOUT = 1;
const bj_CINEFADETYPE_FADEOUTIN = 2;

// Buff removal methods
const bj_REMOVEBUFFS_POSITIVE = 0;
const bj_REMOVEBUFFS_NEGATIVE = 1;
const bj_REMOVEBUFFS_ALL = 2;
const bj_REMOVEBUFFS_NONTLIFE = 3;

// Buff properties - polarity
const bj_BUFF_POLARITY_POSITIVE = 0;
const bj_BUFF_POLARITY_NEGATIVE = 1;
const bj_BUFF_POLARITY_EITHER = 2;

// Buff properties - resist type
const bj_BUFF_RESIST_MAGIC = 0;
const bj_BUFF_RESIST_PHYSICAL = 1;
const bj_BUFF_RESIST_EITHER = 2;
const bj_BUFF_RESIST_BOTH = 3;

// Hero stats
const bj_HEROSTAT_STR = 0;
const bj_HEROSTAT_AGI = 1;
const bj_HEROSTAT_INT = 2;

// Hero skill point modification methods
const bj_MODIFYMETHOD_ADD = 0;
const bj_MODIFYMETHOD_SUB = 1;
const bj_MODIFYMETHOD_SET = 2;

// Unit state adjustment methods (for replaced units)
const bj_UNIT_STATE_METHOD_ABSOLUTE = 0;
const bj_UNIT_STATE_METHOD_RELATIVE = 1;
const bj_UNIT_STATE_METHOD_DEFAULTS = 2;
const bj_UNIT_STATE_METHOD_MAXIMUM = 3;

// Gate operations
const bj_GATEOPERATION_CLOSE = 0;
const bj_GATEOPERATION_OPEN = 1;
const bj_GATEOPERATION_DESTROY = 2;

// Game cache value types
const bj_GAMECACHE_BOOLEAN = 0;
const bj_GAMECACHE_INTEGER = 1;
const bj_GAMECACHE_REAL = 2;
const bj_GAMECACHE_UNIT = 3;
const bj_GAMECACHE_STRING = 4;

// Hashtable value types
const bj_HASHTABLE_BOOLEAN = 0;
const bj_HASHTABLE_INTEGER = 1;
const bj_HASHTABLE_REAL = 2;
const bj_HASHTABLE_STRING = 3;
const bj_HASHTABLE_HANDLE = 4;

// Item status types
const bj_ITEM_STATUS_HIDDEN = 0;
const bj_ITEM_STATUS_OWNED = 1;
const bj_ITEM_STATUS_INVULNERABLE = 2;
const bj_ITEM_STATUS_POWERUP = 3;
const bj_ITEM_STATUS_SELLABLE = 4;
const bj_ITEM_STATUS_PAWNABLE = 5;

// Itemcode status types
const bj_ITEMCODE_STATUS_POWERUP = 0;
const bj_ITEMCODE_STATUS_SELLABLE = 1;
const bj_ITEMCODE_STATUS_PAWNABLE = 2;

// Minimap ping styles
const bj_MINIMAPPINGSTYLE_SIMPLE = 0;
const bj_MINIMAPPINGSTYLE_FLASHY = 1;
const bj_MINIMAPPINGSTYLE_ATTACK = 2;

// Corpse creation settings
const bj_CORPSE_MAX_DEATH_TIME = 8;

// Corpse creation styles
const bj_CORPSETYPE_FLESH = 0;
const bj_CORPSETYPE_BONE = 1;

// Elevator pathing-blocker destructable code
const bj_ELEVATOR_BLOCKER_CODE = "DTep";
const bj_ELEVATOR_CODE01 = "DTrf";
const bj_ELEVATOR_CODE02 = "DTrx";

// Elevator wall codes
const bj_ELEVATOR_WALL_TYPE_ALL = 0;
const bj_ELEVATOR_WALL_TYPE_EAST = 1;
const bj_ELEVATOR_WALL_TYPE_NORTH = 2;
const bj_ELEVATOR_WALL_TYPE_SOUTH = 3;
const bj_ELEVATOR_WALL_TYPE_WEST = 4;

//-----------------------------------------------------------------------
// Variables
//

// Force predefs
let bj_FORCE_ALL_PLAYERS;
let bj_FORCE_PLAYER;

let bj_MELEE_MAX_TWINKED_HEROES = 0;

// Map area rects
let bj_mapInitialPlayableArea;
let bj_mapInitialCameraBounds;

// Utility function vars
let bj_forLoopAIndex = 0;
let bj_forLoopBIndex = 0;
let bj_forLoopAIndexEnd = 0;
let bj_forLoopBIndexEnd = 0;

let bj_slotControlReady = false;
let bj_slotControlUsed;
let bj_slotControl;

// Game started detection vars
let bj_gameStartedTimer;
let bj_gameStarted = false;
let bj_volumeGroupsTimer = CreateTimer();

// Singleplayer check
let bj_isSinglePlayer = false;

// Day/Night Cycle vars
let bj_dncSoundsDay;
let bj_dncSoundsNight;
let bj_dayAmbientSound;
let bj_nightAmbientSound;
let bj_dncSoundsDawn;
let bj_dncSoundsDusk;
let bj_dawnSound;
let bj_duskSound;
let bj_useDawnDuskSounds = true;
let bj_dncIsDaytime = false;

// Triggered sounds
//sound              bj_pingMinimapSound         = null
let bj_rescueSound;
let bj_questDiscoveredSound;
let bj_questUpdatedSound;
let bj_questCompletedSound;
let bj_questFailedSound;
let bj_questHintSound;
let bj_questSecretSound;
let bj_questItemAcquiredSound;
let bj_questWarningSound;
let bj_victoryDialogSound;
let bj_defeatDialogSound;

// Marketplace vars
let bj_stockItemPurchased;
let bj_stockUpdateTimer;
let bj_stockAllowedPermanent;
let bj_stockAllowedCharged;
let bj_stockAllowedArtifact;
let bj_stockPickedItemLevel = 0;
let bj_stockPickedItemType;

// Melee vars
let bj_meleeVisibilityTrained;
let bj_meleeVisibilityIsDay = true;
let bj_meleeGrantHeroItems = false;
let bj_meleeNearestMineToLoc;
let bj_meleeNearestMine;
let bj_meleeNearestMineDist = 0;
let bj_meleeGameOver = false;
let bj_meleeDefeated;
let bj_meleeVictoried;
let bj_ghoul;
let bj_crippledTimer;
let bj_crippledTimerWindows;
let bj_playerIsCrippled;
let bj_playerIsExposed;
let bj_finishSoonAllExposed = false;
let bj_finishSoonTimerDialog;
let bj_meleeTwinkedHeroes;

// Rescue behavior vars
let bj_rescueUnitBehavior;
let bj_rescueChangeColorUnit = true;
let bj_rescueChangeColorBldg = true;

// Transmission vars
let bj_cineSceneEndingTimer;
let bj_cineSceneLastSound;
let bj_cineSceneBeingSkipped;

// Cinematic mode vars
let bj_cineModePriorSpeed = MAP_SPEED_NORMAL;
let bj_cineModePriorFogSetting = false;
let bj_cineModePriorMaskSetting = false;
let bj_cineModeAlreadyIn = false;
let bj_cineModePriorDawnDusk = false;
let bj_cineModeSavedSeed = 0;

// Cinematic fade vars
let bj_cineFadeFinishTimer;
let bj_cineFadeContinueTimer;
let bj_cineFadeContinueRed = 0;
let bj_cineFadeContinueGreen = 0;
let bj_cineFadeContinueBlue = 0;
let bj_cineFadeContinueTrans = 0;
let bj_cineFadeContinueDuration = 0;
let bj_cineFadeContinueTex = "";

// QueuedTriggerExecute vars
let bj_queuedExecTotal = 0;
let bj_queuedExecTriggers;
let bj_queuedExecUseConds;
let bj_queuedExecTimeoutTimer = CreateTimer();
let bj_queuedExecTimeout;

// Helper vars (for Filter and Enum funcs)
let bj_destInRegionDiesCount = 0;
let bj_destInRegionDiesTrig;
let bj_groupCountUnits = 0;
let bj_forceCountPlayers = 0;
let bj_groupEnumTypeId = 0;
let bj_groupEnumOwningPlayer;
let bj_groupAddGroupDest;
let bj_groupRemoveGroupDest;
let bj_groupRandomConsidered = 0;
let bj_groupRandomCurrentPick;
let bj_groupLastCreatedDest;
let bj_randomSubGroupGroup;
let bj_randomSubGroupWant = 0;
let bj_randomSubGroupTotal = 0;
let bj_randomSubGroupChance = 0;
let bj_destRandomConsidered = 0;
let bj_destRandomCurrentPick;
let bj_elevatorWallBlocker;
let bj_elevatorNeighbor;
let bj_itemRandomConsidered = 0;
let bj_itemRandomCurrentPick;
let bj_forceRandomConsidered = 0;
let bj_forceRandomCurrentPick;
let bj_makeUnitRescuableUnit;
let bj_makeUnitRescuableFlag = true;
let bj_pauseAllUnitsFlag = true;
let bj_enumDestructableCenter;
let bj_enumDestructableRadius = 0;
let bj_setPlayerTargetColor;
let bj_isUnitGroupDeadResult = true;
let bj_isUnitGroupEmptyResult = true;
let bj_isUnitGroupInRectResult = true;
let bj_isUnitGroupInRectRect;
let bj_changeLevelShowScores = false;
let bj_changeLevelMapName;
let bj_suspendDecayFleshGroup = CreateGroup();
let bj_suspendDecayBoneGroup = CreateGroup();
let bj_delayedSuspendDecayTimer = CreateTimer();
let bj_delayedSuspendDecayTrig;
let bj_livingPlayerUnitsTypeId = 0;
let bj_lastDyingWidget;

// Random distribution vars
let bj_randDistCount = 0;
let bj_randDistID;
let bj_randDistChance;

// Last X'd vars
let bj_lastCreatedUnit;
let bj_lastCreatedItem;
let bj_lastRemovedItem;
let bj_lastHauntedGoldMine;
let bj_lastCreatedDestructable;
let bj_lastCreatedGroup = CreateGroup();
let bj_lastCreatedFogModifier;
let bj_lastCreatedEffect;
let bj_lastCreatedWeatherEffect;
let bj_lastCreatedTerrainDeformation;
let bj_lastCreatedQuest;
let bj_lastCreatedQuestItem;
let bj_lastCreatedDefeatCondition;
let bj_lastStartedTimer = CreateTimer();
let bj_lastCreatedTimerDialog;
let bj_lastCreatedLeaderboard;
let bj_lastCreatedMultiboard;
let bj_lastPlayedSound;
let bj_lastPlayedMusic = "";
let bj_lastTransmissionDuration = 0;
let bj_lastCreatedGameCache;
let bj_lastCreatedHashtable;
let bj_lastLoadedUnit;
let bj_lastCreatedButton;
let bj_lastReplacedUnit;
let bj_lastCreatedTextTag;
let bj_lastCreatedLightning;
let bj_lastCreatedImage;
let bj_lastCreatedUbersplat;

// Filter function vars
let filterIssueHauntOrderAtLocBJ;
let filterEnumDestructablesInCircleBJ;
let filterGetUnitsInRectOfPlayer;
let filterGetUnitsOfTypeIdAll;
let filterGetUnitsOfPlayerAndTypeId;
let filterMeleeTrainedUnitIsHeroBJ;
let filterLivingPlayerUnitsOfTypeId;

// Memory cleanup vars
let bj_wantDestroyGroup = false;

//***************************************************************************
//*
//*  Debugging Functions
//*
//***************************************************************************

//===========================================================================
const BJDebugMsg = ( msg ) => {

	let i = 0;

	while ( true ) {

		DisplayTimedTextToPlayer( Player( i ), 0, 0, 60, msg )
		i = i + 1;
		if ( i == bj_MAX_PLAYERS ) break;

	}

};

//***************************************************************************
//*
//*  Math Utility Functions
//*
//***************************************************************************

//===========================================================================
const RMinBJ = ( a, b ) => {

	if ( ( a < b ) ) {

		return a

	} else {

		return b

	}

};

//===========================================================================
const RMaxBJ = ( a, b ) => {

	if ( ( a < b ) ) {

		return b

	} else {

		return a

	}

};

//===========================================================================
const RAbsBJ = ( a ) => {

	if ( ( a >= 0 ) ) {

		return a

	} else {

		return - a

	}

};

//===========================================================================
const RSignBJ = ( a ) => {

	if ( ( a >= 0 ) ) {

		return 1

	} else {

		return - 1

	}

};

//===========================================================================
const IMinBJ = ( a, b ) => {

	if ( ( a < b ) ) {

		return a

	} else {

		return b

	}

};

//===========================================================================
const IMaxBJ = ( a, b ) => {

	if ( ( a < b ) ) {

		return b

	} else {

		return a

	}

};

//===========================================================================
const IAbsBJ = ( a ) => {

	if ( ( a >= 0 ) ) {

		return a

	} else {

		return - a

	}

};

//===========================================================================
const ISignBJ = ( a ) => {

	if ( ( a >= 0 ) ) {

		return 1

	} else {

		return - 1

	}

};

//===========================================================================
const SinBJ = ( degrees ) => {

	return Sin( degrees * bj_DEGTORAD )

};

//===========================================================================
const CosBJ = ( degrees ) => {

	return Cos( degrees * bj_DEGTORAD )

};

//===========================================================================
const TanBJ = ( degrees ) => {

	return Tan( degrees * bj_DEGTORAD )

};

//===========================================================================
const AsinBJ = ( degrees ) => {

	return Asin( degrees ) * bj_RADTODEG

};

//===========================================================================
const AcosBJ = ( degrees ) => {

	return Acos( degrees ) * bj_RADTODEG

};

//===========================================================================
const AtanBJ = ( degrees ) => {

	return Atan( degrees ) * bj_RADTODEG

};

//===========================================================================
const Atan2BJ = ( y, x ) => {

	return Atan2( y, x ) * bj_RADTODEG

};

//===========================================================================
const AngleBetweenPoints = ( locA, locB ) => {

	return bj_RADTODEG * Atan2( GetLocationY( locB ) - GetLocationY( locA ), GetLocationX( locB ) - GetLocationX( locA ) )

};

//===========================================================================
const DistanceBetweenPoints = ( locA, locB ) => {

	let dx = GetLocationX( locB ) - GetLocationX( locA );
	let dy = GetLocationY( locB ) - GetLocationY( locA );
	return SquareRoot( dx * dx + dy * dy )

};

//===========================================================================
const PolarProjectionBJ = ( source, dist, angle ) => {

	let x = GetLocationX( source ) + dist * Cos( angle * bj_DEGTORAD );
	let y = GetLocationY( source ) + dist * Sin( angle * bj_DEGTORAD );
	return Location( x, y )

};

//===========================================================================
const GetRandomDirectionDeg = () => {

	return GetRandomReal( 0, 360 )

};

//===========================================================================
const GetRandomPercentageBJ = () => {

	return GetRandomReal( 0, 100 )

};

//===========================================================================
const GetRandomLocInRect = ( whichRect ) => {

	return Location( GetRandomReal( GetRectMinX( whichRect ), GetRectMaxX( whichRect ) ), GetRandomReal( GetRectMinY( whichRect ), GetRectMaxY( whichRect ) ) )

};

//===========================================================================
// Calculate the modulus/remainder of (dividend) divided by (divisor).
// Examples:  18 mod 5 = 3.  15 mod 5 = 0.  -8 mod 5 = 2.
//
const ModuloInteger = ( dividend, divisor ) => {

	let modulus = dividend - ( dividend / divisor ) * divisor;

	// If the dividend was negative, the above modulus calculation will
	// be negative, but within (-divisor..0).  We can add (divisor) to
	// shift this result into the desired range of (0..divisor).

	if ( ( modulus < 0 ) ) {

		modulus = modulus + divisor;

	}

	return modulus

};

//===========================================================================
// Calculate the modulus/remainder of (dividend) divided by (divisor).
// Examples:  13.000 mod 2.500 = 0.500.  -6.000 mod 2.500 = 1.500.
//
const ModuloReal = ( dividend, divisor ) => {

	let modulus = dividend - I2R( R2I( dividend / divisor ) ) * divisor;

	// If the dividend was negative, the above modulus calculation will
	// be negative, but within (-divisor..0).  We can add (divisor) to
	// shift this result into the desired range of (0..divisor).

	if ( ( modulus < 0 ) ) {

		modulus = modulus + divisor;

	}

	return modulus

};

//===========================================================================
const OffsetLocation = ( loc, dx, dy ) => {

	return Location( GetLocationX( loc ) + dx, GetLocationY( loc ) + dy )

};

//===========================================================================
const OffsetRectBJ = ( r, dx, dy ) => {

	return Rect( GetRectMinX( r ) + dx, GetRectMinY( r ) + dy, GetRectMaxX( r ) + dx, GetRectMaxY( r ) + dy )

};

//===========================================================================
const RectFromCenterSizeBJ = ( center, width, height ) => {

	let x = GetLocationX( center );
	let y = GetLocationY( center );
	return Rect( x - width * 0.5, y - height * 0.5, x + width * 0.5, y + height * 0.5 )

};

//===========================================================================
const RectContainsCoords = ( r, x, y ) => {

	return ( GetRectMinX( r ) <= x ) && ( x <= GetRectMaxX( r ) ) && ( GetRectMinY( r ) <= y ) && ( y <= GetRectMaxY( r ) )

};

//===========================================================================
const RectContainsLoc = ( r, loc ) => {

	return RectContainsCoords( r, GetLocationX( loc ), GetLocationY( loc ) )

};

//===========================================================================
const RectContainsUnit = ( r, whichUnit ) => {

	return RectContainsCoords( r, GetUnitX( whichUnit ), GetUnitY( whichUnit ) )

};

//===========================================================================
const RectContainsItem = ( whichItem, r ) => {

	if ( ( whichItem == null ) ) {

		return false

	}

	if ( ( IsItemOwned( whichItem ) ) ) {

		return false

	}

	return RectContainsCoords( r, GetItemX( whichItem ), GetItemY( whichItem ) )

};

//***************************************************************************
//*
//*  Utility Constructs
//*
//***************************************************************************

//===========================================================================
// Runs the trigger's actions if the trigger's conditions evaluate to true.
//
const ConditionalTriggerExecute = ( trig ) => {

	if ( TriggerEvaluate( trig ) ) {

		TriggerExecute( trig )

	}

};

//===========================================================================
// Runs the trigger's actions if the trigger's conditions evaluate to true.
//
const TriggerExecuteBJ = ( trig, checkConditions ) => {

	if ( checkConditions ) {

		if ( ! ( TriggerEvaluate( trig ) ) ) {

			return false

		}

	}

	TriggerExecute( trig )
	return true

};

//===========================================================================
// Arranges for a trigger to fire almost immediately, except that the calling
// trigger is not interrupted as is the case with a TriggerExecute call.
// Since the trigger executes normally, its conditions are still evaluated.
//
const PostTriggerExecuteBJ = ( trig, checkConditions ) => {

	if ( checkConditions ) {

		if ( ! ( TriggerEvaluate( trig ) ) ) {

			return false

		}

	}

	TriggerRegisterTimerEvent( trig, 0, false )
	return true

};

//===========================================================================
// Debug - Display the contents of the trigger queue (as either null or "x"
// for each entry).
const QueuedTriggerCheck = () => {

	let s = "TrigQueue Check ";
	let i;

	i = 0;

	while ( true ) {

		if ( i >= bj_queuedExecTotal ) break;
		s = s + "q[" + I2S( i ) + "]=";

		if ( ( bj_queuedExecTriggers[ i ] == null ) ) {

			s = s + "null ";

		} else {

			s = s + "x ";

		}

		i = i + 1;

	}

	s = s + "(" + I2S( bj_queuedExecTotal ) + " total)";
	DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, 600, s )

};

//===========================================================================
// Searches the queue for a given trigger, returning the index of the
// trigger within the queue if it is found, or -1 if it is not found.
//
const QueuedTriggerGetIndex = ( trig ) => {

	// Determine which, if any, of the queued triggers is being removed.
	let index = 0;

	while ( true ) {

		if ( index >= bj_queuedExecTotal ) break;

		if ( ( bj_queuedExecTriggers[ index ] == trig ) ) {

			return index

		}

		index = index + 1;

	}

	return - 1

};

//===========================================================================
// Removes a trigger from the trigger queue, shifting other triggers down
// to fill the unused space.  If the currently running trigger is removed
// in this manner, this function does NOT attempt to run the next trigger.
//
const QueuedTriggerRemoveByIndex = ( trigIndex ) => {

	let index;

	// If the to-be-removed index is out of range, fail.

	if ( ( trigIndex >= bj_queuedExecTotal ) ) {

		return false

	}

	// Shift all queue entries down to fill in the gap.
	bj_queuedExecTotal = bj_queuedExecTotal - 1;
	index = trigIndex;

	while ( true ) {

		if ( index >= bj_queuedExecTotal ) break;
		bj_queuedExecTriggers = bj_queuedExecTriggers[ index + 1 ];
		bj_queuedExecUseConds = bj_queuedExecUseConds[ index + 1 ];
		index = index + 1;

	}

	return true

};

//===========================================================================
// Attempt to execute the first trigger in the queue.  If it fails, remove
// it and execute the next one.  Continue this cycle until a trigger runs,
// or until the queue is empty.
//
const QueuedTriggerAttemptExec = () => {

	while ( true ) {

		if ( bj_queuedExecTotal == 0 ) break;

		if ( TriggerExecuteBJ( bj_queuedExecTriggers[ 0 ], bj_queuedExecUseConds[ 0 ] ) ) {

			// Timeout the queue if it sits at the front of the queue for too long.
			TimerStart( bj_queuedExecTimeoutTimer, bj_QUEUED_TRIGGER_TIMEOUT, false, null )
			return true

		}

		QueuedTriggerRemoveByIndex( 0 )

	}

	return false

};

//===========================================================================
// Queues a trigger to be executed, assuring that such triggers are not
// executed at the same time.
//
const QueuedTriggerAddBJ = ( trig, checkConditions ) => {

	// Make sure our queue isn't full.  If it is, return failure.

	if ( ( bj_queuedExecTotal >= bj_MAX_QUEUED_TRIGGERS ) ) {

		return false

	}

	// Add the trigger to an array of to-be-executed triggers.
	bj_queuedExecTriggers = trig;
	bj_queuedExecUseConds = checkConditions;
	bj_queuedExecTotal = bj_queuedExecTotal + 1;

	// If this is the only trigger in the queue, run it.

	if ( ( bj_queuedExecTotal == 1 ) ) {

		QueuedTriggerAttemptExec()

	}

	return true

};

//===========================================================================
// Denotes the end of a queued trigger. Be sure to call this only once per
// queued trigger, or risk stepping on the toes of other queued triggers.
//
const QueuedTriggerRemoveBJ = ( trig ) => {

	let index;
	let trigIndex;
	let trigExecuted;

	// Find the trigger's index.
	trigIndex = QueuedTriggerGetIndex( trig );

	if ( ( trigIndex == - 1 ) ) {

		return null

	}

	// Shuffle the other trigger entries down to fill in the gap.
	QueuedTriggerRemoveByIndex( trigIndex )

	// If we just axed the currently running trigger, run the next one.

	if ( ( trigIndex == 0 ) ) {

		PauseTimer( bj_queuedExecTimeoutTimer )
		QueuedTriggerAttemptExec()

	}

};

//===========================================================================
// Denotes the end of a queued trigger. Be sure to call this only once per
// queued trigger, lest you step on the toes of other queued triggers.
//
const QueuedTriggerDoneBJ = () => {

	let index;

	// Make sure there's something on the queue to remove.

	if ( ( bj_queuedExecTotal <= 0 ) ) {

		return null

	}

	// Remove the currently running trigger from the array.
	QueuedTriggerRemoveByIndex( 0 )

	// If other triggers are waiting to run, run one of them.
	PauseTimer( bj_queuedExecTimeoutTimer )
	QueuedTriggerAttemptExec()

};

//===========================================================================
// Empty the trigger queue.
//
const QueuedTriggerClearBJ = () => {

	PauseTimer( bj_queuedExecTimeoutTimer )
	bj_queuedExecTotal = 0;

};

//===========================================================================
// Remove all but the currently executing trigger from the trigger queue.
//
const QueuedTriggerClearInactiveBJ = () => {

	bj_queuedExecTotal = IMinBJ( bj_queuedExecTotal, 1 );

};

//===========================================================================
const QueuedTriggerCountBJ = () => {

	return bj_queuedExecTotal

};

//===========================================================================
const IsTriggerQueueEmptyBJ = () => {

	return bj_queuedExecTotal <= 0

};

//===========================================================================
const IsTriggerQueuedBJ = ( trig ) => {

	return QueuedTriggerGetIndex( trig ) != - 1

};

//===========================================================================
const GetForLoopIndexA = () => {

	return bj_forLoopAIndex

};

//===========================================================================
const SetForLoopIndexA = ( newIndex ) => {

	bj_forLoopAIndex = newIndex;

};

//===========================================================================
const GetForLoopIndexB = () => {

	return bj_forLoopBIndex

};

//===========================================================================
const SetForLoopIndexB = ( newIndex ) => {

	bj_forLoopBIndex = newIndex;

};

//===========================================================================
// We can't do game-time waits, so this simulates one by starting a timer
// and polling until the timer expires.
const PolledWait = ( duration ) => {

	let t;
	let timeRemaining;

	if ( ( duration > 0 ) ) {

		t = CreateTimer();
		TimerStart( t, duration, false, null )

		while ( true ) {

			timeRemaining = TimerGetRemaining( t );
			if ( timeRemaining <= 0 ) break;

			// If we have a bit of time left, skip past 10% of the remaining
			// duration instead of checking every interval, to minimize the
			// polling on long waits.

			if ( ( timeRemaining > bj_POLLED_WAIT_SKIP_THRESHOLD ) ) {

				TriggerSleepAction( 0.1 * timeRemaining )

			} else {

				TriggerSleepAction( bj_POLLED_WAIT_INTERVAL )

			}

		}

		DestroyTimer( t )

	}

};

//===========================================================================
const IntegerTertiaryOp = ( flag, valueA, valueB ) => {

	if ( flag ) {

		return valueA

	} else {

		return valueB

	}

};

//***************************************************************************
//*
//*  General Utility Functions
//*  These functions exist purely to make the trigger dialogs cleaner and
//*  more comprehensible.
//*
//***************************************************************************

//===========================================================================
const DoNothing = () => {

null

};

//===========================================================================
// This function does nothing.  WorldEdit should should eventually ignore
// CommentString triggers during script generation, but until such a time,
// this function will serve as a stub.
//
const CommentString = ( commentString ) => {

null

};

//===========================================================================
// This function returns the input string, converting it from the localized text, if necessary
//
const StringIdentity = ( theString ) => {

	return GetLocalizedString( theString )

};

//===========================================================================
const GetBooleanAnd = ( valueA, valueB ) => {

	return valueA && valueB

};

//===========================================================================
const GetBooleanOr = ( valueA, valueB ) => {

	return valueA || valueB

};

//===========================================================================
// Converts a percentage (real, 0..100) into a scaled integer (0..max),
// clipping the result to 0..max in case the input is invalid.
//
const PercentToInt = ( percentage, max ) => {

	let result = R2I( percentage * I2R( max ) * 0.01 );

	if ( ( result < 0 ) ) {

		result = 0;

	} else if ( ( result > max ) ) {

		result = max;

	}

	return result

};

//===========================================================================
const PercentTo255 = ( percentage ) => {

	return PercentToInt( percentage, 255 )

};

//===========================================================================
const GetTimeOfDay = () => {

	return GetFloatGameState( GAME_STATE_TIME_OF_DAY )

};

//===========================================================================
const SetTimeOfDay = ( whatTime ) => {

	SetFloatGameState( GAME_STATE_TIME_OF_DAY, whatTime )

};

//===========================================================================
const SetTimeOfDayScalePercentBJ = ( scalePercent ) => {

	SetTimeOfDayScale( scalePercent * 0.01 )

};

//===========================================================================
const GetTimeOfDayScalePercentBJ = () => {

	return GetTimeOfDayScale() * 100

};

//===========================================================================
const PlaySound = ( soundName ) => {

	let soundHandle = CreateSound( soundName, false, false, true, 12700, 12700, "" );
	StartSound( soundHandle )
	KillSoundWhenDone( soundHandle )

};

//===========================================================================
const CompareLocationsBJ = ( A, B ) => {

	return GetLocationX( A ) == GetLocationX( B ) && GetLocationY( A ) == GetLocationY( B )

};

//===========================================================================
const CompareRectsBJ = ( A, B ) => {

	return GetRectMinX( A ) == GetRectMinX( B ) && GetRectMinY( A ) == GetRectMinY( B ) && GetRectMaxX( A ) == GetRectMaxX( B ) && GetRectMaxY( A ) == GetRectMaxY( B )

};

//===========================================================================
// Returns a square rect that exactly encompasses the specified circle.
//
const GetRectFromCircleBJ = ( center, radius ) => {

	let centerX = GetLocationX( center );
	let centerY = GetLocationY( center );
	return Rect( centerX - radius, centerY - radius, centerX + radius, centerY + radius )

};

//***************************************************************************
//*
//*  Camera Utility Functions
//*
//***************************************************************************

//===========================================================================
const GetCurrentCameraSetup = () => {

	let theCam = CreateCameraSetup();
	let duration = 0;
	CameraSetupSetField( theCam, CAMERA_FIELD_TARGET_DISTANCE, GetCameraField( CAMERA_FIELD_TARGET_DISTANCE ), duration )
	CameraSetupSetField( theCam, CAMERA_FIELD_FARZ, GetCameraField( CAMERA_FIELD_FARZ ), duration )
	CameraSetupSetField( theCam, CAMERA_FIELD_ZOFFSET, GetCameraField( CAMERA_FIELD_ZOFFSET ), duration )
	CameraSetupSetField( theCam, CAMERA_FIELD_ANGLE_OF_ATTACK, bj_RADTODEG * GetCameraField( CAMERA_FIELD_ANGLE_OF_ATTACK ), duration )
	CameraSetupSetField( theCam, CAMERA_FIELD_FIELD_OF_VIEW, bj_RADTODEG * GetCameraField( CAMERA_FIELD_FIELD_OF_VIEW ), duration )
	CameraSetupSetField( theCam, CAMERA_FIELD_ROLL, bj_RADTODEG * GetCameraField( CAMERA_FIELD_ROLL ), duration )
	CameraSetupSetField( theCam, CAMERA_FIELD_ROTATION, bj_RADTODEG * GetCameraField( CAMERA_FIELD_ROTATION ), duration )
	CameraSetupSetDestPosition( theCam, GetCameraTargetPositionX(), GetCameraTargetPositionY(), duration )
	return theCam

};

//===========================================================================
const CameraSetupApplyForPlayer = ( doPan, whichSetup, whichPlayer, duration ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		CameraSetupApplyForceDuration( whichSetup, doPan, duration )

	}

};

//===========================================================================
const CameraSetupGetFieldSwap = ( whichField, whichSetup ) => {

	return CameraSetupGetField( whichSetup, whichField )

};

//===========================================================================
const SetCameraFieldForPlayer = ( whichPlayer, whichField, value, duration ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SetCameraField( whichField, value, duration )

	}

};

//===========================================================================
const SetCameraTargetControllerNoZForPlayer = ( whichPlayer, whichUnit, xoffset, yoffset, inheritOrientation ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SetCameraTargetController( whichUnit, xoffset, yoffset, inheritOrientation )

	}

};

//===========================================================================
const SetCameraPositionForPlayer = ( whichPlayer, x, y ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SetCameraPosition( x, y )

	}

};

//===========================================================================
const SetCameraPositionLocForPlayer = ( whichPlayer, loc ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SetCameraPosition( GetLocationX( loc ), GetLocationY( loc ) )

	}

};

//===========================================================================
const RotateCameraAroundLocBJ = ( degrees, loc, whichPlayer, duration ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SetCameraRotateMode( GetLocationX( loc ), GetLocationY( loc ), bj_DEGTORAD * degrees, duration )

	}

};

//===========================================================================
const PanCameraToForPlayer = ( whichPlayer, x, y ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		PanCameraTo( x, y )

	}

};

//===========================================================================
const PanCameraToLocForPlayer = ( whichPlayer, loc ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		PanCameraTo( GetLocationX( loc ), GetLocationY( loc ) )

	}

};

//===========================================================================
const PanCameraToTimedForPlayer = ( whichPlayer, x, y, duration ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		PanCameraToTimed( x, y, duration )

	}

};

//===========================================================================
const PanCameraToTimedLocForPlayer = ( whichPlayer, loc, duration ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		PanCameraToTimed( GetLocationX( loc ), GetLocationY( loc ), duration )

	}

};

//===========================================================================
const PanCameraToTimedLocWithZForPlayer = ( whichPlayer, loc, zOffset, duration ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		PanCameraToTimedWithZ( GetLocationX( loc ), GetLocationY( loc ), zOffset, duration )

	}

};

//===========================================================================
const SmartCameraPanBJ = ( whichPlayer, loc, duration ) => {

	let dist;

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.

		dist = DistanceBetweenPoints( loc, GetCameraTargetPositionLoc() );

		if ( ( dist >= bj_SMARTPAN_TRESHOLD_SNAP ) ) {

			// If the user is too far away, snap the camera.
			PanCameraToTimed( GetLocationX( loc ), GetLocationY( loc ), 0 )

		} else if ( ( dist >= bj_SMARTPAN_TRESHOLD_PAN ) ) {

			// If the user is moderately close, pan the camera.
			PanCameraToTimed( GetLocationX( loc ), GetLocationY( loc ), duration )

		} else {

			// User is close enough, so don't touch the camera.

		}

	}

};

//===========================================================================
const SetCinematicCameraForPlayer = ( whichPlayer, cameraModelFile ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SetCinematicCamera( cameraModelFile )

	}

};

//===========================================================================
const ResetToGameCameraForPlayer = ( whichPlayer, duration ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		ResetToGameCamera( duration )

	}

};

//===========================================================================
const CameraSetSourceNoiseForPlayer = ( whichPlayer, magnitude, velocity ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		CameraSetSourceNoise( magnitude, velocity )

	}

};

//===========================================================================
const CameraSetTargetNoiseForPlayer = ( whichPlayer, magnitude, velocity ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		CameraSetTargetNoise( magnitude, velocity )

	}

};

//===========================================================================
const CameraSetEQNoiseForPlayer = ( whichPlayer, magnitude ) => {

	let richter = magnitude;

	if ( ( richter > 5 ) ) {

		richter = 5;

	}

	if ( ( richter < 2 ) ) {

		richter = 2;

	}

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		CameraSetTargetNoiseEx( magnitude * 2, magnitude * Pow( 10, richter ), true )
		CameraSetSourceNoiseEx( magnitude * 2, magnitude * Pow( 10, richter ), true )

	}

};

//===========================================================================
const CameraClearNoiseForPlayer = ( whichPlayer ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		CameraSetSourceNoise( 0, 0 )
		CameraSetTargetNoise( 0, 0 )

	}

};

//===========================================================================
// Query the current camera bounds.
//
const GetCurrentCameraBoundsMapRectBJ = () => {

	return Rect( GetCameraBoundMinX(), GetCameraBoundMinY(), GetCameraBoundMaxX(), GetCameraBoundMaxY() )

};

//===========================================================================
// Query the initial camera bounds, as defined at map init.
//
const GetCameraBoundsMapRect = () => {

	return bj_mapInitialCameraBounds

};

//===========================================================================
// Query the playable map area, as defined at map init.
//
const GetPlayableMapRect = () => {

	return bj_mapInitialPlayableArea

};

//===========================================================================
// Query the entire map area, as defined at map init.
//
const GetEntireMapRect = () => {

	return GetWorldBounds()

};

//===========================================================================
const SetCameraBoundsToRect = ( r ) => {

	let minX = GetRectMinX( r );
	let minY = GetRectMinY( r );
	let maxX = GetRectMaxX( r );
	let maxY = GetRectMaxY( r );
	SetCameraBounds( minX, minY, minX, maxY, maxX, maxY, maxX, minY )

};

//===========================================================================
const SetCameraBoundsToRectForPlayerBJ = ( whichPlayer, r ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SetCameraBoundsToRect( r )

	}

};

//===========================================================================
const AdjustCameraBoundsBJ = ( adjustMethod, dxWest, dxEast, dyNorth, dySouth ) => {

	let minX = 0;
	let minY = 0;
	let maxX = 0;
	let maxY = 0;
	let scale = 0;

	if ( ( adjustMethod == bj_CAMERABOUNDS_ADJUST_ADD ) ) {

		scale = 1;

	} else if ( ( adjustMethod == bj_CAMERABOUNDS_ADJUST_SUB ) ) {

		scale = - 1;

	} else {

		// Unrecognized adjustment method - ignore the request.
		return null

	}

	// Adjust the actual camera values
	minX = GetCameraBoundMinX() - scale * dxWest;
	maxX = GetCameraBoundMaxX() + scale * dxEast;
	minY = GetCameraBoundMinY() - scale * dySouth;
	maxY = GetCameraBoundMaxY() + scale * dyNorth;

	// Make sure the camera bounds are still valid.

	if ( ( maxX < minX ) ) {

		minX = ( minX + maxX ) * 0.5;
		maxX = minX;

	}

	if ( ( maxY < minY ) ) {

		minY = ( minY + maxY ) * 0.5;
		maxY = minY;

	}

	// Apply the new camera values.
	SetCameraBounds( minX, minY, minX, maxY, maxX, maxY, maxX, minY )

};

//===========================================================================
const AdjustCameraBoundsForPlayerBJ = ( adjustMethod, whichPlayer, dxWest, dxEast, dyNorth, dySouth ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		AdjustCameraBoundsBJ( adjustMethod, dxWest, dxEast, dyNorth, dySouth )

	}

};

//===========================================================================
const SetCameraQuickPositionForPlayer = ( whichPlayer, x, y ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SetCameraQuickPosition( x, y )

	}

};

//===========================================================================
const SetCameraQuickPositionLocForPlayer = ( whichPlayer, loc ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SetCameraQuickPosition( GetLocationX( loc ), GetLocationY( loc ) )

	}

};

//===========================================================================
const SetCameraQuickPositionLoc = ( loc ) => {

	SetCameraQuickPosition( GetLocationX( loc ), GetLocationY( loc ) )

};

//===========================================================================
const StopCameraForPlayerBJ = ( whichPlayer ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		StopCamera()

	}

};

//===========================================================================
const SetCameraOrientControllerForPlayerBJ = ( whichPlayer, whichUnit, xoffset, yoffset ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SetCameraOrientController( whichUnit, xoffset, yoffset )

	}

};

//===========================================================================
const CameraSetSmoothingFactorBJ = ( factor ) => {

	CameraSetSmoothingFactor( factor )

};

//===========================================================================
const CameraResetSmoothingFactorBJ = () => {

	CameraSetSmoothingFactor( 0 )

};

//***************************************************************************
//*
//*  Text Utility Functions
//*
//***************************************************************************

//===========================================================================
const DisplayTextToForce = ( toForce, message ) => {

	if ( ( IsPlayerInForce( GetLocalPlayer(), toForce ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		DisplayTextToPlayer( GetLocalPlayer(), 0, 0, message )

	}

};

//===========================================================================
const DisplayTimedTextToForce = ( toForce, duration, message ) => {

	if ( ( IsPlayerInForce( GetLocalPlayer(), toForce ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, duration, message )

	}

};

//===========================================================================
const ClearTextMessagesBJ = ( toForce ) => {

	if ( ( IsPlayerInForce( GetLocalPlayer(), toForce ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		ClearTextMessages()

	}

};

//===========================================================================
// The parameters for the API Substring function are unintuitive, so this
// merely performs a translation for the starting index.
//
const SubStringBJ = ( source, start, end ) => {

	return SubString( source, start - 1, end )

};

const GetHandleIdBJ = ( h ) => {

	return GetHandleId( h )

};

const StringHashBJ = ( s ) => {

	return StringHash( s )

};

//***************************************************************************
//*
//*  Event Registration Utility Functions
//*
//***************************************************************************

//===========================================================================
const TriggerRegisterTimerEventPeriodic = ( trig, timeout ) => {

	return TriggerRegisterTimerEvent( trig, timeout, true )

};

//===========================================================================
const TriggerRegisterTimerEventSingle = ( trig, timeout ) => {

	return TriggerRegisterTimerEvent( trig, timeout, false )

};

//===========================================================================
const TriggerRegisterTimerExpireEventBJ = ( trig, t ) => {

	return TriggerRegisterTimerExpireEvent( trig, t )

};

//===========================================================================
const TriggerRegisterPlayerUnitEventSimple = ( trig, whichPlayer, whichEvent ) => {

	return TriggerRegisterPlayerUnitEvent( trig, whichPlayer, whichEvent, null )

};

//===========================================================================
const TriggerRegisterAnyUnitEventBJ = ( trig, whichEvent ) => {

	let index;

	index = 0;

	while ( true ) {

		TriggerRegisterPlayerUnitEvent( trig, Player( index ), whichEvent, null )

		index = index + 1;
		if ( index == bj_MAX_PLAYER_SLOTS ) break;

	}

};

//===========================================================================
const TriggerRegisterPlayerSelectionEventBJ = ( trig, whichPlayer, selected ) => {

	if ( selected ) {

		return TriggerRegisterPlayerUnitEvent( trig, whichPlayer, EVENT_PLAYER_UNIT_SELECTED, null )

	} else {

		return TriggerRegisterPlayerUnitEvent( trig, whichPlayer, EVENT_PLAYER_UNIT_DESELECTED, null )

	}

};

//===========================================================================
const TriggerRegisterPlayerKeyEventBJ = ( trig, whichPlayer, keType, keKey ) => {

	if ( ( keType == bj_KEYEVENTTYPE_DEPRESS ) ) {

		// Depress event - find out what key

		if ( ( keKey == bj_KEYEVENTKEY_LEFT ) ) {

			return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_ARROW_LEFT_DOWN )

		} else if ( ( keKey == bj_KEYEVENTKEY_RIGHT ) ) {

			return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_ARROW_RIGHT_DOWN )

		} else if ( ( keKey == bj_KEYEVENTKEY_DOWN ) ) {

			return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_ARROW_DOWN_DOWN )

		} else if ( ( keKey == bj_KEYEVENTKEY_UP ) ) {

			return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_ARROW_UP_DOWN )

		} else {

			// Unrecognized key - ignore the request and return failure.
			return null

		}

	} else if ( ( keType == bj_KEYEVENTTYPE_RELEASE ) ) {

		// Release event - find out what key

		if ( ( keKey == bj_KEYEVENTKEY_LEFT ) ) {

			return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_ARROW_LEFT_UP )

		} else if ( ( keKey == bj_KEYEVENTKEY_RIGHT ) ) {

			return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_ARROW_RIGHT_UP )

		} else if ( ( keKey == bj_KEYEVENTKEY_DOWN ) ) {

			return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_ARROW_DOWN_UP )

		} else if ( ( keKey == bj_KEYEVENTKEY_UP ) ) {

			return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_ARROW_UP_UP )

		} else {

			// Unrecognized key - ignore the request and return failure.
			return null

		}

	} else {

		// Unrecognized type - ignore the request and return failure.
		return null

	}

};

//===========================================================================
const TriggerRegisterPlayerMouseEventBJ = ( trig, whichPlayer, meType ) => {

	if ( ( meType == bj_MOUSEEVENTTYPE_DOWN ) ) {

		// Mouse down event
		return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_MOUSE_DOWN )

	} else if ( ( meType == bj_MOUSEEVENTTYPE_UP ) ) {

		// Mouse up event
		return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_MOUSE_UP )

	} else if ( ( meType == bj_MOUSEEVENTTYPE_MOVE ) ) {

		// Mouse move event
		return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_MOUSE_MOVE )

	} else {

		// Unrecognized type - ignore the request and return failure.
		return null

	}

};

//===========================================================================
const TriggerRegisterPlayerEventVictory = ( trig, whichPlayer ) => {

	return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_VICTORY )

};

//===========================================================================
const TriggerRegisterPlayerEventDefeat = ( trig, whichPlayer ) => {

	return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_DEFEAT )

};

//===========================================================================
const TriggerRegisterPlayerEventLeave = ( trig, whichPlayer ) => {

	return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_LEAVE )

};

//===========================================================================
const TriggerRegisterPlayerEventAllianceChanged = ( trig, whichPlayer ) => {

	return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_ALLIANCE_CHANGED )

};

//===========================================================================
const TriggerRegisterPlayerEventEndCinematic = ( trig, whichPlayer ) => {

	return TriggerRegisterPlayerEvent( trig, whichPlayer, EVENT_PLAYER_END_CINEMATIC )

};

//===========================================================================
const TriggerRegisterGameStateEventTimeOfDay = ( trig, opcode, limitval ) => {

	return TriggerRegisterGameStateEvent( trig, GAME_STATE_TIME_OF_DAY, opcode, limitval )

};

//===========================================================================
const TriggerRegisterEnterRegionSimple = ( trig, whichRegion ) => {

	return TriggerRegisterEnterRegion( trig, whichRegion, null )

};

//===========================================================================
const TriggerRegisterLeaveRegionSimple = ( trig, whichRegion ) => {

	return TriggerRegisterLeaveRegion( trig, whichRegion, null )

};

//===========================================================================
const TriggerRegisterEnterRectSimple = ( trig, r ) => {

	let rectRegion = CreateRegion();
	RegionAddRect( rectRegion, r )
	return TriggerRegisterEnterRegion( trig, rectRegion, null )

};

//===========================================================================
const TriggerRegisterLeaveRectSimple = ( trig, r ) => {

	let rectRegion = CreateRegion();
	RegionAddRect( rectRegion, r )
	return TriggerRegisterLeaveRegion( trig, rectRegion, null )

};

//===========================================================================
const TriggerRegisterDistanceBetweenUnits = ( trig, whichUnit, condition, range ) => {

	return TriggerRegisterUnitInRange( trig, whichUnit, range, condition )

};

//===========================================================================
const TriggerRegisterUnitInRangeSimple = ( trig, range, whichUnit ) => {

	return TriggerRegisterUnitInRange( trig, whichUnit, range, null )

};

//===========================================================================
const TriggerRegisterUnitLifeEvent = ( trig, whichUnit, opcode, limitval ) => {

	return TriggerRegisterUnitStateEvent( trig, whichUnit, UNIT_STATE_LIFE, opcode, limitval )

};

//===========================================================================
const TriggerRegisterUnitManaEvent = ( trig, whichUnit, opcode, limitval ) => {

	return TriggerRegisterUnitStateEvent( trig, whichUnit, UNIT_STATE_MANA, opcode, limitval )

};

//===========================================================================
const TriggerRegisterDialogEventBJ = ( trig, whichDialog ) => {

	return TriggerRegisterDialogEvent( trig, whichDialog )

};

//===========================================================================
const TriggerRegisterShowSkillEventBJ = ( trig ) => {

	return TriggerRegisterGameEvent( trig, EVENT_GAME_SHOW_SKILL )

};

//===========================================================================
const TriggerRegisterBuildSubmenuEventBJ = ( trig ) => {

	return TriggerRegisterGameEvent( trig, EVENT_GAME_BUILD_SUBMENU )

};

//===========================================================================
const TriggerRegisterGameLoadedEventBJ = ( trig ) => {

	return TriggerRegisterGameEvent( trig, EVENT_GAME_LOADED )

};

//===========================================================================
const TriggerRegisterGameSavedEventBJ = ( trig ) => {

	return TriggerRegisterGameEvent( trig, EVENT_GAME_SAVE )

};

//===========================================================================
const RegisterDestDeathInRegionEnum = () => {

	bj_destInRegionDiesCount = bj_destInRegionDiesCount + 1;

	if ( ( bj_destInRegionDiesCount <= bj_MAX_DEST_IN_REGION_EVENTS ) ) {

		TriggerRegisterDeathEvent( bj_destInRegionDiesTrig, GetEnumDestructable() )

	}

};

//===========================================================================
const TriggerRegisterDestDeathInRegionEvent = ( trig, r ) => {

	bj_destInRegionDiesTrig = trig;
	bj_destInRegionDiesCount = 0;
	EnumDestructablesInRect( r, null, RegisterDestDeathInRegionEnum )

};

//***************************************************************************
//*
//*  Environment Utility Functions
//*
//***************************************************************************

//===========================================================================
const AddWeatherEffectSaveLast = ( where, effectID ) => {

	bj_lastCreatedWeatherEffect = AddWeatherEffect( where, effectID );
	return bj_lastCreatedWeatherEffect

};

//===========================================================================
const GetLastCreatedWeatherEffect = () => {

	return bj_lastCreatedWeatherEffect

};

//===========================================================================
const RemoveWeatherEffectBJ = ( whichWeatherEffect ) => {

	RemoveWeatherEffect( whichWeatherEffect )

};

//===========================================================================
const TerrainDeformationCraterBJ = ( duration, permanent, where, radius, depth ) => {

	bj_lastCreatedTerrainDeformation = TerrainDeformCrater( GetLocationX( where ), GetLocationY( where ), radius, depth, R2I( duration * 1000 ), permanent );
	return bj_lastCreatedTerrainDeformation

};

//===========================================================================
const TerrainDeformationRippleBJ = ( duration, limitNeg, where, startRadius, endRadius, depth, wavePeriod, waveWidth ) => {

	let spaceWave;
	let timeWave;
	let radiusRatio;

	if ( ( endRadius <= 0 || waveWidth <= 0 || wavePeriod <= 0 ) ) {

		return null

	}

	timeWave = 2 * duration / wavePeriod;
	spaceWave = 2 * endRadius / waveWidth;
	radiusRatio = startRadius / endRadius;

	bj_lastCreatedTerrainDeformation = TerrainDeformRipple( GetLocationX( where ), GetLocationY( where ), endRadius, depth, R2I( duration * 1000 ), 1, spaceWave, timeWave, radiusRatio, limitNeg );
	return bj_lastCreatedTerrainDeformation

};

//===========================================================================
const TerrainDeformationWaveBJ = ( duration, source, target, radius, depth, trailDelay ) => {

	let distance;
	let dirX;
	let dirY;
	let speed;

	distance = DistanceBetweenPoints( source, target );

	if ( ( distance == 0 || duration <= 0 ) ) {

		return null

	}

	dirX = ( GetLocationX( target ) - GetLocationX( source ) ) / distance;
	dirY = ( GetLocationY( target ) - GetLocationY( source ) ) / distance;
	speed = distance / duration;

	bj_lastCreatedTerrainDeformation = TerrainDeformWave( GetLocationX( source ), GetLocationY( source ), dirX, dirY, distance, speed, radius, depth, R2I( trailDelay * 1000 ), 1 );
	return bj_lastCreatedTerrainDeformation

};

//===========================================================================
const TerrainDeformationRandomBJ = ( duration, where, radius, minDelta, maxDelta, updateInterval ) => {

	bj_lastCreatedTerrainDeformation = TerrainDeformRandom( GetLocationX( where ), GetLocationY( where ), radius, minDelta, maxDelta, R2I( duration * 1000 ), R2I( updateInterval * 1000 ) );
	return bj_lastCreatedTerrainDeformation

};

//===========================================================================
const TerrainDeformationStopBJ = ( deformation, duration ) => {

	TerrainDeformStop( deformation, R2I( duration * 1000 ) )

};

//===========================================================================
const GetLastCreatedTerrainDeformation = () => {

	return bj_lastCreatedTerrainDeformation

};

//===========================================================================
const AddLightningLoc = ( codeName, where1, where2 ) => {

	bj_lastCreatedLightning = AddLightningEx( codeName, true, GetLocationX( where1 ), GetLocationY( where1 ), GetLocationZ( where1 ), GetLocationX( where2 ), GetLocationY( where2 ), GetLocationZ( where2 ) );
	return bj_lastCreatedLightning

};

//===========================================================================
const DestroyLightningBJ = ( whichBolt ) => {

	return DestroyLightning( whichBolt )

};

//===========================================================================
const MoveLightningLoc = ( whichBolt, where1, where2 ) => {

	return MoveLightningEx( whichBolt, true, GetLocationX( where1 ), GetLocationY( where1 ), GetLocationZ( where1 ), GetLocationX( where2 ), GetLocationY( where2 ), GetLocationZ( where2 ) )

};

//===========================================================================
const GetLightningColorABJ = ( whichBolt ) => {

	return GetLightningColorA( whichBolt )

};

//===========================================================================
const GetLightningColorRBJ = ( whichBolt ) => {

	return GetLightningColorR( whichBolt )

};

//===========================================================================
const GetLightningColorGBJ = ( whichBolt ) => {

	return GetLightningColorG( whichBolt )

};

//===========================================================================
const GetLightningColorBBJ = ( whichBolt ) => {

	return GetLightningColorB( whichBolt )

};

//===========================================================================
const SetLightningColorBJ = ( whichBolt, r, g, b, a ) => {

	return SetLightningColor( whichBolt, r, g, b, a )

};

//===========================================================================
const GetLastCreatedLightningBJ = () => {

	return bj_lastCreatedLightning

};

//===========================================================================
const GetAbilityEffectBJ = ( abilcode, t, index ) => {

	return GetAbilityEffectById( abilcode, t, index )

};

//===========================================================================
const GetAbilitySoundBJ = ( abilcode, t ) => {

	return GetAbilitySoundById( abilcode, t )

};

//===========================================================================
const GetTerrainCliffLevelBJ = ( where ) => {

	return GetTerrainCliffLevel( GetLocationX( where ), GetLocationY( where ) )

};

//===========================================================================
const GetTerrainTypeBJ = ( where ) => {

	return GetTerrainType( GetLocationX( where ), GetLocationY( where ) )

};

//===========================================================================
const GetTerrainVarianceBJ = ( where ) => {

	return GetTerrainVariance( GetLocationX( where ), GetLocationY( where ) )

};

//===========================================================================
const SetTerrainTypeBJ = ( where, terrainType, variation, area, shape ) => {

	SetTerrainType( GetLocationX( where ), GetLocationY( where ), terrainType, variation, area, shape )

};

//===========================================================================
const IsTerrainPathableBJ = ( where, t ) => {

	return IsTerrainPathable( GetLocationX( where ), GetLocationY( where ), t )

};

//===========================================================================
const SetTerrainPathableBJ = ( where, t, flag ) => {

	SetTerrainPathable( GetLocationX( where ), GetLocationY( where ), t, flag )

};

//===========================================================================
const SetWaterBaseColorBJ = ( red, green, blue, transparency ) => {

	SetWaterBaseColor( PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
const CreateFogModifierRectSimple = ( whichPlayer, whichFogState, r, afterUnits ) => {

	bj_lastCreatedFogModifier = CreateFogModifierRect( whichPlayer, whichFogState, r, true, afterUnits );
	return bj_lastCreatedFogModifier

};

//===========================================================================
const CreateFogModifierRadiusLocSimple = ( whichPlayer, whichFogState, center, radius, afterUnits ) => {

	bj_lastCreatedFogModifier = CreateFogModifierRadiusLoc( whichPlayer, whichFogState, center, radius, true, afterUnits );
	return bj_lastCreatedFogModifier

};

//===========================================================================
// Version of CreateFogModifierRect that assumes use of sharedVision and
// gives the option of immediately enabling the modifier, so that triggers
// can default to modifiers that are immediately enabled.
//
const CreateFogModifierRectBJ = ( enabled, whichPlayer, whichFogState, r ) => {

	bj_lastCreatedFogModifier = CreateFogModifierRect( whichPlayer, whichFogState, r, true, false );

	if ( enabled ) {

		FogModifierStart( bj_lastCreatedFogModifier )

	}

	return bj_lastCreatedFogModifier

};

//===========================================================================
// Version of CreateFogModifierRadius that assumes use of sharedVision and
// gives the option of immediately enabling the modifier, so that triggers
// can default to modifiers that are immediately enabled.
//
const CreateFogModifierRadiusLocBJ = ( enabled, whichPlayer, whichFogState, center, radius ) => {

	bj_lastCreatedFogModifier = CreateFogModifierRadiusLoc( whichPlayer, whichFogState, center, radius, true, false );

	if ( enabled ) {

		FogModifierStart( bj_lastCreatedFogModifier )

	}

	return bj_lastCreatedFogModifier

};

//===========================================================================
const GetLastCreatedFogModifier = () => {

	return bj_lastCreatedFogModifier

};

//===========================================================================
const FogEnableOn = () => {

	FogEnable( true )

};

//===========================================================================
const FogEnableOff = () => {

	FogEnable( false )

};

//===========================================================================
const FogMaskEnableOn = () => {

	FogMaskEnable( true )

};

//===========================================================================
const FogMaskEnableOff = () => {

	FogMaskEnable( false )

};

//===========================================================================
const UseTimeOfDayBJ = ( flag ) => {

	SuspendTimeOfDay( ! flag )

};

//===========================================================================
const SetTerrainFogExBJ = ( style, zstart, zend, density, red, green, blue ) => {

	SetTerrainFogEx( style, zstart, zend, density, red * 0.01, green * 0.01, blue * 0.01 )

};

//===========================================================================
const ResetTerrainFogBJ = () => {

	ResetTerrainFog()

};

//===========================================================================
const SetDoodadAnimationBJ = ( animName, doodadID, radius, center ) => {

	SetDoodadAnimation( GetLocationX( center ), GetLocationY( center ), radius, doodadID, false, animName, false )

};

//===========================================================================
const SetDoodadAnimationRectBJ = ( animName, doodadID, r ) => {

	SetDoodadAnimationRect( r, doodadID, animName, false )

};

//===========================================================================
const AddUnitAnimationPropertiesBJ = ( add, animProperties, whichUnit ) => {

	AddUnitAnimationProperties( whichUnit, animProperties, add )

};

//============================================================================
const CreateImageBJ = ( file, size, where, zOffset, imageType ) => {

	bj_lastCreatedImage = CreateImage( file, size, size, size, GetLocationX( where ), GetLocationY( where ), zOffset, 0, 0, 0, imageType );
	return bj_lastCreatedImage

};

//============================================================================
const ShowImageBJ = ( flag, whichImage ) => {

	ShowImage( whichImage, flag )

};

//============================================================================
const SetImagePositionBJ = ( whichImage, where, zOffset ) => {

	SetImagePosition( whichImage, GetLocationX( where ), GetLocationY( where ), zOffset )

};

//============================================================================
const SetImageColorBJ = ( whichImage, red, green, blue, alpha ) => {

	SetImageColor( whichImage, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - alpha ) )

};

//============================================================================
const GetLastCreatedImage = () => {

	return bj_lastCreatedImage

};

//============================================================================
const CreateUbersplatBJ = ( where, name, red, green, blue, alpha, forcePaused, noBirthTime ) => {

	bj_lastCreatedUbersplat = CreateUbersplat( GetLocationX( where ), GetLocationY( where ), name, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - alpha ), forcePaused, noBirthTime );
	return bj_lastCreatedUbersplat

};

//============================================================================
const ShowUbersplatBJ = ( flag, whichSplat ) => {

	ShowUbersplat( whichSplat, flag )

};

//============================================================================
const GetLastCreatedUbersplat = () => {

	return bj_lastCreatedUbersplat

};

//***************************************************************************
//*
//*  Sound Utility Functions
//*
//***************************************************************************

//===========================================================================
const PlaySoundBJ = ( soundHandle ) => {

	bj_lastPlayedSound = soundHandle;

	if ( ( soundHandle != null ) ) {

		StartSound( soundHandle )

	}

};

//===========================================================================
const StopSoundBJ = ( soundHandle, fadeOut ) => {

	StopSound( soundHandle, false, fadeOut )

};

//===========================================================================
const SetSoundVolumeBJ = ( soundHandle, volumePercent ) => {

	SetSoundVolume( soundHandle, PercentToInt( volumePercent, 127 ) )

};

//===========================================================================
const SetSoundOffsetBJ = ( newOffset, soundHandle ) => {

	SetSoundPlayPosition( soundHandle, R2I( newOffset * 1000 ) )

};

//===========================================================================
const SetSoundDistanceCutoffBJ = ( soundHandle, cutoff ) => {

	SetSoundDistanceCutoff( soundHandle, cutoff )

};

//===========================================================================
const SetSoundPitchBJ = ( soundHandle, pitch ) => {

	SetSoundPitch( soundHandle, pitch )

};

//===========================================================================
const SetSoundPositionLocBJ = ( soundHandle, loc, z ) => {

	SetSoundPosition( soundHandle, GetLocationX( loc ), GetLocationY( loc ), z )

};

//===========================================================================
const AttachSoundToUnitBJ = ( soundHandle, whichUnit ) => {

	AttachSoundToUnit( soundHandle, whichUnit )

};

//===========================================================================
const SetSoundConeAnglesBJ = ( soundHandle, inside, outside, outsideVolumePercent ) => {

	SetSoundConeAngles( soundHandle, inside, outside, PercentToInt( outsideVolumePercent, 127 ) )

};

//===========================================================================
const KillSoundWhenDoneBJ = ( soundHandle ) => {

	KillSoundWhenDone( soundHandle )

};

//===========================================================================
const PlaySoundAtPointBJ = ( soundHandle, volumePercent, loc, z ) => {

	SetSoundPositionLocBJ( soundHandle, loc, z )
	SetSoundVolumeBJ( soundHandle, volumePercent )
	PlaySoundBJ( soundHandle )

};

//===========================================================================
const PlaySoundOnUnitBJ = ( soundHandle, volumePercent, whichUnit ) => {

	AttachSoundToUnitBJ( soundHandle, whichUnit )
	SetSoundVolumeBJ( soundHandle, volumePercent )
	PlaySoundBJ( soundHandle )

};

//===========================================================================
const PlaySoundFromOffsetBJ = ( soundHandle, volumePercent, startingOffset ) => {

	SetSoundVolumeBJ( soundHandle, volumePercent )
	PlaySoundBJ( soundHandle )
	SetSoundOffsetBJ( startingOffset, soundHandle )

};

//===========================================================================
const PlayMusicBJ = ( musicFileName ) => {

	bj_lastPlayedMusic = musicFileName;
	PlayMusic( musicFileName )

};

//===========================================================================
const PlayMusicExBJ = ( musicFileName, startingOffset, fadeInTime ) => {

	bj_lastPlayedMusic = musicFileName;
	PlayMusicEx( musicFileName, R2I( startingOffset * 1000 ), R2I( fadeInTime * 1000 ) )

};

//===========================================================================
const SetMusicOffsetBJ = ( newOffset ) => {

	SetMusicPlayPosition( R2I( newOffset * 1000 ) )

};

//===========================================================================
const PlayThematicMusicBJ = ( musicName ) => {

	PlayThematicMusic( musicName )

};

//===========================================================================
const PlayThematicMusicExBJ = ( musicName, startingOffset ) => {

	PlayThematicMusicEx( musicName, R2I( startingOffset * 1000 ) )

};

//===========================================================================
const SetThematicMusicOffsetBJ = ( newOffset ) => {

	SetThematicMusicPlayPosition( R2I( newOffset * 1000 ) )

};

//===========================================================================
const EndThematicMusicBJ = () => {

	EndThematicMusic()

};

//===========================================================================
const StopMusicBJ = ( fadeOut ) => {

	StopMusic( fadeOut )

};

//===========================================================================
const ResumeMusicBJ = () => {

	ResumeMusic()

};

//===========================================================================
const SetMusicVolumeBJ = ( volumePercent ) => {

	SetMusicVolume( PercentToInt( volumePercent, 127 ) )

};

//===========================================================================
const GetSoundDurationBJ = ( soundHandle ) => {

	if ( ( soundHandle == null ) ) {

		return bj_NOTHING_SOUND_DURATION

	} else {

		return I2R( GetSoundDuration( soundHandle ) ) * 0.001

	}

};

//===========================================================================
const GetSoundFileDurationBJ = ( musicFileName ) => {

	return I2R( GetSoundFileDuration( musicFileName ) ) * 0.001

};

//===========================================================================
const GetLastPlayedSound = () => {

	return bj_lastPlayedSound

};

//===========================================================================
const GetLastPlayedMusic = () => {

	return bj_lastPlayedMusic

};

//===========================================================================
const VolumeGroupSetVolumeBJ = ( vgroup, percent ) => {

	VolumeGroupSetVolume( vgroup, percent * 0.01 )

};

//===========================================================================
const SetCineModeVolumeGroupsImmediateBJ = () => {

	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_UNITMOVEMENT, bj_CINEMODE_VOLUME_UNITMOVEMENT )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_UNITSOUNDS, bj_CINEMODE_VOLUME_UNITSOUNDS )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_COMBAT, bj_CINEMODE_VOLUME_COMBAT )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_SPELLS, bj_CINEMODE_VOLUME_SPELLS )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_UI, bj_CINEMODE_VOLUME_UI )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_MUSIC, bj_CINEMODE_VOLUME_MUSIC )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_AMBIENTSOUNDS, bj_CINEMODE_VOLUME_AMBIENTSOUNDS )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_FIRE, bj_CINEMODE_VOLUME_FIRE )

};

//===========================================================================
const SetCineModeVolumeGroupsBJ = () => {

	// Delay the request if it occurs at map init.

	if ( bj_gameStarted ) {

		SetCineModeVolumeGroupsImmediateBJ()

	} else {

		TimerStart( bj_volumeGroupsTimer, bj_GAME_STARTED_THRESHOLD, false, SetCineModeVolumeGroupsImmediateBJ )

	}

};

//===========================================================================
const SetSpeechVolumeGroupsImmediateBJ = () => {

	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_UNITMOVEMENT, bj_SPEECH_VOLUME_UNITMOVEMENT )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_UNITSOUNDS, bj_SPEECH_VOLUME_UNITSOUNDS )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_COMBAT, bj_SPEECH_VOLUME_COMBAT )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_SPELLS, bj_SPEECH_VOLUME_SPELLS )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_UI, bj_SPEECH_VOLUME_UI )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_MUSIC, bj_SPEECH_VOLUME_MUSIC )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_AMBIENTSOUNDS, bj_SPEECH_VOLUME_AMBIENTSOUNDS )
	VolumeGroupSetVolume( SOUND_VOLUMEGROUP_FIRE, bj_SPEECH_VOLUME_FIRE )

};

//===========================================================================
const SetSpeechVolumeGroupsBJ = () => {

	// Delay the request if it occurs at map init.

	if ( bj_gameStarted ) {

		SetSpeechVolumeGroupsImmediateBJ()

	} else {

		TimerStart( bj_volumeGroupsTimer, bj_GAME_STARTED_THRESHOLD, false, SetSpeechVolumeGroupsImmediateBJ )

	}

};

//===========================================================================
const VolumeGroupResetImmediateBJ = () => {

	VolumeGroupReset()

};

//===========================================================================
const VolumeGroupResetBJ = () => {

	// Delay the request if it occurs at map init.

	if ( bj_gameStarted ) {

		VolumeGroupResetImmediateBJ()

	} else {

		TimerStart( bj_volumeGroupsTimer, bj_GAME_STARTED_THRESHOLD, false, VolumeGroupResetImmediateBJ )

	}

};

//===========================================================================
const GetSoundIsPlayingBJ = ( soundHandle ) => {

	return GetSoundIsLoading( soundHandle ) || GetSoundIsPlaying( soundHandle )

};

//===========================================================================
const WaitForSoundBJ = ( soundHandle, offset ) => {

	TriggerWaitForSound( soundHandle, offset )

};

//===========================================================================
const SetMapMusicIndexedBJ = ( musicName, index ) => {

	SetMapMusic( musicName, false, index )

};

//===========================================================================
const SetMapMusicRandomBJ = ( musicName ) => {

	SetMapMusic( musicName, true, 0 )

};

//===========================================================================
const ClearMapMusicBJ = () => {

	ClearMapMusic()

};

//===========================================================================
const SetStackedSoundBJ = ( add, soundHandle, r ) => {

	let width = GetRectMaxX( r ) - GetRectMinX( r );
	let height = GetRectMaxY( r ) - GetRectMinY( r );

	SetSoundPosition( soundHandle, GetRectCenterX( r ), GetRectCenterY( r ), 0 )

	if ( add ) {

		RegisterStackedSound( soundHandle, true, width, height )

	} else {

		UnregisterStackedSound( soundHandle, true, width, height )

	}

};

//===========================================================================
const StartSoundForPlayerBJ = ( whichPlayer, soundHandle ) => {

	if ( ( whichPlayer == GetLocalPlayer() ) ) {

		StartSound( soundHandle )

	}

};

//===========================================================================
const VolumeGroupSetVolumeForPlayerBJ = ( whichPlayer, vgroup, scale ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		VolumeGroupSetVolume( vgroup, scale )

	}

};

//===========================================================================
const EnableDawnDusk = ( flag ) => {

	bj_useDawnDuskSounds = flag;

};

//===========================================================================
const IsDawnDuskEnabled = () => {

	return bj_useDawnDuskSounds

};

//***************************************************************************
//*
//*  Day/Night ambient sounds
//*
//***************************************************************************

//===========================================================================
const SetAmbientDaySound = ( inLabel ) => {

	let ToD;

	// Stop old sound, if necessary

	if ( ( bj_dayAmbientSound != null ) ) {

		StopSound( bj_dayAmbientSound, true, true )

	}

	// Create new sound
	bj_dayAmbientSound = CreateMIDISound( inLabel, 20, 20 );

	// Start the sound if necessary, based on current time
	ToD = GetTimeOfDay();

	if ( ( ToD >= bj_TOD_DAWN && ToD < bj_TOD_DUSK ) ) {

		StartSound( bj_dayAmbientSound )

	}

};

//===========================================================================
const SetAmbientNightSound = ( inLabel ) => {

	let ToD;

	// Stop old sound, if necessary

	if ( ( bj_nightAmbientSound != null ) ) {

		StopSound( bj_nightAmbientSound, true, true )

	}

	// Create new sound
	bj_nightAmbientSound = CreateMIDISound( inLabel, 20, 20 );

	// Start the sound if necessary, based on current time
	ToD = GetTimeOfDay();

	if ( ( ToD < bj_TOD_DAWN || ToD >= bj_TOD_DUSK ) ) {

		StartSound( bj_nightAmbientSound )

	}

};

//***************************************************************************
//*
//*  Special Effect Utility Functions
//*
//***************************************************************************

//===========================================================================
const AddSpecialEffectLocBJ = ( where, modelName ) => {

	bj_lastCreatedEffect = AddSpecialEffectLoc( modelName, where );
	return bj_lastCreatedEffect

};

//===========================================================================
const AddSpecialEffectTargetUnitBJ = ( attachPointName, targetWidget, modelName ) => {

	bj_lastCreatedEffect = AddSpecialEffectTarget( modelName, targetWidget, attachPointName );
	return bj_lastCreatedEffect

};

//===========================================================================
// Two distinct trigger actions can't share the same function name, so this
// dummy function simply mimics the behavior of an existing call.
//
// Commented out - Destructibles have no attachment points.
//
//function AddSpecialEffectTargetDestructableBJ takes string attachPointName, widget targetWidget, string modelName returns effect
//    return AddSpecialEffectTargetUnitBJ(attachPointName, targetWidget, modelName)
//endfunction

//===========================================================================
// Two distinct trigger actions can't share the same function name, so this
// dummy function simply mimics the behavior of an existing call.
//
// Commented out - Items have no attachment points.
//
//function AddSpecialEffectTargetItemBJ takes string attachPointName, widget targetWidget, string modelName returns effect
//    return AddSpecialEffectTargetUnitBJ(attachPointName, targetWidget, modelName)
//endfunction

//===========================================================================
const DestroyEffectBJ = ( whichEffect ) => {

	DestroyEffect( whichEffect )

};

//===========================================================================
const GetLastCreatedEffectBJ = () => {

	return bj_lastCreatedEffect

};

//***************************************************************************
//*
//*  Hero and Item Utility Functions
//*
//***************************************************************************

//===========================================================================
const GetItemLoc = ( whichItem ) => {

	return Location( GetItemX( whichItem ), GetItemY( whichItem ) )

};

//===========================================================================
const GetItemLifeBJ = ( whichWidget ) => {

	return GetWidgetLife( whichWidget )

};

//===========================================================================
const SetItemLifeBJ = ( whichWidget, life ) => {

	SetWidgetLife( whichWidget, life )

};

//===========================================================================
const AddHeroXPSwapped = ( xpToAdd, whichHero, showEyeCandy ) => {

	AddHeroXP( whichHero, xpToAdd, showEyeCandy )

};

//===========================================================================
const SetHeroLevelBJ = ( whichHero, newLevel, showEyeCandy ) => {

	let oldLevel = GetHeroLevel( whichHero );

	if ( ( newLevel > oldLevel ) ) {

		SetHeroLevel( whichHero, newLevel, showEyeCandy )

	} else if ( ( newLevel < oldLevel ) ) {

		UnitStripHeroLevel( whichHero, oldLevel - newLevel )

	} else {

		// No change in level - ignore the request.

	}

};

//===========================================================================
const DecUnitAbilityLevelSwapped = ( abilcode, whichUnit ) => {

	return DecUnitAbilityLevel( whichUnit, abilcode )

};

//===========================================================================
const IncUnitAbilityLevelSwapped = ( abilcode, whichUnit ) => {

	return IncUnitAbilityLevel( whichUnit, abilcode )

};

//===========================================================================
const SetUnitAbilityLevelSwapped = ( abilcode, whichUnit, level ) => {

	return SetUnitAbilityLevel( whichUnit, abilcode, level )

};

//===========================================================================
const GetUnitAbilityLevelSwapped = ( abilcode, whichUnit ) => {

	return GetUnitAbilityLevel( whichUnit, abilcode )

};

//===========================================================================
const UnitHasBuffBJ = ( whichUnit, buffcode ) => {

	return ( GetUnitAbilityLevel( whichUnit, buffcode ) > 0 )

};

//===========================================================================
const UnitRemoveBuffBJ = ( buffcode, whichUnit ) => {

	return UnitRemoveAbility( whichUnit, buffcode )

};

//===========================================================================
const UnitAddItemSwapped = ( whichItem, whichHero ) => {

	return UnitAddItem( whichHero, whichItem )

};

//===========================================================================
const UnitAddItemByIdSwapped = ( itemId, whichHero ) => {

	// Create the item at the hero's feet first, and then give it to him.
	// This is to ensure that the item will be left at the hero's feet if
	// his inventory is full. 
	bj_lastCreatedItem = CreateItem( itemId, GetUnitX( whichHero ), GetUnitY( whichHero ) );
	UnitAddItem( whichHero, bj_lastCreatedItem )
	return bj_lastCreatedItem

};

//===========================================================================
const UnitRemoveItemSwapped = ( whichItem, whichHero ) => {

	bj_lastRemovedItem = whichItem;
	UnitRemoveItem( whichHero, whichItem )

};

//===========================================================================
// Translates 0-based slot indices to 1-based slot indices.
//
const UnitRemoveItemFromSlotSwapped = ( itemSlot, whichHero ) => {

	bj_lastRemovedItem = UnitRemoveItemFromSlot( whichHero, itemSlot - 1 );
	return bj_lastRemovedItem

};

//===========================================================================
const CreateItemLoc = ( itemId, loc ) => {

	bj_lastCreatedItem = CreateItem( itemId, GetLocationX( loc ), GetLocationY( loc ) );
	return bj_lastCreatedItem

};

//===========================================================================
const GetLastCreatedItem = () => {

	return bj_lastCreatedItem

};

//===========================================================================
const GetLastRemovedItem = () => {

	return bj_lastRemovedItem

};

//===========================================================================
const SetItemPositionLoc = ( whichItem, loc ) => {

	SetItemPosition( whichItem, GetLocationX( loc ), GetLocationY( loc ) )

};

//===========================================================================
const GetLearnedSkillBJ = () => {

	return GetLearnedSkill()

};

//===========================================================================
const SuspendHeroXPBJ = ( flag, whichHero ) => {

	SuspendHeroXP( whichHero, ! flag )

};

//===========================================================================
const SetPlayerHandicapXPBJ = ( whichPlayer, handicapPercent ) => {

	SetPlayerHandicapXP( whichPlayer, handicapPercent * 0.01 )

};

//===========================================================================
const GetPlayerHandicapXPBJ = ( whichPlayer ) => {

	return GetPlayerHandicapXP( whichPlayer ) * 100

};

//===========================================================================
const SetPlayerHandicapBJ = ( whichPlayer, handicapPercent ) => {

	SetPlayerHandicap( whichPlayer, handicapPercent * 0.01 )

};

//===========================================================================
const GetPlayerHandicapBJ = ( whichPlayer ) => {

	return GetPlayerHandicap( whichPlayer ) * 100

};

//===========================================================================
const GetHeroStatBJ = ( whichStat, whichHero, includeBonuses ) => {

	if ( ( whichStat == bj_HEROSTAT_STR ) ) {

		return GetHeroStr( whichHero, includeBonuses )

	} else if ( ( whichStat == bj_HEROSTAT_AGI ) ) {

		return GetHeroAgi( whichHero, includeBonuses )

	} else if ( ( whichStat == bj_HEROSTAT_INT ) ) {

		return GetHeroInt( whichHero, includeBonuses )

	} else {

		// Unrecognized hero stat - return 0
		return 0

	}

};

//===========================================================================
const SetHeroStat = ( whichHero, whichStat, value ) => {

	// Ignore requests for negative hero stats.

	if ( ( value <= 0 ) ) {

		return null

	}

	if ( ( whichStat == bj_HEROSTAT_STR ) ) {

		SetHeroStr( whichHero, value, true )

	} else if ( ( whichStat == bj_HEROSTAT_AGI ) ) {

		SetHeroAgi( whichHero, value, true )

	} else if ( ( whichStat == bj_HEROSTAT_INT ) ) {

		SetHeroInt( whichHero, value, true )

	} else {

		// Unrecognized hero stat - ignore the request.

	}

};

//===========================================================================
const ModifyHeroStat = ( whichStat, whichHero, modifyMethod, value ) => {

	if ( ( modifyMethod == bj_MODIFYMETHOD_ADD ) ) {

		SetHeroStat( whichHero, whichStat, GetHeroStatBJ( whichStat, whichHero, false ) + value )

	} else if ( ( modifyMethod == bj_MODIFYMETHOD_SUB ) ) {

		SetHeroStat( whichHero, whichStat, GetHeroStatBJ( whichStat, whichHero, false ) - value )

	} else if ( ( modifyMethod == bj_MODIFYMETHOD_SET ) ) {

		SetHeroStat( whichHero, whichStat, value )

	} else {

		// Unrecognized modification method - ignore the request.

	}

};

//===========================================================================
const ModifyHeroSkillPoints = ( whichHero, modifyMethod, value ) => {

	if ( ( modifyMethod == bj_MODIFYMETHOD_ADD ) ) {

		return UnitModifySkillPoints( whichHero, value )

	} else if ( ( modifyMethod == bj_MODIFYMETHOD_SUB ) ) {

		return UnitModifySkillPoints( whichHero, - value )

	} else if ( ( modifyMethod == bj_MODIFYMETHOD_SET ) ) {

		return UnitModifySkillPoints( whichHero, value - GetHeroSkillPoints( whichHero ) )

	} else {

		// Unrecognized modification method - ignore the request and return failure.
		return false

	}

};

//===========================================================================
const UnitDropItemPointBJ = ( whichUnit, whichItem, x, y ) => {

	return UnitDropItemPoint( whichUnit, whichItem, x, y )

};

//===========================================================================
const UnitDropItemPointLoc = ( whichUnit, whichItem, loc ) => {

	return UnitDropItemPoint( whichUnit, whichItem, GetLocationX( loc ), GetLocationY( loc ) )

};

//===========================================================================
const UnitDropItemSlotBJ = ( whichUnit, whichItem, slot ) => {

	return UnitDropItemSlot( whichUnit, whichItem, slot - 1 )

};

//===========================================================================
const UnitDropItemTargetBJ = ( whichUnit, whichItem, target ) => {

	return UnitDropItemTarget( whichUnit, whichItem, target )

};

//===========================================================================
// Two distinct trigger actions can't share the same function name, so this
// dummy function simply mimics the behavior of an existing call.
//
const UnitUseItemDestructable = ( whichUnit, whichItem, target ) => {

	return UnitUseItemTarget( whichUnit, whichItem, target )

};

//===========================================================================
const UnitUseItemPointLoc = ( whichUnit, whichItem, loc ) => {

	return UnitUseItemPoint( whichUnit, whichItem, GetLocationX( loc ), GetLocationY( loc ) )

};

//===========================================================================
// Translates 0-based slot indices to 1-based slot indices.
//
const UnitItemInSlotBJ = ( whichUnit, itemSlot ) => {

	return UnitItemInSlot( whichUnit, itemSlot - 1 )

};

//===========================================================================
// Translates 0-based slot indices to 1-based slot indices.
//
const GetInventoryIndexOfItemTypeBJ = ( whichUnit, itemId ) => {

	let index;
	let indexItem;

	index = 0;

	while ( true ) {

		indexItem = UnitItemInSlot( whichUnit, index );

		if ( ( indexItem != null ) && ( GetItemTypeId( indexItem ) == itemId ) ) {

			return index + 1

		}

		index = index + 1;
		if ( index >= bj_MAX_INVENTORY ) break;

	}

	return 0

};

//===========================================================================
const GetItemOfTypeFromUnitBJ = ( whichUnit, itemId ) => {

	let index = GetInventoryIndexOfItemTypeBJ( whichUnit, itemId );

	if ( ( index == 0 ) ) {

		return null

	} else {

		return UnitItemInSlot( whichUnit, index - 1 )

	}

};

//===========================================================================
const UnitHasItemOfTypeBJ = ( whichUnit, itemId ) => {

	return GetInventoryIndexOfItemTypeBJ( whichUnit, itemId ) > 0

};

//===========================================================================
const UnitInventoryCount = ( whichUnit ) => {

	let index = 0;
	let count = 0;

	while ( true ) {

		if ( ( UnitItemInSlot( whichUnit, index ) != null ) ) {

			count = count + 1;

		}

		index = index + 1;
		if ( index >= bj_MAX_INVENTORY ) break;

	}

	return count

};

//===========================================================================
const UnitInventorySizeBJ = ( whichUnit ) => {

	return UnitInventorySize( whichUnit )

};

//===========================================================================
const SetItemInvulnerableBJ = ( whichItem, flag ) => {

	SetItemInvulnerable( whichItem, flag )

};

//===========================================================================
const SetItemDropOnDeathBJ = ( whichItem, flag ) => {

	SetItemDropOnDeath( whichItem, flag )

};

//===========================================================================
const SetItemDroppableBJ = ( whichItem, flag ) => {

	SetItemDroppable( whichItem, flag )

};

//===========================================================================
const SetItemPlayerBJ = ( whichItem, whichPlayer, changeColor ) => {

	SetItemPlayer( whichItem, whichPlayer, changeColor )

};

//===========================================================================
const SetItemVisibleBJ = ( show, whichItem ) => {

	SetItemVisible( whichItem, show )

};

//===========================================================================
const IsItemHiddenBJ = ( whichItem ) => {

	return ! IsItemVisible( whichItem )

};

//===========================================================================
const ChooseRandomItemBJ = ( level ) => {

	return ChooseRandomItem( level )

};

//===========================================================================
const ChooseRandomItemExBJ = ( level, whichType ) => {

	return ChooseRandomItemEx( whichType, level )

};

//===========================================================================
const ChooseRandomNPBuildingBJ = () => {

	return ChooseRandomNPBuilding()

};

//===========================================================================
const ChooseRandomCreepBJ = ( level ) => {

	return ChooseRandomCreep( level )

};

//===========================================================================
const EnumItemsInRectBJ = ( r, actionFunc ) => {

	EnumItemsInRect( r, null, actionFunc )

};

//===========================================================================
// See GroupPickRandomUnitEnum for the details of this algorithm.
//
const RandomItemInRectBJEnum = () => {

	bj_itemRandomConsidered = bj_itemRandomConsidered + 1;

	if ( ( GetRandomInt( 1, bj_itemRandomConsidered ) == 1 ) ) {

		bj_itemRandomCurrentPick = GetEnumItem();

	}

};

//===========================================================================
// Picks a random item from within a rect, matching a condition
//
const RandomItemInRectBJ = ( r, filter ) => {

	bj_itemRandomConsidered = 0;
	bj_itemRandomCurrentPick = null;
	EnumItemsInRect( r, filter, RandomItemInRectBJEnum )
	DestroyBoolExpr( filter )
	return bj_itemRandomCurrentPick

};

//===========================================================================
// Picks a random item from within a rect
//
const RandomItemInRectSimpleBJ = ( r ) => {

	return RandomItemInRectBJ( r, null )

};

//===========================================================================
const CheckItemStatus = ( whichItem, status ) => {

	if ( ( status == bj_ITEM_STATUS_HIDDEN ) ) {

		return ! IsItemVisible( whichItem )

	} else if ( ( status == bj_ITEM_STATUS_OWNED ) ) {

		return IsItemOwned( whichItem )

	} else if ( ( status == bj_ITEM_STATUS_INVULNERABLE ) ) {

		return IsItemInvulnerable( whichItem )

	} else if ( ( status == bj_ITEM_STATUS_POWERUP ) ) {

		return IsItemPowerup( whichItem )

	} else if ( ( status == bj_ITEM_STATUS_SELLABLE ) ) {

		return IsItemSellable( whichItem )

	} else if ( ( status == bj_ITEM_STATUS_PAWNABLE ) ) {

		return IsItemPawnable( whichItem )

	} else {

		// Unrecognized status - return false
		return false

	}

};

//===========================================================================
const CheckItemcodeStatus = ( itemId, status ) => {

	if ( ( status == bj_ITEMCODE_STATUS_POWERUP ) ) {

		return IsItemIdPowerup( itemId )

	} else if ( ( status == bj_ITEMCODE_STATUS_SELLABLE ) ) {

		return IsItemIdSellable( itemId )

	} else if ( ( status == bj_ITEMCODE_STATUS_PAWNABLE ) ) {

		return IsItemIdPawnable( itemId )

	} else {

		// Unrecognized status - return false
		return false

	}

};

//***************************************************************************
//*
//*  Unit Utility Functions
//*
//***************************************************************************

//===========================================================================
const UnitId2OrderIdBJ = ( unitId ) => {

	return unitId

};

//===========================================================================
const String2UnitIdBJ = ( unitIdString ) => {

	return UnitId( unitIdString )

};

//===========================================================================
const UnitId2StringBJ = ( unitId ) => {

	let unitString = UnitId2String( unitId );

	if ( ( unitString != null ) ) {

		return unitString

	}

	// The unitId was not recognized - return an empty string.
	return ""

};

//===========================================================================
const String2OrderIdBJ = ( orderIdString ) => {

	let orderId;

	// Check to see if it's a generic order.
	orderId = OrderId( orderIdString );

	if ( ( orderId != 0 ) ) {

		return orderId

	}

	// Check to see if it's a (train) unit order.
	orderId = UnitId( orderIdString );

	if ( ( orderId != 0 ) ) {

		return orderId

	}

	// Unrecognized - return 0
	return 0

};

//===========================================================================
const OrderId2StringBJ = ( orderId ) => {

	let orderString;

	// Check to see if it's a generic order.
	orderString = OrderId2String( orderId );

	if ( ( orderString != null ) ) {

		return orderString

	}

	// Check to see if it's a (train) unit order.
	orderString = UnitId2String( orderId );

	if ( ( orderString != null ) ) {

		return orderString

	}

	// Unrecognized - return an empty string.
	return ""

};

//===========================================================================
const GetIssuedOrderIdBJ = () => {

	return GetIssuedOrderId()

};

//===========================================================================
const GetKillingUnitBJ = () => {

	return GetKillingUnit()

};

//===========================================================================
const CreateUnitAtLocSaveLast = ( id, unitid, loc, face ) => {

	if ( ( unitid == "ugol" ) ) {

		bj_lastCreatedUnit = CreateBlightedGoldmine( id, GetLocationX( loc ), GetLocationY( loc ), face );

	} else {

		bj_lastCreatedUnit = CreateUnitAtLoc( id, unitid, loc, face );

	}

	return bj_lastCreatedUnit

};

//===========================================================================
const GetLastCreatedUnit = () => {

	return bj_lastCreatedUnit

};

//===========================================================================
const CreateNUnitsAtLoc = ( count, unitId, whichPlayer, loc, face ) => {

	GroupClear( bj_lastCreatedGroup )

	while ( true ) {

		count = count - 1;
		if ( count < 0 ) break;
		CreateUnitAtLocSaveLast( whichPlayer, unitId, loc, face )
		GroupAddUnit( bj_lastCreatedGroup, bj_lastCreatedUnit )

	}

	return bj_lastCreatedGroup

};

//===========================================================================
const CreateNUnitsAtLocFacingLocBJ = ( count, unitId, whichPlayer, loc, lookAt ) => {

	return CreateNUnitsAtLoc( count, unitId, whichPlayer, loc, AngleBetweenPoints( loc, lookAt ) )

};

//===========================================================================
const GetLastCreatedGroupEnum = () => {

	GroupAddUnit( bj_groupLastCreatedDest, GetEnumUnit() )

};

//===========================================================================
const GetLastCreatedGroup = () => {

	bj_groupLastCreatedDest = CreateGroup();
	ForGroup( bj_lastCreatedGroup, GetLastCreatedGroupEnum )
	return bj_groupLastCreatedDest

};

//===========================================================================
const CreateCorpseLocBJ = ( unitid, whichPlayer, loc ) => {

	bj_lastCreatedUnit = CreateCorpse( whichPlayer, unitid, GetLocationX( loc ), GetLocationY( loc ), GetRandomReal( 0, 360 ) );
	return bj_lastCreatedUnit

};

//===========================================================================
const UnitSuspendDecayBJ = ( suspend, whichUnit ) => {

	UnitSuspendDecay( whichUnit, suspend )

};

//===========================================================================
const DelayedSuspendDecayStopAnimEnum = () => {

	let enumUnit = GetEnumUnit();

	if ( ( GetUnitState( enumUnit, UNIT_STATE_LIFE ) <= 0 ) ) {

		SetUnitTimeScale( enumUnit, 0.0001 )

	}

};

//===========================================================================
const DelayedSuspendDecayBoneEnum = () => {

	let enumUnit = GetEnumUnit();

	if ( ( GetUnitState( enumUnit, UNIT_STATE_LIFE ) <= 0 ) ) {

		UnitSuspendDecay( enumUnit, true )
		SetUnitTimeScale( enumUnit, 0.0001 )

	}

};

//===========================================================================
// Game code explicitly sets the animation back to "decay bone" after the
// initial corpse fades away, so we reset it now.  It's best not to show
// off corpses thus created until after this grace period has passed.
//
const DelayedSuspendDecayFleshEnum = () => {

	let enumUnit = GetEnumUnit();

	if ( ( GetUnitState( enumUnit, UNIT_STATE_LIFE ) <= 0 ) ) {

		UnitSuspendDecay( enumUnit, true )
		SetUnitTimeScale( enumUnit, 10 )
		SetUnitAnimation( enumUnit, "decay flesh" )

	}

};

//===========================================================================
// Waits a short period of time to ensure that the corpse is decaying, and
// then suspend the animation and corpse decay.
//
const DelayedSuspendDecay = () => {

	let boneGroup;
	let fleshGroup;

	// Switch the global unit groups over to local variables and recreate
	// the global versions, so that this function can handle overlapping
	// calls.
	boneGroup = bj_suspendDecayBoneGroup;
	fleshGroup = bj_suspendDecayFleshGroup;
	bj_suspendDecayBoneGroup = CreateGroup();
	bj_suspendDecayFleshGroup = CreateGroup();

	ForGroup( fleshGroup, DelayedSuspendDecayStopAnimEnum )
	ForGroup( boneGroup, DelayedSuspendDecayStopAnimEnum )

	TriggerSleepAction( bj_CORPSE_MAX_DEATH_TIME )
	ForGroup( fleshGroup, DelayedSuspendDecayFleshEnum )
	ForGroup( boneGroup, DelayedSuspendDecayBoneEnum )

	TriggerSleepAction( 0.05 )
	ForGroup( fleshGroup, DelayedSuspendDecayStopAnimEnum )

	DestroyGroup( boneGroup )
	DestroyGroup( fleshGroup )

};

//===========================================================================
const DelayedSuspendDecayCreate = () => {

	bj_delayedSuspendDecayTrig = CreateTrigger();
	TriggerRegisterTimerExpireEvent( bj_delayedSuspendDecayTrig, bj_delayedSuspendDecayTimer )
	TriggerAddAction( bj_delayedSuspendDecayTrig, DelayedSuspendDecay )

};

//===========================================================================
const CreatePermanentCorpseLocBJ = ( style, unitid, whichPlayer, loc, facing ) => {

	bj_lastCreatedUnit = CreateCorpse( whichPlayer, unitid, GetLocationX( loc ), GetLocationY( loc ), facing );
	SetUnitBlendTime( bj_lastCreatedUnit, 0 )

	if ( ( style == bj_CORPSETYPE_FLESH ) ) {

		SetUnitAnimation( bj_lastCreatedUnit, "decay flesh" )
		GroupAddUnit( bj_suspendDecayFleshGroup, bj_lastCreatedUnit )

	} else if ( ( style == bj_CORPSETYPE_BONE ) ) {

		SetUnitAnimation( bj_lastCreatedUnit, "decay bone" )
		GroupAddUnit( bj_suspendDecayBoneGroup, bj_lastCreatedUnit )

	} else {

		// Unknown decay style - treat as skeletal.
		SetUnitAnimation( bj_lastCreatedUnit, "decay bone" )
		GroupAddUnit( bj_suspendDecayBoneGroup, bj_lastCreatedUnit )

	}

	TimerStart( bj_delayedSuspendDecayTimer, 0.05, false, null )
	return bj_lastCreatedUnit

};

//===========================================================================
const GetUnitStateSwap = ( whichState, whichUnit ) => {

	return GetUnitState( whichUnit, whichState )

};

//===========================================================================
const GetUnitStatePercent = ( whichUnit, whichState, whichMaxState ) => {

	let value = GetUnitState( whichUnit, whichState );
	let maxValue = GetUnitState( whichUnit, whichMaxState );

	// Return 0 for null units.

	if ( ( whichUnit == null ) || ( maxValue == 0 ) ) {

		return 0

	}

	return value / maxValue * 100

};

//===========================================================================
const GetUnitLifePercent = ( whichUnit ) => {

	return GetUnitStatePercent( whichUnit, UNIT_STATE_LIFE, UNIT_STATE_MAX_LIFE )

};

//===========================================================================
const GetUnitManaPercent = ( whichUnit ) => {

	return GetUnitStatePercent( whichUnit, UNIT_STATE_MANA, UNIT_STATE_MAX_MANA )

};

//===========================================================================
const SelectUnitSingle = ( whichUnit ) => {

	ClearSelection()
	SelectUnit( whichUnit, true )

};

//===========================================================================
const SelectGroupBJEnum = () => {

	SelectUnit( GetEnumUnit(), true )

};

//===========================================================================
const SelectGroupBJ = ( g ) => {

	ClearSelection()
	ForGroup( g, SelectGroupBJEnum )

};

//===========================================================================
const SelectUnitAdd = ( whichUnit ) => {

	SelectUnit( whichUnit, true )

};

//===========================================================================
const SelectUnitRemove = ( whichUnit ) => {

	SelectUnit( whichUnit, false )

};

//===========================================================================
const ClearSelectionForPlayer = ( whichPlayer ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		ClearSelection()

	}

};

//===========================================================================
const SelectUnitForPlayerSingle = ( whichUnit, whichPlayer ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		ClearSelection()
		SelectUnit( whichUnit, true )

	}

};

//===========================================================================
const SelectGroupForPlayerBJ = ( g, whichPlayer ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		ClearSelection()
		ForGroup( g, SelectGroupBJEnum )

	}

};

//===========================================================================
const SelectUnitAddForPlayer = ( whichUnit, whichPlayer ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SelectUnit( whichUnit, true )

	}

};

//===========================================================================
const SelectUnitRemoveForPlayer = ( whichUnit, whichPlayer ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SelectUnit( whichUnit, false )

	}

};

//===========================================================================
const SetUnitLifeBJ = ( whichUnit, newValue ) => {

	SetUnitState( whichUnit, UNIT_STATE_LIFE, RMaxBJ( 0, newValue ) )

};

//===========================================================================
const SetUnitManaBJ = ( whichUnit, newValue ) => {

	SetUnitState( whichUnit, UNIT_STATE_MANA, RMaxBJ( 0, newValue ) )

};

//===========================================================================
const SetUnitLifePercentBJ = ( whichUnit, percent ) => {

	SetUnitState( whichUnit, UNIT_STATE_LIFE, GetUnitState( whichUnit, UNIT_STATE_MAX_LIFE ) * RMaxBJ( 0, percent ) * 0.01 )

};

//===========================================================================
const SetUnitManaPercentBJ = ( whichUnit, percent ) => {

	SetUnitState( whichUnit, UNIT_STATE_MANA, GetUnitState( whichUnit, UNIT_STATE_MAX_MANA ) * RMaxBJ( 0, percent ) * 0.01 )

};

//===========================================================================
const IsUnitDeadBJ = ( whichUnit ) => {

	return GetUnitState( whichUnit, UNIT_STATE_LIFE ) <= 0

};

//===========================================================================
const IsUnitAliveBJ = ( whichUnit ) => {

	return ! IsUnitDeadBJ( whichUnit )

};

//===========================================================================
const IsUnitGroupDeadBJEnum = () => {

	if ( ! IsUnitDeadBJ( GetEnumUnit() ) ) {

		bj_isUnitGroupDeadResult = false;

	}

};

//===========================================================================
// Returns true if every unit of the group is dead.
//
const IsUnitGroupDeadBJ = ( g ) => {

	// If the user wants the group destroyed, remember that fact and clear
	// the flag, in case it is used again in the callback.
	let wantDestroy = bj_wantDestroyGroup;
	bj_wantDestroyGroup = false;

	bj_isUnitGroupDeadResult = true;
	ForGroup( g, IsUnitGroupDeadBJEnum )

	// If the user wants the group destroyed, do so now.

	if ( ( wantDestroy ) ) {

		DestroyGroup( g )

	}

	return bj_isUnitGroupDeadResult

};

//===========================================================================
const IsUnitGroupEmptyBJEnum = () => {

	bj_isUnitGroupEmptyResult = false;

};

//===========================================================================
// Returns true if the group contains no units.
//
const IsUnitGroupEmptyBJ = ( g ) => {

	// If the user wants the group destroyed, remember that fact and clear
	// the flag, in case it is used again in the callback.
	let wantDestroy = bj_wantDestroyGroup;
	bj_wantDestroyGroup = false;

	bj_isUnitGroupEmptyResult = true;
	ForGroup( g, IsUnitGroupEmptyBJEnum )

	// If the user wants the group destroyed, do so now.

	if ( ( wantDestroy ) ) {

		DestroyGroup( g )

	}

	return bj_isUnitGroupEmptyResult

};

//===========================================================================
const IsUnitGroupInRectBJEnum = () => {

	if ( ! RectContainsUnit( bj_isUnitGroupInRectRect, GetEnumUnit() ) ) {

		bj_isUnitGroupInRectResult = false;

	}

};

//===========================================================================
// Returns true if every unit of the group is within the given rect.
//
const IsUnitGroupInRectBJ = ( g, r ) => {

	bj_isUnitGroupInRectResult = true;
	bj_isUnitGroupInRectRect = r;
	ForGroup( g, IsUnitGroupInRectBJEnum )
	return bj_isUnitGroupInRectResult

};

//===========================================================================
const IsUnitHiddenBJ = ( whichUnit ) => {

	return IsUnitHidden( whichUnit )

};

//===========================================================================
const ShowUnitHide = ( whichUnit ) => {

	ShowUnit( whichUnit, false )

};

//===========================================================================
const ShowUnitShow = ( whichUnit ) => {

	// Prevent dead heroes from being unhidden.

	if ( ( IsUnitType( whichUnit, UNIT_TYPE_HERO ) && IsUnitDeadBJ( whichUnit ) ) ) {

		return null

	}

	ShowUnit( whichUnit, true )

};

//===========================================================================
const IssueHauntOrderAtLocBJFilter = () => {

	return GetUnitTypeId( GetFilterUnit() ) == "ngol"

};

//===========================================================================
const IssueHauntOrderAtLocBJ = ( whichPeon, loc ) => {

	let g;
	let goldMine;

	// Search for a gold mine within a 1-cell radius of the specified location.
	g = CreateGroup();
	GroupEnumUnitsInRangeOfLoc( g, loc, 2 * bj_CELLWIDTH, filterIssueHauntOrderAtLocBJ )
	goldMine = FirstOfGroup( g );
	DestroyGroup( g )

	// If no mine was found, abort the request.

	if ( ( goldMine == null ) ) {

		return false

	}

	// Issue the Haunt Gold Mine order.
	return IssueTargetOrderById( whichPeon, "ugol", goldMine )

};

//===========================================================================
const IssueBuildOrderByIdLocBJ = ( whichPeon, unitId, loc ) => {

	if ( ( unitId == "ugol" ) ) {

		return IssueHauntOrderAtLocBJ( whichPeon, loc )

	} else {

		return IssueBuildOrderById( whichPeon, unitId, GetLocationX( loc ), GetLocationY( loc ) )

	}

};

//===========================================================================
const IssueTrainOrderByIdBJ = ( whichUnit, unitId ) => {

	return IssueImmediateOrderById( whichUnit, unitId )

};

//===========================================================================
const GroupTrainOrderByIdBJ = ( g, unitId ) => {

	return GroupImmediateOrderById( g, unitId )

};

//===========================================================================
const IssueUpgradeOrderByIdBJ = ( whichUnit, techId ) => {

	return IssueImmediateOrderById( whichUnit, techId )

};

//===========================================================================
const GetAttackedUnitBJ = () => {

	return GetTriggerUnit()

};

//===========================================================================
const SetUnitFlyHeightBJ = ( whichUnit, newHeight, rate ) => {

	SetUnitFlyHeight( whichUnit, newHeight, rate )

};

//===========================================================================
const SetUnitTurnSpeedBJ = ( whichUnit, turnSpeed ) => {

	SetUnitTurnSpeed( whichUnit, turnSpeed )

};

//===========================================================================
const SetUnitPropWindowBJ = ( whichUnit, propWindow ) => {

	let angle = propWindow;

	if ( ( angle <= 0 ) ) {

		angle = 1;

	} else if ( ( angle >= 360 ) ) {

		angle = 359;

	}

	angle = angle * bj_DEGTORAD;

	SetUnitPropWindow( whichUnit, angle )

};

//===========================================================================
const GetUnitPropWindowBJ = ( whichUnit ) => {

	return GetUnitPropWindow( whichUnit ) * bj_RADTODEG

};

//===========================================================================
const GetUnitDefaultPropWindowBJ = ( whichUnit ) => {

	return GetUnitDefaultPropWindow( whichUnit )

};

//===========================================================================
const SetUnitBlendTimeBJ = ( whichUnit, blendTime ) => {

	SetUnitBlendTime( whichUnit, blendTime )

};

//===========================================================================
const SetUnitAcquireRangeBJ = ( whichUnit, acquireRange ) => {

	SetUnitAcquireRange( whichUnit, acquireRange )

};

//===========================================================================
const UnitSetCanSleepBJ = ( whichUnit, canSleep ) => {

	UnitAddSleep( whichUnit, canSleep )

};

//===========================================================================
const UnitCanSleepBJ = ( whichUnit ) => {

	return UnitCanSleep( whichUnit )

};

//===========================================================================
const UnitWakeUpBJ = ( whichUnit ) => {

	UnitWakeUp( whichUnit )

};

//===========================================================================
const UnitIsSleepingBJ = ( whichUnit ) => {

	return UnitIsSleeping( whichUnit )

};

//===========================================================================
const WakePlayerUnitsEnum = () => {

	UnitWakeUp( GetEnumUnit() )

};

//===========================================================================
const WakePlayerUnits = ( whichPlayer ) => {

	let g = CreateGroup();
	GroupEnumUnitsOfPlayer( g, whichPlayer, null )
	ForGroup( g, WakePlayerUnitsEnum )
	DestroyGroup( g )

};

//===========================================================================
const EnableCreepSleepBJ = ( enable ) => {

	SetPlayerState( Player( PLAYER_NEUTRAL_AGGRESSIVE ), PLAYER_STATE_NO_CREEP_SLEEP, IntegerTertiaryOp( enable, 0, 1 ) )

	// If we're disabling, attempt to wake any already-sleeping creeps.

	if ( ( ! enable ) ) {

		WakePlayerUnits( Player( PLAYER_NEUTRAL_AGGRESSIVE ) )

	}

};

//===========================================================================
const UnitGenerateAlarms = ( whichUnit, generate ) => {

	return UnitIgnoreAlarm( whichUnit, ! generate )

};

//===========================================================================
const DoesUnitGenerateAlarms = ( whichUnit ) => {

	return ! UnitIgnoreAlarmToggled( whichUnit )

};

//===========================================================================
const PauseAllUnitsBJEnum = () => {

	PauseUnit( GetEnumUnit(), bj_pauseAllUnitsFlag )

};

//===========================================================================
// Pause all units 
const PauseAllUnitsBJ = ( pause ) => {

	let index;
	let indexPlayer;
	let g;

	bj_pauseAllUnitsFlag = pause;
	g = CreateGroup();
	index = 0;

	while ( true ) {

		indexPlayer = Player( index );

		// If this is a computer slot, pause/resume the AI.

		if ( ( GetPlayerController( indexPlayer ) == MAP_CONTROL_COMPUTER ) ) {

			PauseCompAI( indexPlayer, pause )

		}

		// Enumerate and unpause every unit owned by the player.
		GroupEnumUnitsOfPlayer( g, indexPlayer, null )
		ForGroup( g, PauseAllUnitsBJEnum )
		GroupClear( g )

		index = index + 1;
		if ( index == bj_MAX_PLAYER_SLOTS ) break;

	}

	DestroyGroup( g )

};

//===========================================================================
const PauseUnitBJ = ( pause, whichUnit ) => {

	PauseUnit( whichUnit, pause )

};

//===========================================================================
const IsUnitPausedBJ = ( whichUnit ) => {

	return IsUnitPaused( whichUnit )

};

//===========================================================================
const UnitPauseTimedLifeBJ = ( flag, whichUnit ) => {

	UnitPauseTimedLife( whichUnit, flag )

};

//===========================================================================
const UnitApplyTimedLifeBJ = ( duration, buffId, whichUnit ) => {

	UnitApplyTimedLife( whichUnit, buffId, duration )

};

//===========================================================================
const UnitShareVisionBJ = ( share, whichUnit, whichPlayer ) => {

	UnitShareVision( whichUnit, whichPlayer, share )

};

//===========================================================================
const UnitRemoveBuffsBJ = ( buffType, whichUnit ) => {

	if ( ( buffType == bj_REMOVEBUFFS_POSITIVE ) ) {

		UnitRemoveBuffs( whichUnit, true, false )

	} else if ( ( buffType == bj_REMOVEBUFFS_NEGATIVE ) ) {

		UnitRemoveBuffs( whichUnit, false, true )

	} else if ( ( buffType == bj_REMOVEBUFFS_ALL ) ) {

		UnitRemoveBuffs( whichUnit, true, true )

	} else if ( ( buffType == bj_REMOVEBUFFS_NONTLIFE ) ) {

		UnitRemoveBuffsEx( whichUnit, true, true, false, false, false, true, false )

	} else {

		// Unrecognized dispel type - ignore the request.

	}

};

//===========================================================================
const UnitRemoveBuffsExBJ = ( polarity, resist, whichUnit, bTLife, bAura ) => {

	let bPos = ( polarity == bj_BUFF_POLARITY_EITHER ) || ( polarity == bj_BUFF_POLARITY_POSITIVE );
	let bNeg = ( polarity == bj_BUFF_POLARITY_EITHER ) || ( polarity == bj_BUFF_POLARITY_NEGATIVE );
	let bMagic = ( resist == bj_BUFF_RESIST_BOTH ) || ( resist == bj_BUFF_RESIST_MAGIC );
	let bPhys = ( resist == bj_BUFF_RESIST_BOTH ) || ( resist == bj_BUFF_RESIST_PHYSICAL );

	UnitRemoveBuffsEx( whichUnit, bPos, bNeg, bMagic, bPhys, bTLife, bAura, false )

};

//===========================================================================
const UnitCountBuffsExBJ = ( polarity, resist, whichUnit, bTLife, bAura ) => {

	let bPos = ( polarity == bj_BUFF_POLARITY_EITHER ) || ( polarity == bj_BUFF_POLARITY_POSITIVE );
	let bNeg = ( polarity == bj_BUFF_POLARITY_EITHER ) || ( polarity == bj_BUFF_POLARITY_NEGATIVE );
	let bMagic = ( resist == bj_BUFF_RESIST_BOTH ) || ( resist == bj_BUFF_RESIST_MAGIC );
	let bPhys = ( resist == bj_BUFF_RESIST_BOTH ) || ( resist == bj_BUFF_RESIST_PHYSICAL );

	return UnitCountBuffsEx( whichUnit, bPos, bNeg, bMagic, bPhys, bTLife, bAura, false )

};

//===========================================================================
const UnitRemoveAbilityBJ = ( abilityId, whichUnit ) => {

	return UnitRemoveAbility( whichUnit, abilityId )

};

//===========================================================================
const UnitAddAbilityBJ = ( abilityId, whichUnit ) => {

	return UnitAddAbility( whichUnit, abilityId )

};

//===========================================================================
const UnitRemoveTypeBJ = ( whichType, whichUnit ) => {

	return UnitRemoveType( whichUnit, whichType )

};

//===========================================================================
const UnitAddTypeBJ = ( whichType, whichUnit ) => {

	return UnitAddType( whichUnit, whichType )

};

//===========================================================================
const UnitMakeAbilityPermanentBJ = ( permanent, abilityId, whichUnit ) => {

	return UnitMakeAbilityPermanent( whichUnit, permanent, abilityId )

};

//===========================================================================
const SetUnitExplodedBJ = ( whichUnit, exploded ) => {

	SetUnitExploded( whichUnit, exploded )

};

//===========================================================================
const ExplodeUnitBJ = ( whichUnit ) => {

	SetUnitExploded( whichUnit, true )
	KillUnit( whichUnit )

};

//===========================================================================
const GetTransportUnitBJ = () => {

	return GetTransportUnit()

};

//===========================================================================
const GetLoadedUnitBJ = () => {

	return GetLoadedUnit()

};

//===========================================================================
const IsUnitInTransportBJ = ( whichUnit, whichTransport ) => {

	return IsUnitInTransport( whichUnit, whichTransport )

};

//===========================================================================
const IsUnitLoadedBJ = ( whichUnit ) => {

	return IsUnitLoaded( whichUnit )

};

//===========================================================================
const IsUnitIllusionBJ = ( whichUnit ) => {

	return IsUnitIllusion( whichUnit )

};

//===========================================================================
// This attempts to replace a unit with a new unit type by creating a new
// unit of the desired type using the old unit's location, facing, etc.
//
const ReplaceUnitBJ = ( whichUnit, newUnitId, unitStateMethod ) => {

	let oldUnit = whichUnit;
	let newUnit;
	let wasHidden;
	let index;
	let indexItem;
	let oldRatio;

	// If we have bogus data, don't attempt the replace.

	if ( ( oldUnit == null ) ) {

		bj_lastReplacedUnit = oldUnit;
		return oldUnit

	}

	// Hide the original unit.
	wasHidden = IsUnitHidden( oldUnit );
	ShowUnit( oldUnit, false )

	// Create the replacement unit.

	if ( ( newUnitId == "ugol" ) ) {

		newUnit = CreateBlightedGoldmine( GetOwningPlayer( oldUnit ), GetUnitX( oldUnit ), GetUnitY( oldUnit ), GetUnitFacing( oldUnit ) );

	} else {

		newUnit = CreateUnit( GetOwningPlayer( oldUnit ), newUnitId, GetUnitX( oldUnit ), GetUnitY( oldUnit ), GetUnitFacing( oldUnit ) );

	}

	// Set the unit's life and mana according to the requested method.

	if ( ( unitStateMethod == bj_UNIT_STATE_METHOD_RELATIVE ) ) {

		// Set the replacement's current/max life ratio to that of the old unit.
		// If both units have mana, do the same for mana.

		if ( ( GetUnitState( oldUnit, UNIT_STATE_MAX_LIFE ) > 0 ) ) {

			oldRatio = GetUnitState( oldUnit, UNIT_STATE_LIFE ) / GetUnitState( oldUnit, UNIT_STATE_MAX_LIFE );
			SetUnitState( newUnit, UNIT_STATE_LIFE, oldRatio * GetUnitState( newUnit, UNIT_STATE_MAX_LIFE ) )

		}

		if ( ( GetUnitState( oldUnit, UNIT_STATE_MAX_MANA ) > 0 ) && ( GetUnitState( newUnit, UNIT_STATE_MAX_MANA ) > 0 ) ) {

			oldRatio = GetUnitState( oldUnit, UNIT_STATE_MANA ) / GetUnitState( oldUnit, UNIT_STATE_MAX_MANA );
			SetUnitState( newUnit, UNIT_STATE_MANA, oldRatio * GetUnitState( newUnit, UNIT_STATE_MAX_MANA ) )

		}

	} else if ( ( unitStateMethod == bj_UNIT_STATE_METHOD_ABSOLUTE ) ) {

		// Set the replacement's current life to that of the old unit.
		// If the new unit has mana, do the same for mana.
		SetUnitState( newUnit, UNIT_STATE_LIFE, GetUnitState( oldUnit, UNIT_STATE_LIFE ) )

		if ( ( GetUnitState( newUnit, UNIT_STATE_MAX_MANA ) > 0 ) ) {

			SetUnitState( newUnit, UNIT_STATE_MANA, GetUnitState( oldUnit, UNIT_STATE_MANA ) )

		}

	} else if ( ( unitStateMethod == bj_UNIT_STATE_METHOD_DEFAULTS ) ) {

		// The newly created unit should already have default life and mana.

	} else if ( ( unitStateMethod == bj_UNIT_STATE_METHOD_MAXIMUM ) ) {

		// Use max life and mana.
		SetUnitState( newUnit, UNIT_STATE_LIFE, GetUnitState( newUnit, UNIT_STATE_MAX_LIFE ) )
		SetUnitState( newUnit, UNIT_STATE_MANA, GetUnitState( newUnit, UNIT_STATE_MAX_MANA ) )

	} else {

		// Unrecognized unit state method - ignore the request.

	}

	// Mirror properties of the old unit onto the new unit.
	//call PauseUnit(newUnit, IsUnitPaused(oldUnit))
	SetResourceAmount( newUnit, GetResourceAmount( oldUnit ) )

	// If both the old and new units are heroes, handle their hero info.

	if ( ( IsUnitType( oldUnit, UNIT_TYPE_HERO ) && IsUnitType( newUnit, UNIT_TYPE_HERO ) ) ) {

		SetHeroXP( newUnit, GetHeroXP( oldUnit ), false )

		index = 0;

		while ( true ) {

			indexItem = UnitItemInSlot( oldUnit, index );

			if ( ( indexItem != null ) ) {

				UnitRemoveItem( oldUnit, indexItem )
				UnitAddItem( newUnit, indexItem )

			}

			index = index + 1;
			if ( index >= bj_MAX_INVENTORY ) break;

		}

	}

	// Remove or kill the original unit.  It is sometimes unsafe to remove
	// hidden units, so kill the original unit if it was previously hidden.

	if ( wasHidden ) {

		KillUnit( oldUnit )
		RemoveUnit( oldUnit )

	} else {

		RemoveUnit( oldUnit )

	}

	bj_lastReplacedUnit = newUnit;
	return newUnit

};

//===========================================================================
const GetLastReplacedUnitBJ = () => {

	return bj_lastReplacedUnit

};

//===========================================================================
const SetUnitPositionLocFacingBJ = ( whichUnit, loc, facing ) => {

	SetUnitPositionLoc( whichUnit, loc )
	SetUnitFacing( whichUnit, facing )

};

//===========================================================================
const SetUnitPositionLocFacingLocBJ = ( whichUnit, loc, lookAt ) => {

	SetUnitPositionLoc( whichUnit, loc )
	SetUnitFacing( whichUnit, AngleBetweenPoints( loc, lookAt ) )

};

//===========================================================================
const AddItemToStockBJ = ( itemId, whichUnit, currentStock, stockMax ) => {

	AddItemToStock( whichUnit, itemId, currentStock, stockMax )

};

//===========================================================================
const AddUnitToStockBJ = ( unitId, whichUnit, currentStock, stockMax ) => {

	AddUnitToStock( whichUnit, unitId, currentStock, stockMax )

};

//===========================================================================
const RemoveItemFromStockBJ = ( itemId, whichUnit ) => {

	RemoveItemFromStock( whichUnit, itemId )

};

//===========================================================================
const RemoveUnitFromStockBJ = ( unitId, whichUnit ) => {

	RemoveUnitFromStock( whichUnit, unitId )

};

//===========================================================================
const SetUnitUseFoodBJ = ( enable, whichUnit ) => {

	SetUnitUseFood( whichUnit, enable )

};

//===========================================================================
const UnitDamagePointLoc = ( whichUnit, delay, radius, loc, amount, whichAttack, whichDamage ) => {

	return UnitDamagePoint( whichUnit, delay, radius, GetLocationX( loc ), GetLocationY( loc ), amount, true, false, whichAttack, whichDamage, WEAPON_TYPE_WHOKNOWS )

};

//===========================================================================
const UnitDamageTargetBJ = ( whichUnit, target, amount, whichAttack, whichDamage ) => {

	return UnitDamageTarget( whichUnit, target, amount, true, false, whichAttack, whichDamage, WEAPON_TYPE_WHOKNOWS )

};

//***************************************************************************
//*
//*  Destructable Utility Functions
//*
//***************************************************************************

//===========================================================================
const CreateDestructableLoc = ( objectid, loc, facing, scale, variation ) => {

	bj_lastCreatedDestructable = CreateDestructable( objectid, GetLocationX( loc ), GetLocationY( loc ), facing, scale, variation );
	return bj_lastCreatedDestructable

};

//===========================================================================
const CreateDeadDestructableLocBJ = ( objectid, loc, facing, scale, variation ) => {

	bj_lastCreatedDestructable = CreateDeadDestructable( objectid, GetLocationX( loc ), GetLocationY( loc ), facing, scale, variation );
	return bj_lastCreatedDestructable

};

//===========================================================================
const GetLastCreatedDestructable = () => {

	return bj_lastCreatedDestructable

};

//===========================================================================
const ShowDestructableBJ = ( flag, d ) => {

	ShowDestructable( d, flag )

};

//===========================================================================
const SetDestructableInvulnerableBJ = ( d, flag ) => {

	SetDestructableInvulnerable( d, flag )

};

//===========================================================================
const IsDestructableInvulnerableBJ = ( d ) => {

	return IsDestructableInvulnerable( d )

};

//===========================================================================
const GetDestructableLoc = ( whichDestructable ) => {

	return Location( GetDestructableX( whichDestructable ), GetDestructableY( whichDestructable ) )

};

//===========================================================================
const EnumDestructablesInRectAll = ( r, actionFunc ) => {

	EnumDestructablesInRect( r, null, actionFunc )

};

//===========================================================================
const EnumDestructablesInCircleBJFilter = () => {

	let destLoc = GetDestructableLoc( GetFilterDestructable() );
	let result;

	result = DistanceBetweenPoints( destLoc, bj_enumDestructableCenter ) <= bj_enumDestructableRadius;
	RemoveLocation( destLoc )
	return result

};

//===========================================================================
const IsDestructableDeadBJ = ( d ) => {

	return GetDestructableLife( d ) <= 0

};

//===========================================================================
const IsDestructableAliveBJ = ( d ) => {

	return ! IsDestructableDeadBJ( d )

};

//===========================================================================
// See GroupPickRandomUnitEnum for the details of this algorithm.
//
const RandomDestructableInRectBJEnum = () => {

	bj_destRandomConsidered = bj_destRandomConsidered + 1;

	if ( ( GetRandomInt( 1, bj_destRandomConsidered ) == 1 ) ) {

		bj_destRandomCurrentPick = GetEnumDestructable();

	}

};

//===========================================================================
// Picks a random destructable from within a rect, matching a condition
//
const RandomDestructableInRectBJ = ( r, filter ) => {

	bj_destRandomConsidered = 0;
	bj_destRandomCurrentPick = null;
	EnumDestructablesInRect( r, filter, RandomDestructableInRectBJEnum )
	DestroyBoolExpr( filter )
	return bj_destRandomCurrentPick

};

//===========================================================================
// Picks a random destructable from within a rect
//
const RandomDestructableInRectSimpleBJ = ( r ) => {

	return RandomDestructableInRectBJ( r, null )

};

//===========================================================================
// Enumerates within a rect, with a filter to narrow the enumeration down
// objects within a circular area.
//
const EnumDestructablesInCircleBJ = ( radius, loc, actionFunc ) => {

	let r;

	if ( ( radius >= 0 ) ) {

		bj_enumDestructableCenter = loc;
		bj_enumDestructableRadius = radius;
		r = GetRectFromCircleBJ( loc, radius );
		EnumDestructablesInRect( r, filterEnumDestructablesInCircleBJ, actionFunc )
		RemoveRect( r )

	}

};

//===========================================================================
const SetDestructableLifePercentBJ = ( d, percent ) => {

	SetDestructableLife( d, GetDestructableMaxLife( d ) * percent * 0.01 )

};

//===========================================================================
const SetDestructableMaxLifeBJ = ( d, max ) => {

	SetDestructableMaxLife( d, max )

};

//===========================================================================
const ModifyGateBJ = ( gateOperation, d ) => {

	if ( ( gateOperation == bj_GATEOPERATION_CLOSE ) ) {

		if ( ( GetDestructableLife( d ) <= 0 ) ) {

			DestructableRestoreLife( d, GetDestructableMaxLife( d ), true )

		}

		SetDestructableAnimation( d, "stand" )

	} else if ( ( gateOperation == bj_GATEOPERATION_OPEN ) ) {

		if ( ( GetDestructableLife( d ) > 0 ) ) {

			KillDestructable( d )

		}

		SetDestructableAnimation( d, "death alternate" )

	} else if ( ( gateOperation == bj_GATEOPERATION_DESTROY ) ) {

		if ( ( GetDestructableLife( d ) > 0 ) ) {

			KillDestructable( d )

		}

		SetDestructableAnimation( d, "death" )

	} else {

		// Unrecognized gate state - ignore the request.

	}

};

//===========================================================================
// Determine the elevator's height from its occlusion height.
//
const GetElevatorHeight = ( d ) => {

	let height;

	height = 1 + R2I( GetDestructableOccluderHeight( d ) / bj_CLIFFHEIGHT );

	if ( ( height < 1 ) || ( height > 3 ) ) {

		height = 1;

	}

	return height

};

//===========================================================================
// To properly animate an elevator, we must know not only what height we
// want to change to, but also what height we are currently at.  This code
// determines the elevator's current height from its occlusion height.
// Arbitrarily changing an elevator's occlusion height is thus inadvisable.
//
const ChangeElevatorHeight = ( d, newHeight ) => {

	let oldHeight;

	// Cap the new height within the supported range.
	newHeight = IMaxBJ( 1, newHeight );
	newHeight = IMinBJ( 3, newHeight );

	// Find out what height the elevator is already at.
	oldHeight = GetElevatorHeight( d );

	// Set the elevator's occlusion height.
	SetDestructableOccluderHeight( d, bj_CLIFFHEIGHT * ( newHeight - 1 ) )

	if ( ( newHeight == 1 ) ) {

		if ( ( oldHeight == 2 ) ) {

			SetDestructableAnimation( d, "birth" )
			QueueDestructableAnimation( d, "stand" )

		} else if ( ( oldHeight == 3 ) ) {

			SetDestructableAnimation( d, "birth third" )
			QueueDestructableAnimation( d, "stand" )

		} else {

			// Unrecognized old height - snap to new height.
			SetDestructableAnimation( d, "stand" )

		}

	} else if ( ( newHeight == 2 ) ) {

		if ( ( oldHeight == 1 ) ) {

			SetDestructableAnimation( d, "death" )
			QueueDestructableAnimation( d, "stand second" )

		} else if ( ( oldHeight == 3 ) ) {

			SetDestructableAnimation( d, "birth second" )
			QueueDestructableAnimation( d, "stand second" )

		} else {

			// Unrecognized old height - snap to new height.
			SetDestructableAnimation( d, "stand second" )

		}

	} else if ( ( newHeight == 3 ) ) {

		if ( ( oldHeight == 1 ) ) {

			SetDestructableAnimation( d, "death third" )
			QueueDestructableAnimation( d, "stand third" )

		} else if ( ( oldHeight == 2 ) ) {

			SetDestructableAnimation( d, "death second" )
			QueueDestructableAnimation( d, "stand third" )

		} else {

			// Unrecognized old height - snap to new height.
			SetDestructableAnimation( d, "stand third" )

		}

	} else {

		// Unrecognized new height - ignore the request.

	}

};

//===========================================================================
// Grab the unit and throw his own coords in his face, forcing him to push
// and shove until he finds a spot where noone will bother him.
//
const NudgeUnitsInRectEnum = () => {

	let nudgee = GetEnumUnit();

	SetUnitPosition( nudgee, GetUnitX( nudgee ), GetUnitY( nudgee ) )

};

//===========================================================================
const NudgeItemsInRectEnum = () => {

	let nudgee = GetEnumItem();

	SetItemPosition( nudgee, GetItemX( nudgee ), GetItemY( nudgee ) )

};

//===========================================================================
// Nudge the items and units within a given rect ever so gently, so as to
// encourage them to find locations where they can peacefully coexist with
// pathing restrictions and live happy, fruitful lives.
//
const NudgeObjectsInRect = ( nudgeArea ) => {

	let g;

	g = CreateGroup();
	GroupEnumUnitsInRect( g, nudgeArea, null )
	ForGroup( g, NudgeUnitsInRectEnum )
	DestroyGroup( g )

	EnumItemsInRect( nudgeArea, null, NudgeItemsInRectEnum )

};

//===========================================================================
const NearbyElevatorExistsEnum = () => {

	let d = GetEnumDestructable();
	let dType = GetDestructableTypeId( d );

	if ( ( dType == bj_ELEVATOR_CODE01 ) || ( dType == bj_ELEVATOR_CODE02 ) ) {

		bj_elevatorNeighbor = d;

	}

};

//===========================================================================
const NearbyElevatorExists = ( x, y ) => {

	let findThreshold = 32;
	let r;

	// If another elevator is overlapping this one, ignore the wall.
	r = Rect( x - findThreshold, y - findThreshold, x + findThreshold, y + findThreshold );
	bj_elevatorNeighbor = null;
	EnumDestructablesInRect( r, null, NearbyElevatorExistsEnum )
	RemoveRect( r )

	return bj_elevatorNeighbor != null

};

//===========================================================================
const FindElevatorWallBlockerEnum = () => {

	bj_elevatorWallBlocker = GetEnumDestructable();

};

//===========================================================================
// This toggles pathing on or off for one wall of an elevator by killing
// or reviving a pathing blocker at the appropriate location (and creating
// the pathing blocker in the first place, if it does not yet exist).
//
const ChangeElevatorWallBlocker = ( x, y, facing, open ) => {

	let blocker;
	let findThreshold = 32;
	let nudgeLength = 4.25 * bj_CELLWIDTH;
	let nudgeWidth = 1.25 * bj_CELLWIDTH;
	let r;

	// Search for the pathing blocker within the general area.
	r = Rect( x - findThreshold, y - findThreshold, x + findThreshold, y + findThreshold );
	bj_elevatorWallBlocker = null;
	EnumDestructablesInRect( r, null, FindElevatorWallBlockerEnum )
	RemoveRect( r )
	blocker = bj_elevatorWallBlocker;

	// Ensure that the blocker exists.

	if ( ( blocker == null ) ) {

		blocker = CreateDeadDestructable( bj_ELEVATOR_BLOCKER_CODE, x, y, facing, 1, 0 );

	} else if ( ( GetDestructableTypeId( blocker ) != bj_ELEVATOR_BLOCKER_CODE ) ) {

		// If a different destructible exists in the blocker's spot, ignore
		// the request.  (Two destructibles cannot occupy the same location
		// on the map, so we cannot create an elevator blocker here.)
		return null

	}

	if ( ( open ) ) {

		// Ensure that the blocker is dead.

		if ( ( GetDestructableLife( blocker ) > 0 ) ) {

			KillDestructable( blocker )

		}

	} else {

		// Ensure that the blocker is alive.

		if ( ( GetDestructableLife( blocker ) <= 0 ) ) {

			DestructableRestoreLife( blocker, GetDestructableMaxLife( blocker ), false )

		}

		// Nudge any objects standing in the blocker's way.

		if ( ( facing == 0 ) ) {

			r = Rect( x - nudgeWidth / 2, y - nudgeLength / 2, x + nudgeWidth / 2, y + nudgeLength / 2 );
			NudgeObjectsInRect( r )
			RemoveRect( r )

		} else if ( ( facing == 90 ) ) {

			r = Rect( x - nudgeLength / 2, y - nudgeWidth / 2, x + nudgeLength / 2, y + nudgeWidth / 2 );
			NudgeObjectsInRect( r )
			RemoveRect( r )

		} else {

			// Unrecognized blocker angle - don't nudge anything.

		}

	}

};

//===========================================================================
const ChangeElevatorWalls = ( open, walls, d ) => {

	let x = GetDestructableX( d );
	let y = GetDestructableY( d );
	let distToBlocker = 192;
	let distToNeighbor = 256;

	if ( ( walls == bj_ELEVATOR_WALL_TYPE_ALL ) || ( walls == bj_ELEVATOR_WALL_TYPE_EAST ) ) {

		if ( ( ! NearbyElevatorExists( x + distToNeighbor, y ) ) ) {

			ChangeElevatorWallBlocker( x + distToBlocker, y, 0, open )

		}

	}

	if ( ( walls == bj_ELEVATOR_WALL_TYPE_ALL ) || ( walls == bj_ELEVATOR_WALL_TYPE_NORTH ) ) {

		if ( ( ! NearbyElevatorExists( x, y + distToNeighbor ) ) ) {

			ChangeElevatorWallBlocker( x, y + distToBlocker, 90, open )

		}

	}

	if ( ( walls == bj_ELEVATOR_WALL_TYPE_ALL ) || ( walls == bj_ELEVATOR_WALL_TYPE_SOUTH ) ) {

		if ( ( ! NearbyElevatorExists( x, y - distToNeighbor ) ) ) {

			ChangeElevatorWallBlocker( x, y - distToBlocker, 90, open )

		}

	}

	if ( ( walls == bj_ELEVATOR_WALL_TYPE_ALL ) || ( walls == bj_ELEVATOR_WALL_TYPE_WEST ) ) {

		if ( ( ! NearbyElevatorExists( x - distToNeighbor, y ) ) ) {

			ChangeElevatorWallBlocker( x - distToBlocker, y, 0, open )

		}

	}

};

//***************************************************************************
//*
//*  Neutral Building Utility Functions
//*
//***************************************************************************

//===========================================================================
const WaygateActivateBJ = ( activate, waygate ) => {

	WaygateActivate( waygate, activate )

};

//===========================================================================
const WaygateIsActiveBJ = ( waygate ) => {

	return WaygateIsActive( waygate )

};

//===========================================================================
const WaygateSetDestinationLocBJ = ( waygate, loc ) => {

	WaygateSetDestination( waygate, GetLocationX( loc ), GetLocationY( loc ) )

};

//===========================================================================
const WaygateGetDestinationLocBJ = ( waygate ) => {

	return Location( WaygateGetDestinationX( waygate ), WaygateGetDestinationY( waygate ) )

};

//===========================================================================
const UnitSetUsesAltIconBJ = ( flag, whichUnit ) => {

	UnitSetUsesAltIcon( whichUnit, flag )

};

//***************************************************************************
//*
//*  UI Utility Functions
//*
//***************************************************************************

//===========================================================================
const ForceUIKeyBJ = ( whichPlayer, key ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		ForceUIKey( key )

	}

};

//===========================================================================
const ForceUICancelBJ = ( whichPlayer ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		ForceUICancel()

	}

};

//***************************************************************************
//*
//*  Group and Force Utility Functions
//*
//***************************************************************************

//===========================================================================
const ForGroupBJ = ( whichGroup, callback ) => {

	// If the user wants the group destroyed, remember that fact and clear
	// the flag, in case it is used again in the callback.
	let wantDestroy = bj_wantDestroyGroup;
	bj_wantDestroyGroup = false;

	ForGroup( whichGroup, callback )

	// If the user wants the group destroyed, do so now.

	if ( ( wantDestroy ) ) {

		DestroyGroup( whichGroup )

	}

};

//===========================================================================
const GroupAddUnitSimple = ( whichUnit, whichGroup ) => {

	GroupAddUnit( whichGroup, whichUnit )

};

//===========================================================================
const GroupRemoveUnitSimple = ( whichUnit, whichGroup ) => {

	GroupRemoveUnit( whichGroup, whichUnit )

};

//===========================================================================
const GroupAddGroupEnum = () => {

	GroupAddUnit( bj_groupAddGroupDest, GetEnumUnit() )

};

//===========================================================================
const GroupAddGroup = ( sourceGroup, destGroup ) => {

	// If the user wants the group destroyed, remember that fact and clear
	// the flag, in case it is used again in the callback.
	let wantDestroy = bj_wantDestroyGroup;
	bj_wantDestroyGroup = false;

	bj_groupAddGroupDest = destGroup;
	ForGroup( sourceGroup, GroupAddGroupEnum )

	// If the user wants the group destroyed, do so now.

	if ( ( wantDestroy ) ) {

		DestroyGroup( sourceGroup )

	}

};

//===========================================================================
const GroupRemoveGroupEnum = () => {

	GroupRemoveUnit( bj_groupRemoveGroupDest, GetEnumUnit() )

};

//===========================================================================
const GroupRemoveGroup = ( sourceGroup, destGroup ) => {

	// If the user wants the group destroyed, remember that fact and clear
	// the flag, in case it is used again in the callback.
	let wantDestroy = bj_wantDestroyGroup;
	bj_wantDestroyGroup = false;

	bj_groupRemoveGroupDest = destGroup;
	ForGroup( sourceGroup, GroupRemoveGroupEnum )

	// If the user wants the group destroyed, do so now.

	if ( ( wantDestroy ) ) {

		DestroyGroup( sourceGroup )

	}

};

//===========================================================================
const ForceAddPlayerSimple = ( whichPlayer, whichForce ) => {

	ForceAddPlayer( whichForce, whichPlayer )

};

//===========================================================================
const ForceRemovePlayerSimple = ( whichPlayer, whichForce ) => {

	ForceRemovePlayer( whichForce, whichPlayer )

};

//===========================================================================
// Consider each unit, one at a time, keeping a "current pick".   Once all units
// are considered, this "current pick" will be the resulting random unit.
//
// The chance of picking a given unit over the "current pick" is 1/N, where N is
// the number of units considered thusfar (including the current consideration).
//
const GroupPickRandomUnitEnum = () => {

	bj_groupRandomConsidered = bj_groupRandomConsidered + 1;

	if ( ( GetRandomInt( 1, bj_groupRandomConsidered ) == 1 ) ) {

		bj_groupRandomCurrentPick = GetEnumUnit();

	}

};

//===========================================================================
// Picks a random unit from a group.
//
const GroupPickRandomUnit = ( whichGroup ) => {

	// If the user wants the group destroyed, remember that fact and clear
	// the flag, in case it is used again in the callback.
	let wantDestroy = bj_wantDestroyGroup;
	bj_wantDestroyGroup = false;

	bj_groupRandomConsidered = 0;
	bj_groupRandomCurrentPick = null;
	ForGroup( whichGroup, GroupPickRandomUnitEnum )

	// If the user wants the group destroyed, do so now.

	if ( ( wantDestroy ) ) {

		DestroyGroup( whichGroup )

	}

	return bj_groupRandomCurrentPick

};

//===========================================================================
// See GroupPickRandomUnitEnum for the details of this algorithm.
//
const ForcePickRandomPlayerEnum = () => {

	bj_forceRandomConsidered = bj_forceRandomConsidered + 1;

	if ( ( GetRandomInt( 1, bj_forceRandomConsidered ) == 1 ) ) {

		bj_forceRandomCurrentPick = GetEnumPlayer();

	}

};

//===========================================================================
// Picks a random player from a force.
//
const ForcePickRandomPlayer = ( whichForce ) => {

	bj_forceRandomConsidered = 0;
	bj_forceRandomCurrentPick = null;
	ForForce( whichForce, ForcePickRandomPlayerEnum )
	return bj_forceRandomCurrentPick

};

//===========================================================================
const EnumUnitsSelected = ( whichPlayer, enumFilter, enumAction ) => {

	let g = CreateGroup();
	SyncSelections()
	GroupEnumUnitsSelected( g, whichPlayer, enumFilter )
	DestroyBoolExpr( enumFilter )
	ForGroup( g, enumAction )
	DestroyGroup( g )

};

//===========================================================================
const GetUnitsInRectMatching = ( r, filter ) => {

	let g = CreateGroup();
	GroupEnumUnitsInRect( g, r, filter )
	DestroyBoolExpr( filter )
	return g

};

//===========================================================================
const GetUnitsInRectAll = ( r ) => {

	return GetUnitsInRectMatching( r, null )

};

//===========================================================================
const GetUnitsInRectOfPlayerFilter = () => {

	return GetOwningPlayer( GetFilterUnit() ) == bj_groupEnumOwningPlayer

};

//===========================================================================
const GetUnitsInRectOfPlayer = ( r, whichPlayer ) => {

	let g = CreateGroup();
	bj_groupEnumOwningPlayer = whichPlayer;
	GroupEnumUnitsInRect( g, r, filterGetUnitsInRectOfPlayer )
	return g

};

//===========================================================================
const GetUnitsInRangeOfLocMatching = ( radius, whichLocation, filter ) => {

	let g = CreateGroup();
	GroupEnumUnitsInRangeOfLoc( g, whichLocation, radius, filter )
	DestroyBoolExpr( filter )
	return g

};

//===========================================================================
const GetUnitsInRangeOfLocAll = ( radius, whichLocation ) => {

	return GetUnitsInRangeOfLocMatching( radius, whichLocation, null )

};

//===========================================================================
const GetUnitsOfTypeIdAllFilter = () => {

	return GetUnitTypeId( GetFilterUnit() ) == bj_groupEnumTypeId

};

//===========================================================================
const GetUnitsOfTypeIdAll = ( unitid ) => {

	let result = CreateGroup();
	let g = CreateGroup();
	let index;

	index = 0;

	while ( true ) {

		bj_groupEnumTypeId = unitid;
		GroupClear( g )
		GroupEnumUnitsOfPlayer( g, Player( index ), filterGetUnitsOfTypeIdAll )
		GroupAddGroup( g, result )

		index = index + 1;
		if ( index == bj_MAX_PLAYER_SLOTS ) break;

	}

	DestroyGroup( g )

	return result

};

//===========================================================================
const GetUnitsOfPlayerMatching = ( whichPlayer, filter ) => {

	let g = CreateGroup();
	GroupEnumUnitsOfPlayer( g, whichPlayer, filter )
	DestroyBoolExpr( filter )
	return g

};

//===========================================================================
const GetUnitsOfPlayerAll = ( whichPlayer ) => {

	return GetUnitsOfPlayerMatching( whichPlayer, null )

};

//===========================================================================
const GetUnitsOfPlayerAndTypeIdFilter = () => {

	return GetUnitTypeId( GetFilterUnit() ) == bj_groupEnumTypeId

};

//===========================================================================
const GetUnitsOfPlayerAndTypeId = ( whichPlayer, unitid ) => {

	let g = CreateGroup();
	bj_groupEnumTypeId = unitid;
	GroupEnumUnitsOfPlayer( g, whichPlayer, filterGetUnitsOfPlayerAndTypeId )
	return g

};

//===========================================================================
const GetUnitsSelectedAll = ( whichPlayer ) => {

	let g = CreateGroup();
	SyncSelections()
	GroupEnumUnitsSelected( g, whichPlayer, null )
	return g

};

//===========================================================================
const GetForceOfPlayer = ( whichPlayer ) => {

	let f = CreateForce();
	ForceAddPlayer( f, whichPlayer )
	return f

};

//===========================================================================
const GetPlayersAll = () => {

	return bj_FORCE_ALL_PLAYERS

};

//===========================================================================
const GetPlayersByMapControl = ( whichControl ) => {

	let f = CreateForce();
	let playerIndex;
	let indexPlayer;

	playerIndex = 0;

	while ( true ) {

		indexPlayer = Player( playerIndex );

		if ( GetPlayerController( indexPlayer ) == whichControl ) {

			ForceAddPlayer( f, indexPlayer )

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYER_SLOTS ) break;

	}

	return f

};

//===========================================================================
const GetPlayersAllies = ( whichPlayer ) => {

	let f = CreateForce();
	ForceEnumAllies( f, whichPlayer, null )
	return f

};

//===========================================================================
const GetPlayersEnemies = ( whichPlayer ) => {

	let f = CreateForce();
	ForceEnumEnemies( f, whichPlayer, null )
	return f

};

//===========================================================================
const GetPlayersMatching = ( filter ) => {

	let f = CreateForce();
	ForceEnumPlayers( f, filter )
	DestroyBoolExpr( filter )
	return f

};

//===========================================================================
const CountUnitsInGroupEnum = () => {

	bj_groupCountUnits = bj_groupCountUnits + 1;

};

//===========================================================================
const CountUnitsInGroup = ( g ) => {

	// If the user wants the group destroyed, remember that fact and clear
	// the flag, in case it is used again in the callback.
	let wantDestroy = bj_wantDestroyGroup;
	bj_wantDestroyGroup = false;

	bj_groupCountUnits = 0;
	ForGroup( g, CountUnitsInGroupEnum )

	// If the user wants the group destroyed, do so now.

	if ( ( wantDestroy ) ) {

		DestroyGroup( g )

	}

	return bj_groupCountUnits

};

//===========================================================================
const CountPlayersInForceEnum = () => {

	bj_forceCountPlayers = bj_forceCountPlayers + 1;

};

//===========================================================================
const CountPlayersInForceBJ = ( f ) => {

	bj_forceCountPlayers = 0;
	ForForce( f, CountPlayersInForceEnum )
	return bj_forceCountPlayers

};

//===========================================================================
const GetRandomSubGroupEnum = () => {

	if ( ( bj_randomSubGroupWant > 0 ) ) {

		if ( ( bj_randomSubGroupWant >= bj_randomSubGroupTotal ) || ( GetRandomReal( 0, 1 ) < bj_randomSubGroupChance ) ) {

			// We either need every remaining unit, or the unit passed its chance check.
			GroupAddUnit( bj_randomSubGroupGroup, GetEnumUnit() )
			bj_randomSubGroupWant = bj_randomSubGroupWant - 1;

		}

	}

	bj_randomSubGroupTotal = bj_randomSubGroupTotal - 1;

};

//===========================================================================
const GetRandomSubGroup = ( count, sourceGroup ) => {

	let g = CreateGroup();

	bj_randomSubGroupGroup = g;
	bj_randomSubGroupWant = count;
	bj_randomSubGroupTotal = CountUnitsInGroup( sourceGroup );

	if ( ( bj_randomSubGroupWant <= 0 || bj_randomSubGroupTotal <= 0 ) ) {

		return g

	}

	bj_randomSubGroupChance = I2R( bj_randomSubGroupWant ) / I2R( bj_randomSubGroupTotal );
	ForGroup( sourceGroup, GetRandomSubGroupEnum )
	return g

};

//===========================================================================
const LivingPlayerUnitsOfTypeIdFilter = () => {

	let filterUnit = GetFilterUnit();
	return IsUnitAliveBJ( filterUnit ) && GetUnitTypeId( filterUnit ) == bj_livingPlayerUnitsTypeId

};

//===========================================================================
const CountLivingPlayerUnitsOfTypeId = ( unitId, whichPlayer ) => {

	let g;
	let matchedCount;

	g = CreateGroup();
	bj_livingPlayerUnitsTypeId = unitId;
	GroupEnumUnitsOfPlayer( g, whichPlayer, filterLivingPlayerUnitsOfTypeId )
	matchedCount = CountUnitsInGroup( g );
	DestroyGroup( g )

	return matchedCount

};

//***************************************************************************
//*
//*  Animation Utility Functions
//*
//***************************************************************************

//===========================================================================
const ResetUnitAnimation = ( whichUnit ) => {

	SetUnitAnimation( whichUnit, "stand" )

};

//===========================================================================
const SetUnitTimeScalePercent = ( whichUnit, percentScale ) => {

	SetUnitTimeScale( whichUnit, percentScale * 0.01 )

};

//===========================================================================
const SetUnitScalePercent = ( whichUnit, percentScaleX, percentScaleY, percentScaleZ ) => {

	SetUnitScale( whichUnit, percentScaleX * 0.01, percentScaleY * 0.01, percentScaleZ * 0.01 )

};

//===========================================================================
// This version differs from the common.j interface in that the alpha value
// is reversed so as to be displayed as transparency, and all four parameters
// are treated as percentages rather than bytes.
//
const SetUnitVertexColorBJ = ( whichUnit, red, green, blue, transparency ) => {

	SetUnitVertexColor( whichUnit, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
const UnitAddIndicatorBJ = ( whichUnit, red, green, blue, transparency ) => {

	AddIndicator( whichUnit, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
const DestructableAddIndicatorBJ = ( whichDestructable, red, green, blue, transparency ) => {

	AddIndicator( whichDestructable, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
const ItemAddIndicatorBJ = ( whichItem, red, green, blue, transparency ) => {

	AddIndicator( whichItem, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
// Sets a unit's facing to point directly at a location.
//
const SetUnitFacingToFaceLocTimed = ( whichUnit, target, duration ) => {

	let unitLoc = GetUnitLoc( whichUnit );

	SetUnitFacingTimed( whichUnit, AngleBetweenPoints( unitLoc, target ), duration )
	RemoveLocation( unitLoc )

};

//===========================================================================
// Sets a unit's facing to point directly at another unit.
//
const SetUnitFacingToFaceUnitTimed = ( whichUnit, target, duration ) => {

	let unitLoc = GetUnitLoc( target );

	SetUnitFacingToFaceLocTimed( whichUnit, unitLoc, duration )
	RemoveLocation( unitLoc )

};

//===========================================================================
const QueueUnitAnimationBJ = ( whichUnit, whichAnimation ) => {

	QueueUnitAnimation( whichUnit, whichAnimation )

};

//===========================================================================
const SetDestructableAnimationBJ = ( d, whichAnimation ) => {

	SetDestructableAnimation( d, whichAnimation )

};

//===========================================================================
const QueueDestructableAnimationBJ = ( d, whichAnimation ) => {

	QueueDestructableAnimation( d, whichAnimation )

};

//===========================================================================
const SetDestAnimationSpeedPercent = ( d, percentScale ) => {

	SetDestructableAnimationSpeed( d, percentScale * 0.01 )

};

//***************************************************************************
//*
//*  Dialog Utility Functions
//*
//***************************************************************************

//===========================================================================
const DialogDisplayBJ = ( flag, whichDialog, whichPlayer ) => {

	DialogDisplay( whichPlayer, whichDialog, flag )

};

//===========================================================================
const DialogSetMessageBJ = ( whichDialog, message ) => {

	DialogSetMessage( whichDialog, message )

};

//===========================================================================
const DialogAddButtonBJ = ( whichDialog, buttonText ) => {

	bj_lastCreatedButton = DialogAddButton( whichDialog, buttonText, 0 );
	return bj_lastCreatedButton

};

//===========================================================================
const DialogAddButtonWithHotkeyBJ = ( whichDialog, buttonText, hotkey ) => {

	bj_lastCreatedButton = DialogAddButton( whichDialog, buttonText, hotkey );
	return bj_lastCreatedButton

};

//===========================================================================
const DialogClearBJ = ( whichDialog ) => {

	DialogClear( whichDialog )

};

//===========================================================================
const GetLastCreatedButtonBJ = () => {

	return bj_lastCreatedButton

};

//===========================================================================
const GetClickedButtonBJ = () => {

	return GetClickedButton()

};

//===========================================================================
const GetClickedDialogBJ = () => {

	return GetClickedDialog()

};

//***************************************************************************
//*
//*  Alliance Utility Functions
//*
//***************************************************************************

//===========================================================================
const SetPlayerAllianceBJ = ( sourcePlayer, whichAllianceSetting, value, otherPlayer ) => {

	// Prevent players from attempting to ally with themselves.

	if ( ( sourcePlayer == otherPlayer ) ) {

		return null

	}

	SetPlayerAlliance( sourcePlayer, otherPlayer, whichAllianceSetting, value )

};

//===========================================================================
// Set all flags used by the in-game "Ally" checkbox.
//
const SetPlayerAllianceStateAllyBJ = ( sourcePlayer, otherPlayer, flag ) => {

	SetPlayerAlliance( sourcePlayer, otherPlayer, ALLIANCE_PASSIVE, flag )
	SetPlayerAlliance( sourcePlayer, otherPlayer, ALLIANCE_HELP_REQUEST, flag )
	SetPlayerAlliance( sourcePlayer, otherPlayer, ALLIANCE_HELP_RESPONSE, flag )
	SetPlayerAlliance( sourcePlayer, otherPlayer, ALLIANCE_SHARED_XP, flag )
	SetPlayerAlliance( sourcePlayer, otherPlayer, ALLIANCE_SHARED_SPELLS, flag )

};

//===========================================================================
// Set all flags used by the in-game "Shared Vision" checkbox.
//
const SetPlayerAllianceStateVisionBJ = ( sourcePlayer, otherPlayer, flag ) => {

	SetPlayerAlliance( sourcePlayer, otherPlayer, ALLIANCE_SHARED_VISION, flag )

};

//===========================================================================
// Set all flags used by the in-game "Shared Units" checkbox.
//
const SetPlayerAllianceStateControlBJ = ( sourcePlayer, otherPlayer, flag ) => {

	SetPlayerAlliance( sourcePlayer, otherPlayer, ALLIANCE_SHARED_CONTROL, flag )

};

//===========================================================================
// Set all flags used by the in-game "Shared Units" checkbox with the Full
// Shared Unit Control feature enabled.
//
const SetPlayerAllianceStateFullControlBJ = ( sourcePlayer, otherPlayer, flag ) => {

	SetPlayerAlliance( sourcePlayer, otherPlayer, ALLIANCE_SHARED_ADVANCED_CONTROL, flag )

};

//===========================================================================
const SetPlayerAllianceStateBJ = ( sourcePlayer, otherPlayer, allianceState ) => {

	// Prevent players from attempting to ally with themselves.

	if ( ( sourcePlayer == otherPlayer ) ) {

		return null

	}

	if ( allianceState == bj_ALLIANCE_UNALLIED ) {

		SetPlayerAllianceStateAllyBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateVisionBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateControlBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateFullControlBJ( sourcePlayer, otherPlayer, false )

	} else if ( allianceState == bj_ALLIANCE_UNALLIED_VISION ) {

		SetPlayerAllianceStateAllyBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateVisionBJ( sourcePlayer, otherPlayer, true )
		SetPlayerAllianceStateControlBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateFullControlBJ( sourcePlayer, otherPlayer, false )

	} else if ( allianceState == bj_ALLIANCE_ALLIED ) {

		SetPlayerAllianceStateAllyBJ( sourcePlayer, otherPlayer, true )
		SetPlayerAllianceStateVisionBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateControlBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateFullControlBJ( sourcePlayer, otherPlayer, false )

	} else if ( allianceState == bj_ALLIANCE_ALLIED_VISION ) {

		SetPlayerAllianceStateAllyBJ( sourcePlayer, otherPlayer, true )
		SetPlayerAllianceStateVisionBJ( sourcePlayer, otherPlayer, true )
		SetPlayerAllianceStateControlBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateFullControlBJ( sourcePlayer, otherPlayer, false )

	} else if ( allianceState == bj_ALLIANCE_ALLIED_UNITS ) {

		SetPlayerAllianceStateAllyBJ( sourcePlayer, otherPlayer, true )
		SetPlayerAllianceStateVisionBJ( sourcePlayer, otherPlayer, true )
		SetPlayerAllianceStateControlBJ( sourcePlayer, otherPlayer, true )
		SetPlayerAllianceStateFullControlBJ( sourcePlayer, otherPlayer, false )

	} else if ( allianceState == bj_ALLIANCE_ALLIED_ADVUNITS ) {

		SetPlayerAllianceStateAllyBJ( sourcePlayer, otherPlayer, true )
		SetPlayerAllianceStateVisionBJ( sourcePlayer, otherPlayer, true )
		SetPlayerAllianceStateControlBJ( sourcePlayer, otherPlayer, true )
		SetPlayerAllianceStateFullControlBJ( sourcePlayer, otherPlayer, true )

	} else if ( allianceState == bj_ALLIANCE_NEUTRAL ) {

		SetPlayerAllianceStateAllyBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateVisionBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateControlBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateFullControlBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAlliance( sourcePlayer, otherPlayer, ALLIANCE_PASSIVE, true )

	} else if ( allianceState == bj_ALLIANCE_NEUTRAL_VISION ) {

		SetPlayerAllianceStateAllyBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateVisionBJ( sourcePlayer, otherPlayer, true )
		SetPlayerAllianceStateControlBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAllianceStateFullControlBJ( sourcePlayer, otherPlayer, false )
		SetPlayerAlliance( sourcePlayer, otherPlayer, ALLIANCE_PASSIVE, true )

	} else {

		// Unrecognized alliance state - ignore the request.

	}

};

//===========================================================================
// Set the alliance states for an entire force towards another force.
//
const SetForceAllianceStateBJ = ( sourceForce, targetForce, allianceState ) => {

	let sourceIndex;
	let targetIndex;

	sourceIndex = 0;

	while ( true ) {

		if ( ( sourceForce == bj_FORCE_ALL_PLAYERS || IsPlayerInForce( Player( sourceIndex ), sourceForce ) ) ) {

			targetIndex = 0;

			while ( true ) {

				if ( ( targetForce == bj_FORCE_ALL_PLAYERS || IsPlayerInForce( Player( targetIndex ), targetForce ) ) ) {

					SetPlayerAllianceStateBJ( Player( sourceIndex ), Player( targetIndex ), allianceState )

				}

				targetIndex = targetIndex + 1;
				if ( targetIndex == bj_MAX_PLAYER_SLOTS ) break;

			}

		}

		sourceIndex = sourceIndex + 1;
		if ( sourceIndex == bj_MAX_PLAYER_SLOTS ) break;

	}

};

//===========================================================================
// Test to see if two players are co-allied (allied with each other).
//
const PlayersAreCoAllied = ( playerA, playerB ) => {

	// Players are considered to be allied with themselves.

	if ( ( playerA == playerB ) ) {

		return true

	}

	// Co-allies are both allied with each other.

	if ( GetPlayerAlliance( playerA, playerB, ALLIANCE_PASSIVE ) ) {

		if ( GetPlayerAlliance( playerB, playerA, ALLIANCE_PASSIVE ) ) {

			return true

		}

	}

	return false

};

//===========================================================================
// Force (whichPlayer) AI player to share vision and advanced unit control 
// with all AI players of its allies.
//
const ShareEverythingWithTeamAI = ( whichPlayer ) => {

	let playerIndex;
	let indexPlayer;

	playerIndex = 0;

	while ( true ) {

		indexPlayer = Player( playerIndex );

		if ( ( PlayersAreCoAllied( whichPlayer, indexPlayer ) && whichPlayer != indexPlayer ) ) {

			if ( ( GetPlayerController( indexPlayer ) == MAP_CONTROL_COMPUTER ) ) {

				SetPlayerAlliance( whichPlayer, indexPlayer, ALLIANCE_SHARED_VISION, true )
				SetPlayerAlliance( whichPlayer, indexPlayer, ALLIANCE_SHARED_CONTROL, true )
				SetPlayerAlliance( whichPlayer, indexPlayer, ALLIANCE_SHARED_ADVANCED_CONTROL, true )

			}

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

};

//===========================================================================
// Force (whichPlayer) to share vision and advanced unit control with all of his/her allies.
//
const ShareEverythingWithTeam = ( whichPlayer ) => {

	let playerIndex;
	let indexPlayer;

	playerIndex = 0;

	while ( true ) {

		indexPlayer = Player( playerIndex );

		if ( ( PlayersAreCoAllied( whichPlayer, indexPlayer ) && whichPlayer != indexPlayer ) ) {

			SetPlayerAlliance( whichPlayer, indexPlayer, ALLIANCE_SHARED_VISION, true )
			SetPlayerAlliance( whichPlayer, indexPlayer, ALLIANCE_SHARED_CONTROL, true )
			SetPlayerAlliance( indexPlayer, whichPlayer, ALLIANCE_SHARED_CONTROL, true )
			SetPlayerAlliance( whichPlayer, indexPlayer, ALLIANCE_SHARED_ADVANCED_CONTROL, true )

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

};

//===========================================================================
// Creates a 'Neutral Victim' player slot.  This slot is passive towards all
// other players, but all other players are aggressive towards him/her.
// 
const ConfigureNeutralVictim = () => {

	let index;
	let indexPlayer;
	let neutralVictim = Player( bj_PLAYER_NEUTRAL_VICTIM );

	index = 0;

	while ( true ) {

		indexPlayer = Player( index );

		SetPlayerAlliance( neutralVictim, indexPlayer, ALLIANCE_PASSIVE, true )
		SetPlayerAlliance( indexPlayer, neutralVictim, ALLIANCE_PASSIVE, false )

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

	// Neutral Victim and Neutral Aggressive should not fight each other.
	indexPlayer = Player( PLAYER_NEUTRAL_AGGRESSIVE );
	SetPlayerAlliance( neutralVictim, indexPlayer, ALLIANCE_PASSIVE, true )
	SetPlayerAlliance( indexPlayer, neutralVictim, ALLIANCE_PASSIVE, true )

	// Neutral Victim does not give bounties.
	SetPlayerState( neutralVictim, PLAYER_STATE_GIVES_BOUNTY, 0 )

};

//===========================================================================
const MakeUnitsPassiveForPlayerEnum = () => {

	SetUnitOwner( GetEnumUnit(), Player( bj_PLAYER_NEUTRAL_VICTIM ), false )

};

//===========================================================================
// Change ownership for every unit of (whichPlayer)'s team to neutral passive.
//
const MakeUnitsPassiveForPlayer = ( whichPlayer ) => {

	let playerUnits = CreateGroup();
	CachePlayerHeroData( whichPlayer )
	GroupEnumUnitsOfPlayer( playerUnits, whichPlayer, null )
	ForGroup( playerUnits, MakeUnitsPassiveForPlayerEnum )
	DestroyGroup( playerUnits )

};

//===========================================================================
// Change ownership for every unit of (whichPlayer)'s team to neutral passive.
//
const MakeUnitsPassiveForTeam = ( whichPlayer ) => {

	let playerIndex;
	let indexPlayer;

	playerIndex = 0;

	while ( true ) {

		indexPlayer = Player( playerIndex );

		if ( PlayersAreCoAllied( whichPlayer, indexPlayer ) ) {

			MakeUnitsPassiveForPlayer( indexPlayer )

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

};

//===========================================================================
// Determine whether or not victory/defeat is disabled via cheat codes.
//
const AllowVictoryDefeat = ( gameResult ) => {

	if ( ( gameResult == PLAYER_GAME_RESULT_VICTORY ) ) {

		return ! IsNoVictoryCheat()

	}

	if ( ( gameResult == PLAYER_GAME_RESULT_DEFEAT ) ) {

		return ! IsNoDefeatCheat()

	}

	if ( ( gameResult == PLAYER_GAME_RESULT_NEUTRAL ) ) {

		return ( ! IsNoVictoryCheat() ) && ( ! IsNoDefeatCheat() )

	}

	return true

};

//===========================================================================
const EndGameBJ = () => {

	EndGame( true )

};

//===========================================================================
const MeleeVictoryDialogBJ = ( whichPlayer, leftGame ) => {

	let t = CreateTrigger();
	let d = DialogCreate();
	let formatString;

	// Display "player was victorious" or "player has left the game" message

	if ( ( leftGame ) ) {

		formatString = GetLocalizedString( "PLAYER_LEFT_GAME" );

	} else {

		formatString = GetLocalizedString( "PLAYER_VICTORIOUS" );

	}

	DisplayTimedTextFromPlayer( whichPlayer, 0, 0, 60, formatString )

	DialogSetMessage( d, GetLocalizedString( "GAMEOVER_VICTORY_MSG" ) )
	DialogAddButton( d, GetLocalizedString( "GAMEOVER_CONTINUE_GAME" ), GetLocalizedHotkey( "GAMEOVER_CONTINUE_GAME" ) )

	t = CreateTrigger();
	TriggerRegisterDialogButtonEvent( t, DialogAddQuitButton( d, true, GetLocalizedString( "GAMEOVER_QUIT_GAME" ), GetLocalizedHotkey( "GAMEOVER_QUIT_GAME" ) ) )

	DialogDisplay( whichPlayer, d, true )
	StartSoundForPlayerBJ( whichPlayer, bj_victoryDialogSound )

};

//===========================================================================
const MeleeDefeatDialogBJ = ( whichPlayer, leftGame ) => {

	let t = CreateTrigger();
	let d = DialogCreate();
	let formatString;

	// Display "player was defeated" or "player has left the game" message

	if ( ( leftGame ) ) {

		formatString = GetLocalizedString( "PLAYER_LEFT_GAME" );

	} else {

		formatString = GetLocalizedString( "PLAYER_DEFEATED" );

	}

	DisplayTimedTextFromPlayer( whichPlayer, 0, 0, 60, formatString )

	DialogSetMessage( d, GetLocalizedString( "GAMEOVER_DEFEAT_MSG" ) )

	// Only show the continue button if the game is not over and observers on death are allowed

	if ( ( ! bj_meleeGameOver && IsMapFlagSet( MAP_OBSERVERS_ON_DEATH ) ) ) {

		DialogAddButton( d, GetLocalizedString( "GAMEOVER_CONTINUE_OBSERVING" ), GetLocalizedHotkey( "GAMEOVER_CONTINUE_OBSERVING" ) )

	}

	t = CreateTrigger();
	TriggerRegisterDialogButtonEvent( t, DialogAddQuitButton( d, true, GetLocalizedString( "GAMEOVER_QUIT_GAME" ), GetLocalizedHotkey( "GAMEOVER_QUIT_GAME" ) ) )

	DialogDisplay( whichPlayer, d, true )
	StartSoundForPlayerBJ( whichPlayer, bj_defeatDialogSound )

};

//===========================================================================
const GameOverDialogBJ = ( whichPlayer, leftGame ) => {

	let t = CreateTrigger();
	let d = DialogCreate();
	let s;

	// Display "player left the game" message
	DisplayTimedTextFromPlayer( whichPlayer, 0, 0, 60, GetLocalizedString( "PLAYER_LEFT_GAME" ) )

	if ( ( GetIntegerGameState( GAME_STATE_DISCONNECTED ) != 0 ) ) {

		s = GetLocalizedString( "GAMEOVER_DISCONNECTED" );

	} else {

		s = GetLocalizedString( "GAMEOVER_GAME_OVER" );

	}

	DialogSetMessage( d, s )

	t = CreateTrigger();
	TriggerRegisterDialogButtonEvent( t, DialogAddQuitButton( d, true, GetLocalizedString( "GAMEOVER_OK" ), GetLocalizedHotkey( "GAMEOVER_OK" ) ) )

	DialogDisplay( whichPlayer, d, true )
	StartSoundForPlayerBJ( whichPlayer, bj_defeatDialogSound )

};

//===========================================================================
const RemovePlayerPreserveUnitsBJ = ( whichPlayer, gameResult, leftGame ) => {

	if ( AllowVictoryDefeat( gameResult ) ) {

		RemovePlayer( whichPlayer, gameResult )

		if ( ( gameResult == PLAYER_GAME_RESULT_VICTORY ) ) {

			MeleeVictoryDialogBJ( whichPlayer, leftGame )
			return null

		} else if ( ( gameResult == PLAYER_GAME_RESULT_DEFEAT ) ) {

			MeleeDefeatDialogBJ( whichPlayer, leftGame )

		} else {

			GameOverDialogBJ( whichPlayer, leftGame )

		}

	}

};

//===========================================================================
const CustomVictoryOkBJ = () => {

	if ( bj_isSinglePlayer ) {

		PauseGame( false )
		// Bump the difficulty back up to the default.
		SetGameDifficulty( GetDefaultDifficulty() )

	}

	if ( ( bj_changeLevelMapName == null ) ) {

		EndGame( bj_changeLevelShowScores )

	} else {

		ChangeLevel( bj_changeLevelMapName, bj_changeLevelShowScores )

	}

};

//===========================================================================
const CustomVictoryQuitBJ = () => {

	if ( bj_isSinglePlayer ) {

		PauseGame( false )
		// Bump the difficulty back up to the default.
		SetGameDifficulty( GetDefaultDifficulty() )

	}

	EndGame( bj_changeLevelShowScores )

};

//===========================================================================
const CustomVictoryDialogBJ = ( whichPlayer ) => {

	let t = CreateTrigger();
	let d = DialogCreate();

	DialogSetMessage( d, GetLocalizedString( "GAMEOVER_VICTORY_MSG" ) )

	t = CreateTrigger();
	TriggerRegisterDialogButtonEvent( t, DialogAddButton( d, GetLocalizedString( "GAMEOVER_CONTINUE" ), GetLocalizedHotkey( "GAMEOVER_CONTINUE" ) ) )
	TriggerAddAction( t, CustomVictoryOkBJ )

	t = CreateTrigger();
	TriggerRegisterDialogButtonEvent( t, DialogAddButton( d, GetLocalizedString( "GAMEOVER_QUIT_MISSION" ), GetLocalizedHotkey( "GAMEOVER_QUIT_MISSION" ) ) )
	TriggerAddAction( t, CustomVictoryQuitBJ )

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		EnableUserControl( true )

		if ( bj_isSinglePlayer ) {

			PauseGame( true )

		}

		EnableUserUI( false )

	}

	DialogDisplay( whichPlayer, d, true )
	VolumeGroupSetVolumeForPlayerBJ( whichPlayer, SOUND_VOLUMEGROUP_UI, 1 )
	StartSoundForPlayerBJ( whichPlayer, bj_victoryDialogSound )

};

//===========================================================================
const CustomVictorySkipBJ = ( whichPlayer ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		if ( bj_isSinglePlayer ) {

			// Bump the difficulty back up to the default.
			SetGameDifficulty( GetDefaultDifficulty() )

		}

		if ( ( bj_changeLevelMapName == null ) ) {

			EndGame( bj_changeLevelShowScores )

		} else {

			ChangeLevel( bj_changeLevelMapName, bj_changeLevelShowScores )

		}

	}

};

//===========================================================================
const CustomVictoryBJ = ( whichPlayer, showDialog, showScores ) => {

	if ( AllowVictoryDefeat( PLAYER_GAME_RESULT_VICTORY ) ) {

		RemovePlayer( whichPlayer, PLAYER_GAME_RESULT_VICTORY )

		if ( ! bj_isSinglePlayer ) {

			DisplayTimedTextFromPlayer( whichPlayer, 0, 0, 60, GetLocalizedString( "PLAYER_VICTORIOUS" ) )

		}

		// UI only needs to be displayed to users.

		if ( ( GetPlayerController( whichPlayer ) == MAP_CONTROL_USER ) ) {

			bj_changeLevelShowScores = showScores;

			if ( showDialog ) {

				CustomVictoryDialogBJ( whichPlayer )

			} else {

				CustomVictorySkipBJ( whichPlayer )

			}

		}

	}

};

//===========================================================================
const CustomDefeatRestartBJ = () => {

	PauseGame( false )
	RestartGame( true )

};

//===========================================================================
const CustomDefeatReduceDifficultyBJ = () => {

	let diff = GetGameDifficulty();

	PauseGame( false )

	// Knock the difficulty down, if possible.

	if ( ( diff == MAP_DIFFICULTY_EASY ) ) {

		// Sorry, but it doesn't get any easier than this.

	} else if ( ( diff == MAP_DIFFICULTY_NORMAL ) ) {

		SetGameDifficulty( MAP_DIFFICULTY_EASY )

	} else if ( ( diff == MAP_DIFFICULTY_HARD ) ) {

		SetGameDifficulty( MAP_DIFFICULTY_NORMAL )

	} else {

		// Unrecognized difficulty

	}

	RestartGame( true )

};

//===========================================================================
const CustomDefeatLoadBJ = () => {

	PauseGame( false )
	DisplayLoadDialog()

};

//===========================================================================
const CustomDefeatQuitBJ = () => {

	if ( bj_isSinglePlayer ) {

		PauseGame( false )

	}

	// Bump the difficulty back up to the default.
	SetGameDifficulty( GetDefaultDifficulty() )
	EndGame( true )

};

//===========================================================================
const CustomDefeatDialogBJ = ( whichPlayer, message ) => {

	let t = CreateTrigger();
	let d = DialogCreate();

	DialogSetMessage( d, message )

	if ( bj_isSinglePlayer ) {

		t = CreateTrigger();
		TriggerRegisterDialogButtonEvent( t, DialogAddButton( d, GetLocalizedString( "GAMEOVER_RESTART" ), GetLocalizedHotkey( "GAMEOVER_RESTART" ) ) )
		TriggerAddAction( t, CustomDefeatRestartBJ )

		if ( ( GetGameDifficulty() != MAP_DIFFICULTY_EASY ) ) {

			t = CreateTrigger();
			TriggerRegisterDialogButtonEvent( t, DialogAddButton( d, GetLocalizedString( "GAMEOVER_REDUCE_DIFFICULTY" ), GetLocalizedHotkey( "GAMEOVER_REDUCE_DIFFICULTY" ) ) )
			TriggerAddAction( t, CustomDefeatReduceDifficultyBJ )

		}

		t = CreateTrigger();
		TriggerRegisterDialogButtonEvent( t, DialogAddButton( d, GetLocalizedString( "GAMEOVER_LOAD" ), GetLocalizedHotkey( "GAMEOVER_LOAD" ) ) )
		TriggerAddAction( t, CustomDefeatLoadBJ )

	}

	t = CreateTrigger();
	TriggerRegisterDialogButtonEvent( t, DialogAddButton( d, GetLocalizedString( "GAMEOVER_QUIT_MISSION" ), GetLocalizedHotkey( "GAMEOVER_QUIT_MISSION" ) ) )
	TriggerAddAction( t, CustomDefeatQuitBJ )

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		EnableUserControl( true )

		if ( bj_isSinglePlayer ) {

			PauseGame( true )

		}

		EnableUserUI( false )

	}

	DialogDisplay( whichPlayer, d, true )
	VolumeGroupSetVolumeForPlayerBJ( whichPlayer, SOUND_VOLUMEGROUP_UI, 1 )
	StartSoundForPlayerBJ( whichPlayer, bj_defeatDialogSound )

};

//===========================================================================
const CustomDefeatBJ = ( whichPlayer, message ) => {

	if ( AllowVictoryDefeat( PLAYER_GAME_RESULT_DEFEAT ) ) {

		RemovePlayer( whichPlayer, PLAYER_GAME_RESULT_DEFEAT )

		if ( ! bj_isSinglePlayer ) {

			DisplayTimedTextFromPlayer( whichPlayer, 0, 0, 60, GetLocalizedString( "PLAYER_DEFEATED" ) )

		}

		// UI only needs to be displayed to users.

		if ( ( GetPlayerController( whichPlayer ) == MAP_CONTROL_USER ) ) {

			CustomDefeatDialogBJ( whichPlayer, message )

		}

	}

};

//===========================================================================
const SetNextLevelBJ = ( nextLevel ) => {

	if ( ( nextLevel == "" ) ) {

		bj_changeLevelMapName = null;

	} else {

		bj_changeLevelMapName = nextLevel;

	}

};

//===========================================================================
const SetPlayerOnScoreScreenBJ = ( flag, whichPlayer ) => {

	SetPlayerOnScoreScreen( whichPlayer, flag )

};

//***************************************************************************
//*
//*  Quest Utility Functions
//*
//***************************************************************************

//===========================================================================
const CreateQuestBJ = ( questType, title, description, iconPath ) => {

	let required = ( questType == bj_QUESTTYPE_REQ_DISCOVERED ) || ( questType == bj_QUESTTYPE_REQ_UNDISCOVERED );
	let discovered = ( questType == bj_QUESTTYPE_REQ_DISCOVERED ) || ( questType == bj_QUESTTYPE_OPT_DISCOVERED );

	bj_lastCreatedQuest = CreateQuest();
	QuestSetTitle( bj_lastCreatedQuest, title )
	QuestSetDescription( bj_lastCreatedQuest, description )
	QuestSetIconPath( bj_lastCreatedQuest, iconPath )
	QuestSetRequired( bj_lastCreatedQuest, required )
	QuestSetDiscovered( bj_lastCreatedQuest, discovered )
	QuestSetCompleted( bj_lastCreatedQuest, false )
	return bj_lastCreatedQuest

};

//===========================================================================
const DestroyQuestBJ = ( whichQuest ) => {

	DestroyQuest( whichQuest )

};

//===========================================================================
const QuestSetEnabledBJ = ( enabled, whichQuest ) => {

	QuestSetEnabled( whichQuest, enabled )

};

//===========================================================================
const QuestSetTitleBJ = ( whichQuest, title ) => {

	QuestSetTitle( whichQuest, title )

};

//===========================================================================
const QuestSetDescriptionBJ = ( whichQuest, description ) => {

	QuestSetDescription( whichQuest, description )

};

//===========================================================================
const QuestSetCompletedBJ = ( whichQuest, completed ) => {

	QuestSetCompleted( whichQuest, completed )

};

//===========================================================================
const QuestSetFailedBJ = ( whichQuest, failed ) => {

	QuestSetFailed( whichQuest, failed )

};

//===========================================================================
const QuestSetDiscoveredBJ = ( whichQuest, discovered ) => {

	QuestSetDiscovered( whichQuest, discovered )

};

//===========================================================================
const GetLastCreatedQuestBJ = () => {

	return bj_lastCreatedQuest

};

//===========================================================================
const CreateQuestItemBJ = ( whichQuest, description ) => {

	bj_lastCreatedQuestItem = QuestCreateItem( whichQuest );
	QuestItemSetDescription( bj_lastCreatedQuestItem, description )
	QuestItemSetCompleted( bj_lastCreatedQuestItem, false )
	return bj_lastCreatedQuestItem

};

//===========================================================================
const QuestItemSetDescriptionBJ = ( whichQuestItem, description ) => {

	QuestItemSetDescription( whichQuestItem, description )

};

//===========================================================================
const QuestItemSetCompletedBJ = ( whichQuestItem, completed ) => {

	QuestItemSetCompleted( whichQuestItem, completed )

};

//===========================================================================
const GetLastCreatedQuestItemBJ = () => {

	return bj_lastCreatedQuestItem

};

//===========================================================================
const CreateDefeatConditionBJ = ( description ) => {

	bj_lastCreatedDefeatCondition = CreateDefeatCondition();
	DefeatConditionSetDescription( bj_lastCreatedDefeatCondition, description )
	return bj_lastCreatedDefeatCondition

};

//===========================================================================
const DestroyDefeatConditionBJ = ( whichCondition ) => {

	DestroyDefeatCondition( whichCondition )

};

//===========================================================================
const DefeatConditionSetDescriptionBJ = ( whichCondition, description ) => {

	DefeatConditionSetDescription( whichCondition, description )

};

//===========================================================================
const GetLastCreatedDefeatConditionBJ = () => {

	return bj_lastCreatedDefeatCondition

};

//===========================================================================
const FlashQuestDialogButtonBJ = () => {

	FlashQuestDialogButton()

};

//===========================================================================
const QuestMessageBJ = ( f, messageType, message ) => {

	if ( ( IsPlayerInForce( GetLocalPlayer(), f ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.

		if ( ( messageType == bj_QUESTMESSAGE_DISCOVERED ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_QUEST, " " )
			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_QUEST, message )
			StartSound( bj_questDiscoveredSound )
			FlashQuestDialogButton()

		} else if ( ( messageType == bj_QUESTMESSAGE_UPDATED ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_QUESTUPDATE, " " )
			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_QUESTUPDATE, message )
			StartSound( bj_questUpdatedSound )
			FlashQuestDialogButton()

		} else if ( ( messageType == bj_QUESTMESSAGE_COMPLETED ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_QUESTDONE, " " )
			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_QUESTDONE, message )
			StartSound( bj_questCompletedSound )
			FlashQuestDialogButton()

		} else if ( ( messageType == bj_QUESTMESSAGE_FAILED ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_QUESTFAILED, " " )
			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_QUESTFAILED, message )
			StartSound( bj_questFailedSound )
			FlashQuestDialogButton()

		} else if ( ( messageType == bj_QUESTMESSAGE_REQUIREMENT ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_QUESTREQUIREMENT, message )

		} else if ( ( messageType == bj_QUESTMESSAGE_MISSIONFAILED ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_MISSIONFAILED, " " )
			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_MISSIONFAILED, message )
			StartSound( bj_questFailedSound )

		} else if ( ( messageType == bj_QUESTMESSAGE_HINT ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_HINT, " " )
			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_HINT, message )
			StartSound( bj_questHintSound )

		} else if ( ( messageType == bj_QUESTMESSAGE_ALWAYSHINT ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_ALWAYSHINT, " " )
			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_ALWAYSHINT, message )
			StartSound( bj_questHintSound )

		} else if ( ( messageType == bj_QUESTMESSAGE_SECRET ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_SECRET, " " )
			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_SECRET, message )
			StartSound( bj_questSecretSound )

		} else if ( ( messageType == bj_QUESTMESSAGE_UNITACQUIRED ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_UNITACQUIRED, " " )
			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_UNITACQUIRED, message )
			StartSound( bj_questHintSound )

		} else if ( ( messageType == bj_QUESTMESSAGE_UNITAVAILABLE ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_UNITAVAILABLE, " " )
			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_UNITAVAILABLE, message )
			StartSound( bj_questHintSound )

		} else if ( ( messageType == bj_QUESTMESSAGE_ITEMACQUIRED ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_ITEMACQUIRED, " " )
			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_ITEMACQUIRED, message )
			StartSound( bj_questItemAcquiredSound )

		} else if ( ( messageType == bj_QUESTMESSAGE_WARNING ) ) {

			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_WARNING, " " )
			DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_TEXT_DELAY_WARNING, message )
			StartSound( bj_questWarningSound )

		} else {

			// Unrecognized message type - ignore the request.

		}

	}

};

//***************************************************************************
//*
//*  Timer Utility Functions
//*
//***************************************************************************

//===========================================================================
const StartTimerBJ = ( t, periodic, timeout ) => {

	bj_lastStartedTimer = t;
	TimerStart( t, timeout, periodic, null )
	return bj_lastStartedTimer

};

//===========================================================================
const CreateTimerBJ = ( periodic, timeout ) => {

	bj_lastStartedTimer = CreateTimer();
	TimerStart( bj_lastStartedTimer, timeout, periodic, null )
	return bj_lastStartedTimer

};

//===========================================================================
const DestroyTimerBJ = ( whichTimer ) => {

	DestroyTimer( whichTimer )

};

//===========================================================================
const PauseTimerBJ = ( pause, whichTimer ) => {

	if ( pause ) {

		PauseTimer( whichTimer )

	} else {

		ResumeTimer( whichTimer )

	}

};

//===========================================================================
const GetLastCreatedTimerBJ = () => {

	return bj_lastStartedTimer

};

//===========================================================================
const CreateTimerDialogBJ = ( t, title ) => {

	bj_lastCreatedTimerDialog = CreateTimerDialog( t );
	TimerDialogSetTitle( bj_lastCreatedTimerDialog, title )
	TimerDialogDisplay( bj_lastCreatedTimerDialog, true )
	return bj_lastCreatedTimerDialog

};

//===========================================================================
const DestroyTimerDialogBJ = ( td ) => {

	DestroyTimerDialog( td )

};

//===========================================================================
const TimerDialogSetTitleBJ = ( td, title ) => {

	TimerDialogSetTitle( td, title )

};

//===========================================================================
const TimerDialogSetTitleColorBJ = ( td, red, green, blue, transparency ) => {

	TimerDialogSetTitleColor( td, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
const TimerDialogSetTimeColorBJ = ( td, red, green, blue, transparency ) => {

	TimerDialogSetTimeColor( td, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
const TimerDialogSetSpeedBJ = ( td, speedMultFactor ) => {

	TimerDialogSetSpeed( td, speedMultFactor )

};

//===========================================================================
const TimerDialogDisplayForPlayerBJ = ( show, td, whichPlayer ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		TimerDialogDisplay( td, show )

	}

};

//===========================================================================
const TimerDialogDisplayBJ = ( show, td ) => {

	TimerDialogDisplay( td, show )

};

//===========================================================================
const GetLastCreatedTimerDialogBJ = () => {

	return bj_lastCreatedTimerDialog

};

//***************************************************************************
//*
//*  Leaderboard Utility Functions
//*
//***************************************************************************

//===========================================================================
const LeaderboardResizeBJ = ( lb ) => {

	let size = LeaderboardGetItemCount( lb );

	if ( ( LeaderboardGetLabelText( lb ) == "" ) ) {

		size = size - 1;

	}

	LeaderboardSetSizeByItemCount( lb, size )

};

//===========================================================================
const LeaderboardSetPlayerItemValueBJ = ( whichPlayer, lb, val ) => {

	LeaderboardSetItemValue( lb, LeaderboardGetPlayerIndex( lb, whichPlayer ), val )

};

//===========================================================================
const LeaderboardSetPlayerItemLabelBJ = ( whichPlayer, lb, val ) => {

	LeaderboardSetItemLabel( lb, LeaderboardGetPlayerIndex( lb, whichPlayer ), val )

};

//===========================================================================
const LeaderboardSetPlayerItemStyleBJ = ( whichPlayer, lb, showLabel, showValue, showIcon ) => {

	LeaderboardSetItemStyle( lb, LeaderboardGetPlayerIndex( lb, whichPlayer ), showLabel, showValue, showIcon )

};

//===========================================================================
const LeaderboardSetPlayerItemLabelColorBJ = ( whichPlayer, lb, red, green, blue, transparency ) => {

	LeaderboardSetItemLabelColor( lb, LeaderboardGetPlayerIndex( lb, whichPlayer ), PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
const LeaderboardSetPlayerItemValueColorBJ = ( whichPlayer, lb, red, green, blue, transparency ) => {

	LeaderboardSetItemValueColor( lb, LeaderboardGetPlayerIndex( lb, whichPlayer ), PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
const LeaderboardSetLabelColorBJ = ( lb, red, green, blue, transparency ) => {

	LeaderboardSetLabelColor( lb, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
const LeaderboardSetValueColorBJ = ( lb, red, green, blue, transparency ) => {

	LeaderboardSetValueColor( lb, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
const LeaderboardSetLabelBJ = ( lb, label ) => {

	LeaderboardSetLabel( lb, label )
	LeaderboardResizeBJ( lb )

};

//===========================================================================
const LeaderboardSetStyleBJ = ( lb, showLabel, showNames, showValues, showIcons ) => {

	LeaderboardSetStyle( lb, showLabel, showNames, showValues, showIcons )

};

//===========================================================================
const LeaderboardGetItemCountBJ = ( lb ) => {

	return LeaderboardGetItemCount( lb )

};

//===========================================================================
const LeaderboardHasPlayerItemBJ = ( lb, whichPlayer ) => {

	return LeaderboardHasPlayerItem( lb, whichPlayer )

};

//===========================================================================
const ForceSetLeaderboardBJ = ( lb, toForce ) => {

	let index;
	let indexPlayer;

	index = 0;

	while ( true ) {

		indexPlayer = Player( index );

		if ( IsPlayerInForce( indexPlayer, toForce ) ) {

			PlayerSetLeaderboard( indexPlayer, lb )

		}

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

};

//===========================================================================
const CreateLeaderboardBJ = ( toForce, label ) => {

	bj_lastCreatedLeaderboard = CreateLeaderboard();
	LeaderboardSetLabel( bj_lastCreatedLeaderboard, label )
	ForceSetLeaderboardBJ( bj_lastCreatedLeaderboard, toForce )
	LeaderboardDisplay( bj_lastCreatedLeaderboard, true )
	return bj_lastCreatedLeaderboard

};

//===========================================================================
const DestroyLeaderboardBJ = ( lb ) => {

	DestroyLeaderboard( lb )

};

//===========================================================================
const LeaderboardDisplayBJ = ( show, lb ) => {

	LeaderboardDisplay( lb, show )

};

//===========================================================================
const LeaderboardAddItemBJ = ( whichPlayer, lb, label, value ) => {

	if ( ( LeaderboardHasPlayerItem( lb, whichPlayer ) ) ) {

		LeaderboardRemovePlayerItem( lb, whichPlayer )

	}

	LeaderboardAddItem( lb, label, value, whichPlayer )
	LeaderboardResizeBJ( lb )
	//call LeaderboardSetSizeByItemCount(lb, LeaderboardGetItemCount(lb))

};

//===========================================================================
const LeaderboardRemovePlayerItemBJ = ( whichPlayer, lb ) => {

	LeaderboardRemovePlayerItem( lb, whichPlayer )
	LeaderboardResizeBJ( lb )

};

//===========================================================================
const LeaderboardSortItemsBJ = ( lb, sortType, ascending ) => {

	if ( ( sortType == bj_SORTTYPE_SORTBYVALUE ) ) {

		LeaderboardSortItemsByValue( lb, ascending )

	} else if ( ( sortType == bj_SORTTYPE_SORTBYPLAYER ) ) {

		LeaderboardSortItemsByPlayer( lb, ascending )

	} else if ( ( sortType == bj_SORTTYPE_SORTBYLABEL ) ) {

		LeaderboardSortItemsByLabel( lb, ascending )

	} else {

		// Unrecognized sort type - ignore the request.

	}

};

//===========================================================================
const LeaderboardSortItemsByPlayerBJ = ( lb, ascending ) => {

	LeaderboardSortItemsByPlayer( lb, ascending )

};

//===========================================================================
const LeaderboardSortItemsByLabelBJ = ( lb, ascending ) => {

	LeaderboardSortItemsByLabel( lb, ascending )

};

//===========================================================================
const LeaderboardGetPlayerIndexBJ = ( whichPlayer, lb ) => {

	return LeaderboardGetPlayerIndex( lb, whichPlayer ) + 1

};

//===========================================================================
// Returns the player who is occupying a specified position in a leaderboard.
// The position parameter is expected in the range of 1..16.
//
const LeaderboardGetIndexedPlayerBJ = ( position, lb ) => {

	let index;
	let indexPlayer;

	index = 0;

	while ( true ) {

		indexPlayer = Player( index );

		if ( ( LeaderboardGetPlayerIndex( lb, indexPlayer ) == position - 1 ) ) {

			return indexPlayer

		}

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

	return Player( PLAYER_NEUTRAL_PASSIVE )

};

//===========================================================================
const PlayerGetLeaderboardBJ = ( whichPlayer ) => {

	return PlayerGetLeaderboard( whichPlayer )

};

//===========================================================================
const GetLastCreatedLeaderboard = () => {

	return bj_lastCreatedLeaderboard

};

//***************************************************************************
//*
//*  Multiboard Utility Functions
//*
//***************************************************************************

//===========================================================================
const CreateMultiboardBJ = ( cols, rows, title ) => {

	bj_lastCreatedMultiboard = CreateMultiboard();
	MultiboardSetRowCount( bj_lastCreatedMultiboard, rows )
	MultiboardSetColumnCount( bj_lastCreatedMultiboard, cols )
	MultiboardSetTitleText( bj_lastCreatedMultiboard, title )
	MultiboardDisplay( bj_lastCreatedMultiboard, true )
	return bj_lastCreatedMultiboard

};

//===========================================================================
const DestroyMultiboardBJ = ( mb ) => {

	DestroyMultiboard( mb )

};

//===========================================================================
const GetLastCreatedMultiboard = () => {

	return bj_lastCreatedMultiboard

};

//===========================================================================
const MultiboardDisplayBJ = ( show, mb ) => {

	MultiboardDisplay( mb, show )

};

//===========================================================================
const MultiboardMinimizeBJ = ( minimize, mb ) => {

	MultiboardMinimize( mb, minimize )

};

//===========================================================================
const MultiboardSetTitleTextColorBJ = ( mb, red, green, blue, transparency ) => {

	MultiboardSetTitleTextColor( mb, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
const MultiboardAllowDisplayBJ = ( flag ) => {

	MultiboardSuppressDisplay( ! flag )

};

//===========================================================================
const MultiboardSetItemStyleBJ = ( mb, col, row, showValue, showIcon ) => {

	let curRow = 0;
	let curCol = 0;
	let numRows = MultiboardGetRowCount( mb );
	let numCols = MultiboardGetColumnCount( mb );
	let mbitem;

	// Loop over rows, using 1-based index

	while ( true ) {

		curRow = curRow + 1;
		if ( curRow > numRows ) break;

		// Apply setting to the requested row, or all rows (if row is 0)

		if ( ( row == 0 || row == curRow ) ) {

			// Loop over columns, using 1-based index
			curCol = 0;

			while ( true ) {

				curCol = curCol + 1;
				if ( curCol > numCols ) break;

				// Apply setting to the requested column, or all columns (if col is 0)

				if ( ( col == 0 || col == curCol ) ) {

					mbitem = MultiboardGetItem( mb, curRow - 1, curCol - 1 );
					MultiboardSetItemStyle( mbitem, showValue, showIcon )
					MultiboardReleaseItem( mbitem )

				}

			}

		}

	}

};

//===========================================================================
const MultiboardSetItemValueBJ = ( mb, col, row, val ) => {

	let curRow = 0;
	let curCol = 0;
	let numRows = MultiboardGetRowCount( mb );
	let numCols = MultiboardGetColumnCount( mb );
	let mbitem;

	// Loop over rows, using 1-based index

	while ( true ) {

		curRow = curRow + 1;
		if ( curRow > numRows ) break;

		// Apply setting to the requested row, or all rows (if row is 0)

		if ( ( row == 0 || row == curRow ) ) {

			// Loop over columns, using 1-based index
			curCol = 0;

			while ( true ) {

				curCol = curCol + 1;
				if ( curCol > numCols ) break;

				// Apply setting to the requested column, or all columns (if col is 0)

				if ( ( col == 0 || col == curCol ) ) {

					mbitem = MultiboardGetItem( mb, curRow - 1, curCol - 1 );
					MultiboardSetItemValue( mbitem, val )
					MultiboardReleaseItem( mbitem )

				}

			}

		}

	}

};

//===========================================================================
const MultiboardSetItemColorBJ = ( mb, col, row, red, green, blue, transparency ) => {

	let curRow = 0;
	let curCol = 0;
	let numRows = MultiboardGetRowCount( mb );
	let numCols = MultiboardGetColumnCount( mb );
	let mbitem;

	// Loop over rows, using 1-based index

	while ( true ) {

		curRow = curRow + 1;
		if ( curRow > numRows ) break;

		// Apply setting to the requested row, or all rows (if row is 0)

		if ( ( row == 0 || row == curRow ) ) {

			// Loop over columns, using 1-based index
			curCol = 0;

			while ( true ) {

				curCol = curCol + 1;
				if ( curCol > numCols ) break;

				// Apply setting to the requested column, or all columns (if col is 0)

				if ( ( col == 0 || col == curCol ) ) {

					mbitem = MultiboardGetItem( mb, curRow - 1, curCol - 1 );
					MultiboardSetItemValueColor( mbitem, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )
					MultiboardReleaseItem( mbitem )

				}

			}

		}

	}

};

//===========================================================================
const MultiboardSetItemWidthBJ = ( mb, col, row, width ) => {

	let curRow = 0;
	let curCol = 0;
	let numRows = MultiboardGetRowCount( mb );
	let numCols = MultiboardGetColumnCount( mb );
	let mbitem;

	// Loop over rows, using 1-based index

	while ( true ) {

		curRow = curRow + 1;
		if ( curRow > numRows ) break;

		// Apply setting to the requested row, or all rows (if row is 0)

		if ( ( row == 0 || row == curRow ) ) {

			// Loop over columns, using 1-based index
			curCol = 0;

			while ( true ) {

				curCol = curCol + 1;
				if ( curCol > numCols ) break;

				// Apply setting to the requested column, or all columns (if col is 0)

				if ( ( col == 0 || col == curCol ) ) {

					mbitem = MultiboardGetItem( mb, curRow - 1, curCol - 1 );
					MultiboardSetItemWidth( mbitem, width / 100 )
					MultiboardReleaseItem( mbitem )

				}

			}

		}

	}

};

//===========================================================================
const MultiboardSetItemIconBJ = ( mb, col, row, iconFileName ) => {

	let curRow = 0;
	let curCol = 0;
	let numRows = MultiboardGetRowCount( mb );
	let numCols = MultiboardGetColumnCount( mb );
	let mbitem;

	// Loop over rows, using 1-based index

	while ( true ) {

		curRow = curRow + 1;
		if ( curRow > numRows ) break;

		// Apply setting to the requested row, or all rows (if row is 0)

		if ( ( row == 0 || row == curRow ) ) {

			// Loop over columns, using 1-based index
			curCol = 0;

			while ( true ) {

				curCol = curCol + 1;
				if ( curCol > numCols ) break;

				// Apply setting to the requested column, or all columns (if col is 0)

				if ( ( col == 0 || col == curCol ) ) {

					mbitem = MultiboardGetItem( mb, curRow - 1, curCol - 1 );
					MultiboardSetItemIcon( mbitem, iconFileName )
					MultiboardReleaseItem( mbitem )

				}

			}

		}

	}

};

//***************************************************************************
//*
//*  Text Tag Utility Functions
//*
//***************************************************************************

//===========================================================================
// Scale the font size linearly such that size 10 equates to height 0.023.
// Screen-relative font heights are harder to grasp and than font sizes.
//
const TextTagSize2Height = ( size ) => {

	return size * 0.023 / 10

};

//===========================================================================
// Scale the speed linearly such that speed 128 equates to 0.071.
// Screen-relative speeds are hard to grasp.
//
const TextTagSpeed2Velocity = ( speed ) => {

	return speed * 0.071 / 128

};

//===========================================================================
const SetTextTagColorBJ = ( tt, red, green, blue, transparency ) => {

	SetTextTagColor( tt, PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - transparency ) )

};

//===========================================================================
const SetTextTagVelocityBJ = ( tt, speed, angle ) => {

	let vel = TextTagSpeed2Velocity( speed );
	let xvel = vel * Cos( angle * bj_DEGTORAD );
	let yvel = vel * Sin( angle * bj_DEGTORAD );

	SetTextTagVelocity( tt, xvel, yvel )

};

//===========================================================================
const SetTextTagTextBJ = ( tt, s, size ) => {

	let textHeight = TextTagSize2Height( size );

	SetTextTagText( tt, s, textHeight )

};

//===========================================================================
const SetTextTagPosBJ = ( tt, loc, zOffset ) => {

	SetTextTagPos( tt, GetLocationX( loc ), GetLocationY( loc ), zOffset )

};

//===========================================================================
const SetTextTagPosUnitBJ = ( tt, whichUnit, zOffset ) => {

	SetTextTagPosUnit( tt, whichUnit, zOffset )

};

//===========================================================================
const SetTextTagSuspendedBJ = ( tt, flag ) => {

	SetTextTagSuspended( tt, flag )

};

//===========================================================================
const SetTextTagPermanentBJ = ( tt, flag ) => {

	SetTextTagPermanent( tt, flag )

};

//===========================================================================
const SetTextTagAgeBJ = ( tt, age ) => {

	SetTextTagAge( tt, age )

};

//===========================================================================
const SetTextTagLifespanBJ = ( tt, lifespan ) => {

	SetTextTagLifespan( tt, lifespan )

};

//===========================================================================
const SetTextTagFadepointBJ = ( tt, fadepoint ) => {

	SetTextTagFadepoint( tt, fadepoint )

};

//===========================================================================
const CreateTextTagLocBJ = ( s, loc, zOffset, size, red, green, blue, transparency ) => {

	bj_lastCreatedTextTag = CreateTextTag();
	SetTextTagTextBJ( bj_lastCreatedTextTag, s, size )
	SetTextTagPosBJ( bj_lastCreatedTextTag, loc, zOffset )
	SetTextTagColorBJ( bj_lastCreatedTextTag, red, green, blue, transparency )

	return bj_lastCreatedTextTag

};

//===========================================================================
const CreateTextTagUnitBJ = ( s, whichUnit, zOffset, size, red, green, blue, transparency ) => {

	bj_lastCreatedTextTag = CreateTextTag();
	SetTextTagTextBJ( bj_lastCreatedTextTag, s, size )
	SetTextTagPosUnitBJ( bj_lastCreatedTextTag, whichUnit, zOffset )
	SetTextTagColorBJ( bj_lastCreatedTextTag, red, green, blue, transparency )

	return bj_lastCreatedTextTag

};

//===========================================================================
const DestroyTextTagBJ = ( tt ) => {

	DestroyTextTag( tt )

};

//===========================================================================
const ShowTextTagForceBJ = ( show, tt, whichForce ) => {

	if ( ( IsPlayerInForce( GetLocalPlayer(), whichForce ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		SetTextTagVisibility( tt, show )

	}

};

//===========================================================================
const GetLastCreatedTextTag = () => {

	return bj_lastCreatedTextTag

};

//***************************************************************************
//*
//*  Cinematic Utility Functions
//*
//***************************************************************************

//===========================================================================
const PauseGameOn = () => {

	PauseGame( true )

};

//===========================================================================
const PauseGameOff = () => {

	PauseGame( false )

};

//===========================================================================
const SetUserControlForceOn = ( whichForce ) => {

	if ( ( IsPlayerInForce( GetLocalPlayer(), whichForce ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		EnableUserControl( true )

	}

};

//===========================================================================
const SetUserControlForceOff = ( whichForce ) => {

	if ( ( IsPlayerInForce( GetLocalPlayer(), whichForce ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		EnableUserControl( false )

	}

};

//===========================================================================
const ShowInterfaceForceOn = ( whichForce, fadeDuration ) => {

	if ( ( IsPlayerInForce( GetLocalPlayer(), whichForce ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		ShowInterface( true, fadeDuration )

	}

};

//===========================================================================
const ShowInterfaceForceOff = ( whichForce, fadeDuration ) => {

	if ( ( IsPlayerInForce( GetLocalPlayer(), whichForce ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		ShowInterface( false, fadeDuration )

	}

};

//===========================================================================
const PingMinimapForForce = ( whichForce, x, y, duration ) => {

	if ( ( IsPlayerInForce( GetLocalPlayer(), whichForce ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		PingMinimap( x, y, duration )
		//call StartSound(bj_pingMinimapSound)

	}

};

//===========================================================================
const PingMinimapLocForForce = ( whichForce, loc, duration ) => {

	PingMinimapForForce( whichForce, GetLocationX( loc ), GetLocationY( loc ), duration )

};

//===========================================================================
const PingMinimapForPlayer = ( whichPlayer, x, y, duration ) => {

	if ( ( GetLocalPlayer() == whichPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		PingMinimap( x, y, duration )
		//call StartSound(bj_pingMinimapSound)

	}

};

//===========================================================================
const PingMinimapLocForPlayer = ( whichPlayer, loc, duration ) => {

	PingMinimapForPlayer( whichPlayer, GetLocationX( loc ), GetLocationY( loc ), duration )

};

//===========================================================================
const PingMinimapForForceEx = ( whichForce, x, y, duration, style, red, green, blue ) => {

	let red255 = PercentTo255( red );
	let green255 = PercentTo255( green );
	let blue255 = PercentTo255( blue );

	if ( ( IsPlayerInForce( GetLocalPlayer(), whichForce ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.

		// Prevent 100% red simple and flashy pings, as they become "attack" pings.

		if ( ( red255 == 255 ) && ( green255 == 0 ) && ( blue255 == 0 ) ) {

			red255 = 254;

		}

		if ( ( style == bj_MINIMAPPINGSTYLE_SIMPLE ) ) {

			PingMinimapEx( x, y, duration, red255, green255, blue255, false )

		} else if ( ( style == bj_MINIMAPPINGSTYLE_FLASHY ) ) {

			PingMinimapEx( x, y, duration, red255, green255, blue255, true )

		} else if ( ( style == bj_MINIMAPPINGSTYLE_ATTACK ) ) {

			PingMinimapEx( x, y, duration, 255, 0, 0, false )

		} else {

			// Unrecognized ping style - ignore the request.

		}

		//call StartSound(bj_pingMinimapSound)

	}

};

//===========================================================================
const PingMinimapLocForForceEx = ( whichForce, loc, duration, style, red, green, blue ) => {

	PingMinimapForForceEx( whichForce, GetLocationX( loc ), GetLocationY( loc ), duration, style, red, green, blue )

};

//===========================================================================
const EnableWorldFogBoundaryBJ = ( enable, f ) => {

	if ( ( IsPlayerInForce( GetLocalPlayer(), f ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		EnableWorldFogBoundary( enable )

	}

};

//===========================================================================
const EnableOcclusionBJ = ( enable, f ) => {

	if ( ( IsPlayerInForce( GetLocalPlayer(), f ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.
		EnableOcclusion( enable )

	}

};

//***************************************************************************
//*
//*  Cinematic Transmission Utility Functions
//*
//***************************************************************************

//===========================================================================
// If cancelled, stop the sound and end the cinematic scene.
//
const CancelCineSceneBJ = () => {

	StopSoundBJ( bj_cineSceneLastSound, true )
	EndCinematicScene()

};

//===========================================================================
// Init a trigger to listen for END_CINEMATIC events and respond to them if
// a cinematic scene is in progress.  For performance reasons, this should
// only be called once a cinematic scene has been started, so that maps
// lacking such scenes do not bother to register for these events.
//
const TryInitCinematicBehaviorBJ = () => {

	let index;

	if ( ( bj_cineSceneBeingSkipped == null ) ) {

		bj_cineSceneBeingSkipped = CreateTrigger();
		index = 0;

		while ( true ) {

			TriggerRegisterPlayerEvent( bj_cineSceneBeingSkipped, Player( index ), EVENT_PLAYER_END_CINEMATIC )
			index = index + 1;
			if ( index == bj_MAX_PLAYERS ) break;

		}

		TriggerAddAction( bj_cineSceneBeingSkipped, CancelCineSceneBJ )

	}

};

//===========================================================================
const SetCinematicSceneBJ = ( soundHandle, portraitUnitId, color, speakerTitle, text, sceneDuration, voiceoverDuration ) => {

	bj_cineSceneLastSound = soundHandle;
	PlaySoundBJ( soundHandle )
	SetCinematicScene( portraitUnitId, color, speakerTitle, text, sceneDuration, voiceoverDuration )

};

//===========================================================================
const GetTransmissionDuration = ( soundHandle, timeType, timeVal ) => {

	let duration;

	if ( ( timeType == bj_TIMETYPE_ADD ) ) {

		duration = GetSoundDurationBJ( soundHandle ) + timeVal;

	} else if ( ( timeType == bj_TIMETYPE_SET ) ) {

		duration = timeVal;

	} else if ( ( timeType == bj_TIMETYPE_SUB ) ) {

		duration = GetSoundDurationBJ( soundHandle ) - timeVal;

	} else {

		// Unrecognized timeType - ignore timeVal.
		duration = GetSoundDurationBJ( soundHandle );

	}

	// Make sure we have a non-negative duration.

	if ( ( duration < 0 ) ) {

		duration = 0;

	}

	return duration

};

//===========================================================================
const WaitTransmissionDuration = ( soundHandle, timeType, timeVal ) => {

	if ( ( timeType == bj_TIMETYPE_SET ) ) {

		// If we have a static duration wait, just perform the wait.
		TriggerSleepAction( timeVal )

	} else if ( ( soundHandle == null ) ) {

		// If the sound does not exist, perform a default length wait.
		TriggerSleepAction( bj_NOTHING_SOUND_DURATION )

	} else if ( ( timeType == bj_TIMETYPE_SUB ) ) {

		// If the transmission is cutting off the sound, wait for the sound
		// to be mostly finished.
		WaitForSoundBJ( soundHandle, timeVal )

	} else if ( ( timeType == bj_TIMETYPE_ADD ) ) {

		// If the transmission is extending beyond the sound's length, wait
		// for it to finish, and then wait the additional time.
		WaitForSoundBJ( soundHandle, 0 )
		TriggerSleepAction( timeVal )

	} else {

		// Unrecognized timeType - ignore.

	}

};

//===========================================================================
const DoTransmissionBasicsXYBJ = ( unitId, color, x, y, soundHandle, unitName, message, duration ) => {

	SetCinematicSceneBJ( soundHandle, unitId, color, unitName, message, duration + bj_TRANSMISSION_PORT_HANGTIME, duration )

	if ( ( unitId != 0 ) ) {

		PingMinimap( x, y, bj_TRANSMISSION_PING_TIME )
		//call SetCameraQuickPosition(x, y)

	}

};

//===========================================================================
// Display a text message to a Player Group with an accompanying sound,
// portrait, speech indicator, and all that good stuff.
//   - Query duration of sound
//   - Play sound
//   - Display text message for duration
//   - Display animating portrait for duration
//   - Display a speech indicator for the unit
//   - Ping the minimap
//
const TransmissionFromUnitWithNameBJ = ( toForce, whichUnit, unitName, soundHandle, message, timeType, timeVal, wait ) => {

	TryInitCinematicBehaviorBJ()

	// Ensure that the time value is non-negative.
	timeVal = RMaxBJ( timeVal, 0 );

	bj_lastTransmissionDuration = GetTransmissionDuration( soundHandle, timeType, timeVal );
	bj_lastPlayedSound = soundHandle;

	if ( ( IsPlayerInForce( GetLocalPlayer(), toForce ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.

		if ( ( whichUnit == null ) ) {

			// If the unit reference is invalid, send the transmission from the center of the map with no portrait.
			DoTransmissionBasicsXYBJ( 0, PLAYER_COLOR_RED, 0, 0, soundHandle, unitName, message, bj_lastTransmissionDuration )

		} else {

			DoTransmissionBasicsXYBJ( GetUnitTypeId( whichUnit ), GetPlayerColor( GetOwningPlayer( whichUnit ) ), GetUnitX( whichUnit ), GetUnitY( whichUnit ), soundHandle, unitName, message, bj_lastTransmissionDuration )

			if ( ( ! IsUnitHidden( whichUnit ) ) ) {

				UnitAddIndicator( whichUnit, bj_TRANSMISSION_IND_RED, bj_TRANSMISSION_IND_BLUE, bj_TRANSMISSION_IND_GREEN, bj_TRANSMISSION_IND_ALPHA )

			}

		}

	}

	if ( wait && ( bj_lastTransmissionDuration > 0 ) ) {

		// call TriggerSleepAction(bj_lastTransmissionDuration)
		WaitTransmissionDuration( soundHandle, timeType, timeVal )

	}

};

//===========================================================================
// This operates like TransmissionFromUnitWithNameBJ, but for a unit type
// rather than a unit instance.  As such, no speech indicator is employed.
//
const TransmissionFromUnitTypeWithNameBJ = ( toForce, fromPlayer, unitId, unitName, loc, soundHandle, message, timeType, timeVal, wait ) => {

	TryInitCinematicBehaviorBJ()

	// Ensure that the time value is non-negative.
	timeVal = RMaxBJ( timeVal, 0 );

	bj_lastTransmissionDuration = GetTransmissionDuration( soundHandle, timeType, timeVal );
	bj_lastPlayedSound = soundHandle;

	if ( ( IsPlayerInForce( GetLocalPlayer(), toForce ) ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.

		DoTransmissionBasicsXYBJ( unitId, GetPlayerColor( fromPlayer ), GetLocationX( loc ), GetLocationY( loc ), soundHandle, unitName, message, bj_lastTransmissionDuration )

	}

	if ( wait && ( bj_lastTransmissionDuration > 0 ) ) {

		// call TriggerSleepAction(bj_lastTransmissionDuration)
		WaitTransmissionDuration( soundHandle, timeType, timeVal )

	}

};

//===========================================================================
const GetLastTransmissionDurationBJ = () => {

	return bj_lastTransmissionDuration

};

//===========================================================================
const ForceCinematicSubtitlesBJ = ( flag ) => {

	ForceCinematicSubtitles( flag )

};

//***************************************************************************
//*
//*  Cinematic Mode Utility Functions
//*
//***************************************************************************

//===========================================================================
// Makes many common UI settings changes at once, for use when beginning and
// ending cinematic sequences.  Note that some affects apply to all players,
// such as game speed.  This is unavoidable.
//   - Clear the screen of text messages
//   - Hide interface UI (letterbox mode)
//   - Hide game messages (ally under attack, etc.)
//   - Disable user control
//   - Disable occlusion
//   - Set game speed (for all players)
//   - Lock game speed (for all players)
//   - Disable black mask (for all players)
//   - Disable fog of war (for all players)
//   - Disable world boundary fog (for all players)
//   - Dim non-speech sound channels
//   - End any outstanding music themes
//   - Fix the random seed to a set value
//   - Reset the camera smoothing factor
//
const CinematicModeExBJ = ( cineMode, forForce, interfaceFadeTime ) => {

	// If the game hasn't started yet, perform interface fades immediately

	if ( ( ! bj_gameStarted ) ) {

		interfaceFadeTime = 0;

	}

	if ( ( cineMode ) ) {

		// Save the UI state so that we can restore it later.

		if ( ( ! bj_cineModeAlreadyIn ) ) {

			bj_cineModeAlreadyIn = true;
			bj_cineModePriorSpeed = GetGameSpeed();
			bj_cineModePriorFogSetting = IsFogEnabled();
			bj_cineModePriorMaskSetting = IsFogMaskEnabled();
			bj_cineModePriorDawnDusk = IsDawnDuskEnabled();
			bj_cineModeSavedSeed = GetRandomInt( 0, 1000000 );

		}

		// Perform local changes

		if ( ( IsPlayerInForce( GetLocalPlayer(), forForce ) ) ) {

			// Use only local code (no net traffic) within this block to avoid desyncs.
			ClearTextMessages()
			ShowInterface( false, interfaceFadeTime )
			EnableUserControl( false )
			EnableOcclusion( false )
			SetCineModeVolumeGroupsBJ()

		}

		// Perform global changes
		SetGameSpeed( bj_CINEMODE_GAMESPEED )
		SetMapFlag( MAP_LOCK_SPEED, true )
		FogMaskEnable( false )
		FogEnable( false )
		EnableWorldFogBoundary( false )
		EnableDawnDusk( false )

		// Use a fixed random seed, so that cinematics play consistently.
		SetRandomSeed( 0 )

	} else {

		bj_cineModeAlreadyIn = false;

		// Perform local changes

		if ( ( IsPlayerInForce( GetLocalPlayer(), forForce ) ) ) {

			// Use only local code (no net traffic) within this block to avoid desyncs.
			ShowInterface( true, interfaceFadeTime )
			EnableUserControl( true )
			EnableOcclusion( true )
			VolumeGroupReset()
			EndThematicMusic()
			CameraResetSmoothingFactorBJ()

		}

		// Perform global changes
		SetMapFlag( MAP_LOCK_SPEED, false )
		SetGameSpeed( bj_cineModePriorSpeed )
		FogMaskEnable( bj_cineModePriorMaskSetting )
		FogEnable( bj_cineModePriorFogSetting )
		EnableWorldFogBoundary( true )
		EnableDawnDusk( bj_cineModePriorDawnDusk )
		SetRandomSeed( bj_cineModeSavedSeed )

	}

};

//===========================================================================
const CinematicModeBJ = ( cineMode, forForce ) => {

	CinematicModeExBJ( cineMode, forForce, bj_CINEMODE_INTERFACEFADE )

};

//***************************************************************************
//*
//*  Cinematic Filter Utility Functions
//*
//***************************************************************************

//===========================================================================
const DisplayCineFilterBJ = ( flag ) => {

	DisplayCineFilter( flag )

};

//===========================================================================
const CinematicFadeCommonBJ = ( red, green, blue, duration, tex, startTrans, endTrans ) => {

	if ( ( duration == 0 ) ) {

		// If the fade is instant, use the same starting and ending values,
		// so that we effectively do a set rather than a fade.
		startTrans = endTrans;

	}

	EnableUserUI( false )
	SetCineFilterTexture( tex )
	SetCineFilterBlendMode( BLEND_MODE_BLEND )
	SetCineFilterTexMapFlags( TEXMAP_FLAG_NONE )
	SetCineFilterStartUV( 0, 0, 1, 1 )
	SetCineFilterEndUV( 0, 0, 1, 1 )
	SetCineFilterStartColor( PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - startTrans ) )
	SetCineFilterEndColor( PercentTo255( red ), PercentTo255( green ), PercentTo255( blue ), PercentTo255( 100 - endTrans ) )
	SetCineFilterDuration( duration )
	DisplayCineFilter( true )

};

//===========================================================================
const FinishCinematicFadeBJ = () => {

	DestroyTimer( bj_cineFadeFinishTimer )
	bj_cineFadeFinishTimer = null;
	DisplayCineFilter( false )
	EnableUserUI( true )

};

//===========================================================================
const FinishCinematicFadeAfterBJ = ( duration ) => {

	// Create a timer to end the cinematic fade.
	bj_cineFadeFinishTimer = CreateTimer();
	TimerStart( bj_cineFadeFinishTimer, duration, false, FinishCinematicFadeBJ )

};

//===========================================================================
const ContinueCinematicFadeBJ = () => {

	DestroyTimer( bj_cineFadeContinueTimer )
	bj_cineFadeContinueTimer = null;
	CinematicFadeCommonBJ( bj_cineFadeContinueRed, bj_cineFadeContinueGreen, bj_cineFadeContinueBlue, bj_cineFadeContinueDuration, bj_cineFadeContinueTex, bj_cineFadeContinueTrans, 100 )

};

//===========================================================================
const ContinueCinematicFadeAfterBJ = ( duration, red, green, blue, trans, tex ) => {

	bj_cineFadeContinueRed = red;
	bj_cineFadeContinueGreen = green;
	bj_cineFadeContinueBlue = blue;
	bj_cineFadeContinueTrans = trans;
	bj_cineFadeContinueDuration = duration;
	bj_cineFadeContinueTex = tex;

	// Create a timer to continue the cinematic fade.
	bj_cineFadeContinueTimer = CreateTimer();
	TimerStart( bj_cineFadeContinueTimer, duration, false, ContinueCinematicFadeBJ )

};

//===========================================================================
const AbortCinematicFadeBJ = () => {

	if ( ( bj_cineFadeContinueTimer != null ) ) {

		DestroyTimer( bj_cineFadeContinueTimer )

	}

	if ( ( bj_cineFadeFinishTimer != null ) ) {

		DestroyTimer( bj_cineFadeFinishTimer )

	}

};

//===========================================================================
const CinematicFadeBJ = ( fadetype, duration, tex, red, green, blue, trans ) => {

	if ( ( fadetype == bj_CINEFADETYPE_FADEOUT ) ) {

		// Fade out to the requested color.
		AbortCinematicFadeBJ()
		CinematicFadeCommonBJ( red, green, blue, duration, tex, 100, trans )

	} else if ( ( fadetype == bj_CINEFADETYPE_FADEIN ) ) {

		// Fade in from the requested color.
		AbortCinematicFadeBJ()
		CinematicFadeCommonBJ( red, green, blue, duration, tex, trans, 100 )
		FinishCinematicFadeAfterBJ( duration )

	} else if ( ( fadetype == bj_CINEFADETYPE_FADEOUTIN ) ) {

		// Fade out to the requested color, and then fade back in from it.

		if ( ( duration > 0 ) ) {

			AbortCinematicFadeBJ()
			CinematicFadeCommonBJ( red, green, blue, duration * 0.5, tex, 100, trans )
			ContinueCinematicFadeAfterBJ( duration * 0.5, red, green, blue, trans, tex )
			FinishCinematicFadeAfterBJ( duration )

		}

	} else {

		// Unrecognized fadetype - ignore the request.

	}

};

//===========================================================================
const CinematicFilterGenericBJ = ( duration, bmode, tex, red0, green0, blue0, trans0, red1, green1, blue1, trans1 ) => {

	AbortCinematicFadeBJ()
	SetCineFilterTexture( tex )
	SetCineFilterBlendMode( bmode )
	SetCineFilterTexMapFlags( TEXMAP_FLAG_NONE )
	SetCineFilterStartUV( 0, 0, 1, 1 )
	SetCineFilterEndUV( 0, 0, 1, 1 )
	SetCineFilterStartColor( PercentTo255( red0 ), PercentTo255( green0 ), PercentTo255( blue0 ), PercentTo255( 100 - trans0 ) )
	SetCineFilterEndColor( PercentTo255( red1 ), PercentTo255( green1 ), PercentTo255( blue1 ), PercentTo255( 100 - trans1 ) )
	SetCineFilterDuration( duration )
	DisplayCineFilter( true )

};

//***************************************************************************
//*
//*  Rescuable Unit Utility Functions
//*
//***************************************************************************

//===========================================================================
// Rescues a unit for a player.  This performs the default rescue behavior,
// including a rescue sound, flashing selection circle, ownership change,
// and optionally a unit color change.
//
const RescueUnitBJ = ( whichUnit, rescuer, changeColor ) => {

	if ( IsUnitDeadBJ( whichUnit ) || ( GetOwningPlayer( whichUnit ) == rescuer ) ) {

		return null

	}

	StartSound( bj_rescueSound )
	SetUnitOwner( whichUnit, rescuer, changeColor )
	UnitAddIndicator( whichUnit, 0, 255, 0, 255 )
	PingMinimapForPlayer( rescuer, GetUnitX( whichUnit ), GetUnitY( whichUnit ), bj_RESCUE_PING_TIME )

};

//===========================================================================
const TriggerActionUnitRescuedBJ = () => {

	let theUnit = GetTriggerUnit();

	if ( IsUnitType( theUnit, UNIT_TYPE_STRUCTURE ) ) {

		RescueUnitBJ( theUnit, GetOwningPlayer( GetRescuer() ), bj_rescueChangeColorBldg )

	} else {

		RescueUnitBJ( theUnit, GetOwningPlayer( GetRescuer() ), bj_rescueChangeColorUnit )

	}

};

//===========================================================================
// Attempt to init triggers for default rescue behavior.  For performance
// reasons, this should only be attempted if a player is set to Rescuable,
// or if a specific unit is thus flagged.
//
const TryInitRescuableTriggersBJ = () => {

	let index;

	if ( ( bj_rescueUnitBehavior == null ) ) {

		bj_rescueUnitBehavior = CreateTrigger();
		index = 0;

		while ( true ) {

			TriggerRegisterPlayerUnitEvent( bj_rescueUnitBehavior, Player( index ), EVENT_PLAYER_UNIT_RESCUED, null )
			index = index + 1;
			if ( index == bj_MAX_PLAYER_SLOTS ) break;

		}

		TriggerAddAction( bj_rescueUnitBehavior, TriggerActionUnitRescuedBJ )

	}

};

//===========================================================================
// Determines whether or not rescued units automatically change color upon
// being rescued.
//
const SetRescueUnitColorChangeBJ = ( changeColor ) => {

	bj_rescueChangeColorUnit = changeColor;

};

//===========================================================================
// Determines whether or not rescued buildings automatically change color
// upon being rescued.
//
const SetRescueBuildingColorChangeBJ = ( changeColor ) => {

	bj_rescueChangeColorBldg = changeColor;

};

//===========================================================================
const MakeUnitRescuableToForceBJEnum = () => {

	TryInitRescuableTriggersBJ()
	SetUnitRescuable( bj_makeUnitRescuableUnit, GetEnumPlayer(), bj_makeUnitRescuableFlag )

};

//===========================================================================
const MakeUnitRescuableToForceBJ = ( whichUnit, isRescuable, whichForce ) => {

	// Flag the unit as rescuable/unrescuable for the appropriate players.
	bj_makeUnitRescuableUnit = whichUnit;
	bj_makeUnitRescuableFlag = isRescuable;
	ForForce( whichForce, MakeUnitRescuableToForceBJEnum )

};

//===========================================================================
const InitRescuableBehaviorBJ = () => {

	let index;

	index = 0;

	while ( true ) {

		// If at least one player slot is "Rescuable"-controlled, init the
		// rescue behavior triggers.

		if ( ( GetPlayerController( Player( index ) ) == MAP_CONTROL_RESCUABLE ) ) {

			TryInitRescuableTriggersBJ()
			return null

		}

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

};

//***************************************************************************
//*
//*  Research and Upgrade Utility Functions
//*
//***************************************************************************

//===========================================================================
const SetPlayerTechResearchedSwap = ( techid, levels, whichPlayer ) => {

	SetPlayerTechResearched( whichPlayer, techid, levels )

};

//===========================================================================
const SetPlayerTechMaxAllowedSwap = ( techid, maximum, whichPlayer ) => {

	SetPlayerTechMaxAllowed( whichPlayer, techid, maximum )

};

//===========================================================================
const SetPlayerMaxHeroesAllowed = ( maximum, whichPlayer ) => {

	SetPlayerTechMaxAllowed( whichPlayer, "HERO", maximum )

};

//===========================================================================
const GetPlayerTechCountSimple = ( techid, whichPlayer ) => {

	return GetPlayerTechCount( whichPlayer, techid, true )

};

//===========================================================================
const GetPlayerTechMaxAllowedSwap = ( techid, whichPlayer ) => {

	return GetPlayerTechMaxAllowed( whichPlayer, techid )

};

//===========================================================================
const SetPlayerAbilityAvailableBJ = ( avail, abilid, whichPlayer ) => {

	SetPlayerAbilityAvailable( whichPlayer, abilid, avail )

};

//***************************************************************************
//*
//*  Campaign Utility Functions
//*
//***************************************************************************

const SetCampaignMenuRaceBJ = ( campaignNumber ) => {

	if ( ( campaignNumber == bj_CAMPAIGN_INDEX_T ) ) {

		SetCampaignMenuRace( RACE_OTHER )

	} else if ( ( campaignNumber == bj_CAMPAIGN_INDEX_H ) ) {

		SetCampaignMenuRace( RACE_HUMAN )

	} else if ( ( campaignNumber == bj_CAMPAIGN_INDEX_U ) ) {

		SetCampaignMenuRace( RACE_UNDEAD )

	} else if ( ( campaignNumber == bj_CAMPAIGN_INDEX_O ) ) {

		SetCampaignMenuRace( RACE_ORC )

	} else if ( ( campaignNumber == bj_CAMPAIGN_INDEX_N ) ) {

		SetCampaignMenuRace( RACE_NIGHTELF )

	} else if ( ( campaignNumber == bj_CAMPAIGN_INDEX_XN ) ) {

		SetCampaignMenuRaceEx( bj_CAMPAIGN_OFFSET_XN )

	} else if ( ( campaignNumber == bj_CAMPAIGN_INDEX_XH ) ) {

		SetCampaignMenuRaceEx( bj_CAMPAIGN_OFFSET_XH )

	} else if ( ( campaignNumber == bj_CAMPAIGN_INDEX_XU ) ) {

		SetCampaignMenuRaceEx( bj_CAMPAIGN_OFFSET_XU )

	} else if ( ( campaignNumber == bj_CAMPAIGN_INDEX_XO ) ) {

		SetCampaignMenuRaceEx( bj_CAMPAIGN_OFFSET_XO )

	} else {

		// Unrecognized campaign - ignore the request

	}

};

//===========================================================================
// Converts a single campaign mission designation into campaign and mission
// numbers.  The 1000's digit is considered the campaign index, and the 1's
// digit is considered the mission index within that campaign.  This is done
// so that the trigger for this can use a single drop-down to list all of
// the campaign missions.
//
const SetMissionAvailableBJ = ( available, missionIndex ) => {

	let campaignNumber = missionIndex / 1000;
	let missionNumber = missionIndex - campaignNumber * 1000;

	SetMissionAvailable( campaignNumber, missionNumber, available )

};

//===========================================================================
const SetCampaignAvailableBJ = ( available, campaignNumber ) => {

	let campaignOffset;

	if ( ( campaignNumber == bj_CAMPAIGN_INDEX_H ) ) {

		SetTutorialCleared( true )

	}

	if ( ( campaignNumber == bj_CAMPAIGN_INDEX_XN ) ) {

		campaignOffset = bj_CAMPAIGN_OFFSET_XN;

	} else if ( ( campaignNumber == bj_CAMPAIGN_INDEX_XH ) ) {

		campaignOffset = bj_CAMPAIGN_OFFSET_XH;

	} else if ( ( campaignNumber == bj_CAMPAIGN_INDEX_XU ) ) {

		campaignOffset = bj_CAMPAIGN_OFFSET_XU;

	} else if ( ( campaignNumber == bj_CAMPAIGN_INDEX_XO ) ) {

		campaignOffset = bj_CAMPAIGN_OFFSET_XO;

	} else {

		campaignOffset = campaignNumber;

	}

	SetCampaignAvailable( campaignOffset, available )
	SetCampaignMenuRaceBJ( campaignNumber )
	ForceCampaignSelectScreen()

};

//===========================================================================
const SetCinematicAvailableBJ = ( available, cinematicIndex ) => {

	if ( ( cinematicIndex == bj_CINEMATICINDEX_TOP ) ) {

		SetOpCinematicAvailable( bj_CAMPAIGN_INDEX_T, available )
		PlayCinematic( "TutorialOp" )

	} else if ( ( cinematicIndex == bj_CINEMATICINDEX_HOP ) ) {

		SetOpCinematicAvailable( bj_CAMPAIGN_INDEX_H, available )
		PlayCinematic( "HumanOp" )

	} else if ( ( cinematicIndex == bj_CINEMATICINDEX_HED ) ) {

		SetEdCinematicAvailable( bj_CAMPAIGN_INDEX_H, available )
		PlayCinematic( "HumanEd" )

	} else if ( ( cinematicIndex == bj_CINEMATICINDEX_OOP ) ) {

		SetOpCinematicAvailable( bj_CAMPAIGN_INDEX_O, available )
		PlayCinematic( "OrcOp" )

	} else if ( ( cinematicIndex == bj_CINEMATICINDEX_OED ) ) {

		SetEdCinematicAvailable( bj_CAMPAIGN_INDEX_O, available )
		PlayCinematic( "OrcEd" )

	} else if ( ( cinematicIndex == bj_CINEMATICINDEX_UOP ) ) {

		SetEdCinematicAvailable( bj_CAMPAIGN_INDEX_U, available )
		PlayCinematic( "UndeadOp" )

	} else if ( ( cinematicIndex == bj_CINEMATICINDEX_UED ) ) {

		SetEdCinematicAvailable( bj_CAMPAIGN_INDEX_U, available )
		PlayCinematic( "UndeadEd" )

	} else if ( ( cinematicIndex == bj_CINEMATICINDEX_NOP ) ) {

		SetEdCinematicAvailable( bj_CAMPAIGN_INDEX_N, available )
		PlayCinematic( "NightElfOp" )

	} else if ( ( cinematicIndex == bj_CINEMATICINDEX_NED ) ) {

		SetEdCinematicAvailable( bj_CAMPAIGN_INDEX_N, available )
		PlayCinematic( "NightElfEd" )

	} else if ( ( cinematicIndex == bj_CINEMATICINDEX_XOP ) ) {

		SetOpCinematicAvailable( bj_CAMPAIGN_OFFSET_XN, available )
		PlayCinematic( "IntroX" )

	} else if ( ( cinematicIndex == bj_CINEMATICINDEX_XED ) ) {

		SetEdCinematicAvailable( bj_CAMPAIGN_OFFSET_XU, available )
		PlayCinematic( "OutroX" )

	} else {

		// Unrecognized cinematic - ignore the request.

	}

};

//===========================================================================
const InitGameCacheBJ = ( campaignFile ) => {

	bj_lastCreatedGameCache = InitGameCache( campaignFile );
	return bj_lastCreatedGameCache

};

//===========================================================================
const SaveGameCacheBJ = ( cache ) => {

	return SaveGameCache( cache )

};

//===========================================================================
const GetLastCreatedGameCacheBJ = () => {

	return bj_lastCreatedGameCache

};

//===========================================================================
const InitHashtableBJ = () => {

	bj_lastCreatedHashtable = InitHashtable();
	return bj_lastCreatedHashtable

};

//===========================================================================
const GetLastCreatedHashtableBJ = () => {

	return bj_lastCreatedHashtable

};

//===========================================================================
const StoreRealBJ = ( value, key, missionKey, cache ) => {

	StoreReal( cache, missionKey, key, value )

};

//===========================================================================
const StoreIntegerBJ = ( value, key, missionKey, cache ) => {

	StoreInteger( cache, missionKey, key, value )

};

//===========================================================================
const StoreBooleanBJ = ( value, key, missionKey, cache ) => {

	StoreBoolean( cache, missionKey, key, value )

};

//===========================================================================
const StoreStringBJ = ( value, key, missionKey, cache ) => {

	return StoreString( cache, missionKey, key, value )

};

//===========================================================================
const StoreUnitBJ = ( whichUnit, key, missionKey, cache ) => {

	return StoreUnit( cache, missionKey, key, whichUnit )

};

//===========================================================================
const SaveRealBJ = ( value, key, missionKey, table ) => {

	SaveReal( table, missionKey, key, value )

};

//===========================================================================
const SaveIntegerBJ = ( value, key, missionKey, table ) => {

	SaveInteger( table, missionKey, key, value )

};

//===========================================================================
const SaveBooleanBJ = ( value, key, missionKey, table ) => {

	SaveBoolean( table, missionKey, key, value )

};

//===========================================================================
const SaveStringBJ = ( value, key, missionKey, table ) => {

	return SaveStr( table, missionKey, key, value )

};

//===========================================================================
const SavePlayerHandleBJ = ( whichPlayer, key, missionKey, table ) => {

	return SavePlayerHandle( table, missionKey, key, whichPlayer )

};

//===========================================================================
const SaveWidgetHandleBJ = ( whichWidget, key, missionKey, table ) => {

	return SaveWidgetHandle( table, missionKey, key, whichWidget )

};

//===========================================================================
const SaveDestructableHandleBJ = ( whichDestructable, key, missionKey, table ) => {

	return SaveDestructableHandle( table, missionKey, key, whichDestructable )

};

//===========================================================================
const SaveItemHandleBJ = ( whichItem, key, missionKey, table ) => {

	return SaveItemHandle( table, missionKey, key, whichItem )

};

//===========================================================================
const SaveUnitHandleBJ = ( whichUnit, key, missionKey, table ) => {

	return SaveUnitHandle( table, missionKey, key, whichUnit )

};

//===========================================================================
const SaveAbilityHandleBJ = ( whichAbility, key, missionKey, table ) => {

	return SaveAbilityHandle( table, missionKey, key, whichAbility )

};

//===========================================================================
const SaveTimerHandleBJ = ( whichTimer, key, missionKey, table ) => {

	return SaveTimerHandle( table, missionKey, key, whichTimer )

};

//===========================================================================
const SaveTriggerHandleBJ = ( whichTrigger, key, missionKey, table ) => {

	return SaveTriggerHandle( table, missionKey, key, whichTrigger )

};

//===========================================================================
const SaveTriggerConditionHandleBJ = ( whichTriggercondition, key, missionKey, table ) => {

	return SaveTriggerConditionHandle( table, missionKey, key, whichTriggercondition )

};

//===========================================================================
const SaveTriggerActionHandleBJ = ( whichTriggeraction, key, missionKey, table ) => {

	return SaveTriggerActionHandle( table, missionKey, key, whichTriggeraction )

};

//===========================================================================
const SaveTriggerEventHandleBJ = ( whichEvent, key, missionKey, table ) => {

	return SaveTriggerEventHandle( table, missionKey, key, whichEvent )

};

//===========================================================================
const SaveForceHandleBJ = ( whichForce, key, missionKey, table ) => {

	return SaveForceHandle( table, missionKey, key, whichForce )

};

//===========================================================================
const SaveGroupHandleBJ = ( whichGroup, key, missionKey, table ) => {

	return SaveGroupHandle( table, missionKey, key, whichGroup )

};

//===========================================================================
const SaveLocationHandleBJ = ( whichLocation, key, missionKey, table ) => {

	return SaveLocationHandle( table, missionKey, key, whichLocation )

};

//===========================================================================
const SaveRectHandleBJ = ( whichRect, key, missionKey, table ) => {

	return SaveRectHandle( table, missionKey, key, whichRect )

};

//===========================================================================
const SaveBooleanExprHandleBJ = ( whichBoolexpr, key, missionKey, table ) => {

	return SaveBooleanExprHandle( table, missionKey, key, whichBoolexpr )

};

//===========================================================================
const SaveSoundHandleBJ = ( whichSound, key, missionKey, table ) => {

	return SaveSoundHandle( table, missionKey, key, whichSound )

};

//===========================================================================
const SaveEffectHandleBJ = ( whichEffect, key, missionKey, table ) => {

	return SaveEffectHandle( table, missionKey, key, whichEffect )

};

//===========================================================================
const SaveUnitPoolHandleBJ = ( whichUnitpool, key, missionKey, table ) => {

	return SaveUnitPoolHandle( table, missionKey, key, whichUnitpool )

};

//===========================================================================
const SaveItemPoolHandleBJ = ( whichItempool, key, missionKey, table ) => {

	return SaveItemPoolHandle( table, missionKey, key, whichItempool )

};

//===========================================================================
const SaveQuestHandleBJ = ( whichQuest, key, missionKey, table ) => {

	return SaveQuestHandle( table, missionKey, key, whichQuest )

};

//===========================================================================
const SaveQuestItemHandleBJ = ( whichQuestitem, key, missionKey, table ) => {

	return SaveQuestItemHandle( table, missionKey, key, whichQuestitem )

};

//===========================================================================
const SaveDefeatConditionHandleBJ = ( whichDefeatcondition, key, missionKey, table ) => {

	return SaveDefeatConditionHandle( table, missionKey, key, whichDefeatcondition )

};

//===========================================================================
const SaveTimerDialogHandleBJ = ( whichTimerdialog, key, missionKey, table ) => {

	return SaveTimerDialogHandle( table, missionKey, key, whichTimerdialog )

};

//===========================================================================
const SaveLeaderboardHandleBJ = ( whichLeaderboard, key, missionKey, table ) => {

	return SaveLeaderboardHandle( table, missionKey, key, whichLeaderboard )

};

//===========================================================================
const SaveMultiboardHandleBJ = ( whichMultiboard, key, missionKey, table ) => {

	return SaveMultiboardHandle( table, missionKey, key, whichMultiboard )

};

//===========================================================================
const SaveMultiboardItemHandleBJ = ( whichMultiboarditem, key, missionKey, table ) => {

	return SaveMultiboardItemHandle( table, missionKey, key, whichMultiboarditem )

};

//===========================================================================
const SaveTrackableHandleBJ = ( whichTrackable, key, missionKey, table ) => {

	return SaveTrackableHandle( table, missionKey, key, whichTrackable )

};

//===========================================================================
const SaveDialogHandleBJ = ( whichDialog, key, missionKey, table ) => {

	return SaveDialogHandle( table, missionKey, key, whichDialog )

};

//===========================================================================
const SaveButtonHandleBJ = ( whichButton, key, missionKey, table ) => {

	return SaveButtonHandle( table, missionKey, key, whichButton )

};

//===========================================================================
const SaveTextTagHandleBJ = ( whichTexttag, key, missionKey, table ) => {

	return SaveTextTagHandle( table, missionKey, key, whichTexttag )

};

//===========================================================================
const SaveLightningHandleBJ = ( whichLightning, key, missionKey, table ) => {

	return SaveLightningHandle( table, missionKey, key, whichLightning )

};

//===========================================================================
const SaveImageHandleBJ = ( whichImage, key, missionKey, table ) => {

	return SaveImageHandle( table, missionKey, key, whichImage )

};

//===========================================================================
const SaveUbersplatHandleBJ = ( whichUbersplat, key, missionKey, table ) => {

	return SaveUbersplatHandle( table, missionKey, key, whichUbersplat )

};

//===========================================================================
const SaveRegionHandleBJ = ( whichRegion, key, missionKey, table ) => {

	return SaveRegionHandle( table, missionKey, key, whichRegion )

};

//===========================================================================
const SaveFogStateHandleBJ = ( whichFogState, key, missionKey, table ) => {

	return SaveFogStateHandle( table, missionKey, key, whichFogState )

};

//===========================================================================
const SaveFogModifierHandleBJ = ( whichFogModifier, key, missionKey, table ) => {

	return SaveFogModifierHandle( table, missionKey, key, whichFogModifier )

};

//===========================================================================
const SaveAgentHandleBJ = ( whichAgent, key, missionKey, table ) => {

	return SaveAgentHandle( table, missionKey, key, whichAgent )

};

//===========================================================================
const SaveHashtableHandleBJ = ( whichHashtable, key, missionKey, table ) => {

	return SaveHashtableHandle( table, missionKey, key, whichHashtable )

};

//===========================================================================
const GetStoredRealBJ = ( key, missionKey, cache ) => {

	//call SyncStoredReal(cache, missionKey, key)
	return GetStoredReal( cache, missionKey, key )

};

//===========================================================================
const GetStoredIntegerBJ = ( key, missionKey, cache ) => {

	//call SyncStoredInteger(cache, missionKey, key)
	return GetStoredInteger( cache, missionKey, key )

};

//===========================================================================
const GetStoredBooleanBJ = ( key, missionKey, cache ) => {

	//call SyncStoredBoolean(cache, missionKey, key)
	return GetStoredBoolean( cache, missionKey, key )

};

//===========================================================================
const GetStoredStringBJ = ( key, missionKey, cache ) => {

	let s;

	//call SyncStoredString(cache, missionKey, key)
	s = GetStoredString( cache, missionKey, key );

	if ( ( s == null ) ) {

		return ""

	} else {

		return s

	}

};

//===========================================================================
const LoadRealBJ = ( key, missionKey, table ) => {

	//call SyncStoredReal(table, missionKey, key)
	return LoadReal( table, missionKey, key )

};

//===========================================================================
const LoadIntegerBJ = ( key, missionKey, table ) => {

	//call SyncStoredInteger(table, missionKey, key)
	return LoadInteger( table, missionKey, key )

};

//===========================================================================
const LoadBooleanBJ = ( key, missionKey, table ) => {

	//call SyncStoredBoolean(table, missionKey, key)
	return LoadBoolean( table, missionKey, key )

};

//===========================================================================
const LoadStringBJ = ( key, missionKey, table ) => {

	let s;

	//call SyncStoredString(table, missionKey, key)
	s = LoadStr( table, missionKey, key );

	if ( ( s == null ) ) {

		return ""

	} else {

		return s

	}

};

//===========================================================================
const LoadPlayerHandleBJ = ( key, missionKey, table ) => {

	return LoadPlayerHandle( table, missionKey, key )

};

//===========================================================================
const LoadWidgetHandleBJ = ( key, missionKey, table ) => {

	return LoadWidgetHandle( table, missionKey, key )

};

//===========================================================================
const LoadDestructableHandleBJ = ( key, missionKey, table ) => {

	return LoadDestructableHandle( table, missionKey, key )

};

//===========================================================================
const LoadItemHandleBJ = ( key, missionKey, table ) => {

	return LoadItemHandle( table, missionKey, key )

};

//===========================================================================
const LoadUnitHandleBJ = ( key, missionKey, table ) => {

	return LoadUnitHandle( table, missionKey, key )

};

//===========================================================================
const LoadAbilityHandleBJ = ( key, missionKey, table ) => {

	return LoadAbilityHandle( table, missionKey, key )

};

//===========================================================================
const LoadTimerHandleBJ = ( key, missionKey, table ) => {

	return LoadTimerHandle( table, missionKey, key )

};

//===========================================================================
const LoadTriggerHandleBJ = ( key, missionKey, table ) => {

	return LoadTriggerHandle( table, missionKey, key )

};

//===========================================================================
const LoadTriggerConditionHandleBJ = ( key, missionKey, table ) => {

	return LoadTriggerConditionHandle( table, missionKey, key )

};

//===========================================================================
const LoadTriggerActionHandleBJ = ( key, missionKey, table ) => {

	return LoadTriggerActionHandle( table, missionKey, key )

};

//===========================================================================
const LoadTriggerEventHandleBJ = ( key, missionKey, table ) => {

	return LoadTriggerEventHandle( table, missionKey, key )

};

//===========================================================================
const LoadForceHandleBJ = ( key, missionKey, table ) => {

	return LoadForceHandle( table, missionKey, key )

};

//===========================================================================
const LoadGroupHandleBJ = ( key, missionKey, table ) => {

	return LoadGroupHandle( table, missionKey, key )

};

//===========================================================================
const LoadLocationHandleBJ = ( key, missionKey, table ) => {

	return LoadLocationHandle( table, missionKey, key )

};

//===========================================================================
const LoadRectHandleBJ = ( key, missionKey, table ) => {

	return LoadRectHandle( table, missionKey, key )

};

//===========================================================================
const LoadBooleanExprHandleBJ = ( key, missionKey, table ) => {

	return LoadBooleanExprHandle( table, missionKey, key )

};

//===========================================================================
const LoadSoundHandleBJ = ( key, missionKey, table ) => {

	return LoadSoundHandle( table, missionKey, key )

};

//===========================================================================
const LoadEffectHandleBJ = ( key, missionKey, table ) => {

	return LoadEffectHandle( table, missionKey, key )

};

//===========================================================================
const LoadUnitPoolHandleBJ = ( key, missionKey, table ) => {

	return LoadUnitPoolHandle( table, missionKey, key )

};

//===========================================================================
const LoadItemPoolHandleBJ = ( key, missionKey, table ) => {

	return LoadItemPoolHandle( table, missionKey, key )

};

//===========================================================================
const LoadQuestHandleBJ = ( key, missionKey, table ) => {

	return LoadQuestHandle( table, missionKey, key )

};

//===========================================================================
const LoadQuestItemHandleBJ = ( key, missionKey, table ) => {

	return LoadQuestItemHandle( table, missionKey, key )

};

//===========================================================================
const LoadDefeatConditionHandleBJ = ( key, missionKey, table ) => {

	return LoadDefeatConditionHandle( table, missionKey, key )

};

//===========================================================================
const LoadTimerDialogHandleBJ = ( key, missionKey, table ) => {

	return LoadTimerDialogHandle( table, missionKey, key )

};

//===========================================================================
const LoadLeaderboardHandleBJ = ( key, missionKey, table ) => {

	return LoadLeaderboardHandle( table, missionKey, key )

};

//===========================================================================
const LoadMultiboardHandleBJ = ( key, missionKey, table ) => {

	return LoadMultiboardHandle( table, missionKey, key )

};

//===========================================================================
const LoadMultiboardItemHandleBJ = ( key, missionKey, table ) => {

	return LoadMultiboardItemHandle( table, missionKey, key )

};

//===========================================================================
const LoadTrackableHandleBJ = ( key, missionKey, table ) => {

	return LoadTrackableHandle( table, missionKey, key )

};

//===========================================================================
const LoadDialogHandleBJ = ( key, missionKey, table ) => {

	return LoadDialogHandle( table, missionKey, key )

};

//===========================================================================
const LoadButtonHandleBJ = ( key, missionKey, table ) => {

	return LoadButtonHandle( table, missionKey, key )

};

//===========================================================================
const LoadTextTagHandleBJ = ( key, missionKey, table ) => {

	return LoadTextTagHandle( table, missionKey, key )

};

//===========================================================================
const LoadLightningHandleBJ = ( key, missionKey, table ) => {

	return LoadLightningHandle( table, missionKey, key )

};

//===========================================================================
const LoadImageHandleBJ = ( key, missionKey, table ) => {

	return LoadImageHandle( table, missionKey, key )

};

//===========================================================================
const LoadUbersplatHandleBJ = ( key, missionKey, table ) => {

	return LoadUbersplatHandle( table, missionKey, key )

};

//===========================================================================
const LoadRegionHandleBJ = ( key, missionKey, table ) => {

	return LoadRegionHandle( table, missionKey, key )

};

//===========================================================================
const LoadFogStateHandleBJ = ( key, missionKey, table ) => {

	return LoadFogStateHandle( table, missionKey, key )

};

//===========================================================================
const LoadFogModifierHandleBJ = ( key, missionKey, table ) => {

	return LoadFogModifierHandle( table, missionKey, key )

};

//===========================================================================
const LoadHashtableHandleBJ = ( key, missionKey, table ) => {

	return LoadHashtableHandle( table, missionKey, key )

};

//===========================================================================
const RestoreUnitLocFacingAngleBJ = ( key, missionKey, cache, forWhichPlayer, loc, facing ) => {

	//call SyncStoredUnit(cache, missionKey, key)
	bj_lastLoadedUnit = RestoreUnit( cache, missionKey, key, forWhichPlayer, GetLocationX( loc ), GetLocationY( loc ), facing );
	return bj_lastLoadedUnit

};

//===========================================================================
const RestoreUnitLocFacingPointBJ = ( key, missionKey, cache, forWhichPlayer, loc, lookAt ) => {

	//call SyncStoredUnit(cache, missionKey, key)
	return RestoreUnitLocFacingAngleBJ( key, missionKey, cache, forWhichPlayer, loc, AngleBetweenPoints( loc, lookAt ) )

};

//===========================================================================
const GetLastRestoredUnitBJ = () => {

	return bj_lastLoadedUnit

};

//===========================================================================
const FlushGameCacheBJ = ( cache ) => {

	FlushGameCache( cache )

};

//===========================================================================
const FlushStoredMissionBJ = ( missionKey, cache ) => {

	FlushStoredMission( cache, missionKey )

};

//===========================================================================
const FlushParentHashtableBJ = ( table ) => {

	FlushParentHashtable( table )

};

//===========================================================================
const FlushChildHashtableBJ = ( missionKey, table ) => {

	FlushChildHashtable( table, missionKey )

};

//===========================================================================
const HaveStoredValue = ( key, valueType, missionKey, cache ) => {

	if ( ( valueType == bj_GAMECACHE_BOOLEAN ) ) {

		return HaveStoredBoolean( cache, missionKey, key )

	} else if ( ( valueType == bj_GAMECACHE_INTEGER ) ) {

		return HaveStoredInteger( cache, missionKey, key )

	} else if ( ( valueType == bj_GAMECACHE_REAL ) ) {

		return HaveStoredReal( cache, missionKey, key )

	} else if ( ( valueType == bj_GAMECACHE_UNIT ) ) {

		return HaveStoredUnit( cache, missionKey, key )

	} else if ( ( valueType == bj_GAMECACHE_STRING ) ) {

		return HaveStoredString( cache, missionKey, key )

	} else {

		// Unrecognized value type - ignore the request.
		return false

	}

};

//===========================================================================
const HaveSavedValue = ( key, valueType, missionKey, table ) => {

	if ( ( valueType == bj_HASHTABLE_BOOLEAN ) ) {

		return HaveSavedBoolean( table, missionKey, key )

	} else if ( ( valueType == bj_HASHTABLE_INTEGER ) ) {

		return HaveSavedInteger( table, missionKey, key )

	} else if ( ( valueType == bj_HASHTABLE_REAL ) ) {

		return HaveSavedReal( table, missionKey, key )

	} else if ( ( valueType == bj_HASHTABLE_STRING ) ) {

		return HaveSavedString( table, missionKey, key )

	} else if ( ( valueType == bj_HASHTABLE_HANDLE ) ) {

		return HaveSavedHandle( table, missionKey, key )

	} else {

		// Unrecognized value type - ignore the request.
		return false

	}

};

//===========================================================================
const ShowCustomCampaignButton = ( show, whichButton ) => {

	SetCustomCampaignButtonVisible( whichButton - 1, show )

};

//===========================================================================
const IsCustomCampaignButtonVisibile = ( whichButton ) => {

	return GetCustomCampaignButtonVisible( whichButton - 1 )

};

//===========================================================================
const LoadGameBJ = ( loadFileName, doScoreScreen ) => {

	LoadGame( loadFileName, doScoreScreen )

};

//===========================================================================
const SaveAndChangeLevelBJ = ( saveFileName, newLevel, doScoreScreen ) => {

	SaveGame( saveFileName )
	ChangeLevel( newLevel, doScoreScreen )

};

//===========================================================================
const SaveAndLoadGameBJ = ( saveFileName, loadFileName, doScoreScreen ) => {

	SaveGame( saveFileName )
	LoadGame( loadFileName, doScoreScreen )

};

//===========================================================================
const RenameSaveDirectoryBJ = ( sourceDirName, destDirName ) => {

	return RenameSaveDirectory( sourceDirName, destDirName )

};

//===========================================================================
const RemoveSaveDirectoryBJ = ( sourceDirName ) => {

	return RemoveSaveDirectory( sourceDirName )

};

//===========================================================================
const CopySaveGameBJ = ( sourceSaveName, destSaveName ) => {

	return CopySaveGame( sourceSaveName, destSaveName )

};

//***************************************************************************
//*
//*  Miscellaneous Utility Functions
//*
//***************************************************************************

//===========================================================================
const GetPlayerStartLocationX = ( whichPlayer ) => {

	return GetStartLocationX( GetPlayerStartLocation( whichPlayer ) )

};

//===========================================================================
const GetPlayerStartLocationY = ( whichPlayer ) => {

	return GetStartLocationY( GetPlayerStartLocation( whichPlayer ) )

};

//===========================================================================
const GetPlayerStartLocationLoc = ( whichPlayer ) => {

	return GetStartLocationLoc( GetPlayerStartLocation( whichPlayer ) )

};

//===========================================================================
const GetRectCenter = ( whichRect ) => {

	return Location( GetRectCenterX( whichRect ), GetRectCenterY( whichRect ) )

};

//===========================================================================
const IsPlayerSlotState = ( whichPlayer, whichState ) => {

	return GetPlayerSlotState( whichPlayer ) == whichState

};

//===========================================================================
const GetFadeFromSeconds = ( seconds ) => {

	if ( ( seconds != 0 ) ) {

		return 128 / R2I( seconds )

	}

	return 10000

};

//===========================================================================
const GetFadeFromSecondsAsReal = ( seconds ) => {

	if ( ( seconds != 0 ) ) {

		return 128 / seconds

	}

	return 10000

};

//===========================================================================
const AdjustPlayerStateSimpleBJ = ( whichPlayer, whichPlayerState, delta ) => {

	SetPlayerState( whichPlayer, whichPlayerState, GetPlayerState( whichPlayer, whichPlayerState ) + delta )

};

//===========================================================================
const AdjustPlayerStateBJ = ( delta, whichPlayer, whichPlayerState ) => {

	// If the change was positive, apply the difference to the player's
	// gathered resources property as well.

	if ( ( delta > 0 ) ) {

		if ( ( whichPlayerState == PLAYER_STATE_RESOURCE_GOLD ) ) {

			AdjustPlayerStateSimpleBJ( whichPlayer, PLAYER_STATE_GOLD_GATHERED, delta )

		} else if ( ( whichPlayerState == PLAYER_STATE_RESOURCE_LUMBER ) ) {

			AdjustPlayerStateSimpleBJ( whichPlayer, PLAYER_STATE_LUMBER_GATHERED, delta )

		}

	}

	AdjustPlayerStateSimpleBJ( whichPlayer, whichPlayerState, delta )

};

//===========================================================================
const SetPlayerStateBJ = ( whichPlayer, whichPlayerState, value ) => {

	let oldValue = GetPlayerState( whichPlayer, whichPlayerState );
	AdjustPlayerStateBJ( value - oldValue, whichPlayer, whichPlayerState )

};

//===========================================================================
const SetPlayerFlagBJ = ( whichPlayerFlag, flag, whichPlayer ) => {

	SetPlayerState( whichPlayer, whichPlayerFlag, IntegerTertiaryOp( flag, 1, 0 ) )

};

//===========================================================================
const SetPlayerTaxRateBJ = ( rate, whichResource, sourcePlayer, otherPlayer ) => {

	SetPlayerTaxRate( sourcePlayer, otherPlayer, whichResource, rate )

};

//===========================================================================
const GetPlayerTaxRateBJ = ( whichResource, sourcePlayer, otherPlayer ) => {

	return GetPlayerTaxRate( sourcePlayer, otherPlayer, whichResource )

};

//===========================================================================
const IsPlayerFlagSetBJ = ( whichPlayerFlag, whichPlayer ) => {

	return GetPlayerState( whichPlayer, whichPlayerFlag ) == 1

};

//===========================================================================
const AddResourceAmountBJ = ( delta, whichUnit ) => {

	AddResourceAmount( whichUnit, delta )

};

//===========================================================================
const GetConvertedPlayerId = ( whichPlayer ) => {

	return GetPlayerId( whichPlayer ) + 1

};

//===========================================================================
const ConvertedPlayer = ( convertedPlayerId ) => {

	return Player( convertedPlayerId - 1 )

};

//===========================================================================
const GetRectWidthBJ = ( r ) => {

	return GetRectMaxX( r ) - GetRectMinX( r )

};

//===========================================================================
const GetRectHeightBJ = ( r ) => {

	return GetRectMaxY( r ) - GetRectMinY( r )

};

//===========================================================================
// Replaces a gold mine with a blighted gold mine for the given player.
//
const BlightGoldMineForPlayerBJ = ( goldMine, whichPlayer ) => {

	let mineX;
	let mineY;
	let mineGold;
	let newMine;

	// Make sure we're replacing a Gold Mine and not some other type of unit.

	if ( GetUnitTypeId( goldMine ) != "ngol" ) {

		return null

	}

	// Save the Gold Mine's properties and remove it.
	mineX = GetUnitX( goldMine );
	mineY = GetUnitY( goldMine );
	mineGold = GetResourceAmount( goldMine );
	RemoveUnit( goldMine )

	// Create a Haunted Gold Mine to replace the Gold Mine.
	newMine = CreateBlightedGoldmine( whichPlayer, mineX, mineY, bj_UNIT_FACING );
	SetResourceAmount( newMine, mineGold )
	return newMine

};

//===========================================================================
const BlightGoldMineForPlayer = ( goldMine, whichPlayer ) => {

	bj_lastHauntedGoldMine = BlightGoldMineForPlayerBJ( goldMine, whichPlayer );
	return bj_lastHauntedGoldMine

};

//===========================================================================
const GetLastHauntedGoldMine = () => {

	return bj_lastHauntedGoldMine

};

//===========================================================================
const IsPointBlightedBJ = ( where ) => {

	return IsPointBlighted( GetLocationX( where ), GetLocationY( where ) )

};

//===========================================================================
const SetPlayerColorBJEnum = () => {

	SetUnitColor( GetEnumUnit(), bj_setPlayerTargetColor )

};

//===========================================================================
const SetPlayerColorBJ = ( whichPlayer, color, changeExisting ) => {

	let g;

	SetPlayerColor( whichPlayer, color )

	if ( changeExisting ) {

		bj_setPlayerTargetColor = color;
		g = CreateGroup();
		GroupEnumUnitsOfPlayer( g, whichPlayer, null )
		ForGroup( g, SetPlayerColorBJEnum )
		DestroyGroup( g )

	}

};

//===========================================================================
const SetPlayerUnitAvailableBJ = ( unitId, allowed, whichPlayer ) => {

	if ( allowed ) {

		SetPlayerTechMaxAllowed( whichPlayer, unitId, - 1 )

	} else {

		SetPlayerTechMaxAllowed( whichPlayer, unitId, 0 )

	}

};

//===========================================================================
const LockGameSpeedBJ = () => {

	SetMapFlag( MAP_LOCK_SPEED, true )

};

//===========================================================================
const UnlockGameSpeedBJ = () => {

	SetMapFlag( MAP_LOCK_SPEED, false )

};

//===========================================================================
const IssueTargetOrderBJ = ( whichUnit, order, targetWidget ) => {

	return IssueTargetOrder( whichUnit, order, targetWidget )

};

//===========================================================================
const IssuePointOrderLocBJ = ( whichUnit, order, whichLocation ) => {

	return IssuePointOrderLoc( whichUnit, order, whichLocation )

};

//===========================================================================
// Two distinct trigger actions can't share the same function name, so this
// dummy function simply mimics the behavior of an existing call.
//
const IssueTargetDestructableOrder = ( whichUnit, order, targetWidget ) => {

	return IssueTargetOrder( whichUnit, order, targetWidget )

};

const IssueTargetItemOrder = ( whichUnit, order, targetWidget ) => {

	return IssueTargetOrder( whichUnit, order, targetWidget )

};

//===========================================================================
const IssueImmediateOrderBJ = ( whichUnit, order ) => {

	return IssueImmediateOrder( whichUnit, order )

};

//===========================================================================
const GroupTargetOrderBJ = ( whichGroup, order, targetWidget ) => {

	return GroupTargetOrder( whichGroup, order, targetWidget )

};

//===========================================================================
const GroupPointOrderLocBJ = ( whichGroup, order, whichLocation ) => {

	return GroupPointOrderLoc( whichGroup, order, whichLocation )

};

//===========================================================================
const GroupImmediateOrderBJ = ( whichGroup, order ) => {

	return GroupImmediateOrder( whichGroup, order )

};

//===========================================================================
// Two distinct trigger actions can't share the same function name, so this
// dummy function simply mimics the behavior of an existing call.
//
const GroupTargetDestructableOrder = ( whichGroup, order, targetWidget ) => {

	return GroupTargetOrder( whichGroup, order, targetWidget )

};

const GroupTargetItemOrder = ( whichGroup, order, targetWidget ) => {

	return GroupTargetOrder( whichGroup, order, targetWidget )

};

//===========================================================================
const GetDyingDestructable = () => {

	return GetTriggerDestructable()

};

//===========================================================================
// Rally point setting
//
const SetUnitRallyPoint = ( whichUnit, targPos ) => {

	IssuePointOrderLocBJ( whichUnit, "setrally", targPos )

};

//===========================================================================
const SetUnitRallyUnit = ( whichUnit, targUnit ) => {

	IssueTargetOrder( whichUnit, "setrally", targUnit )

};

//===========================================================================
const SetUnitRallyDestructable = ( whichUnit, targDest ) => {

	IssueTargetOrder( whichUnit, "setrally", targDest )

};

//===========================================================================
// Utility function for use by editor-generated item drop table triggers.
// This function is added as an action to all destructable drop triggers,
// so that a widget drop may be differentiated from a unit drop.
//
const SaveDyingWidget = () => {

	bj_lastDyingWidget = GetTriggerWidget();

};

//===========================================================================
const SetBlightRectBJ = ( addBlight, whichPlayer, r ) => {

	SetBlightRect( whichPlayer, r, addBlight )

};

//===========================================================================
const SetBlightRadiusLocBJ = ( addBlight, whichPlayer, loc, radius ) => {

	SetBlightLoc( whichPlayer, loc, radius, addBlight )

};

//===========================================================================
const GetAbilityName = ( abilcode ) => {

	return GetObjectName( abilcode )

};

//***************************************************************************
//*
//*  Melee Template Visibility Settings
//*
//***************************************************************************

//===========================================================================
const MeleeStartingVisibility = () => {

	// Start by setting the ToD.
	SetFloatGameState( GAME_STATE_TIME_OF_DAY, bj_MELEE_STARTING_TOD )

	// call FogMaskEnable(true)
	// call FogEnable(true)

};

//***************************************************************************
//*
//*  Melee Template Starting Resources
//*
//***************************************************************************

//===========================================================================
const MeleeStartingResources = () => {

	let index;
	let indexPlayer;
	let v;
	let startingGold;
	let startingLumber;

	v = VersionGet();

	if ( ( v == VERSION_REIGN_OF_CHAOS ) ) {

		startingGold = bj_MELEE_STARTING_GOLD_V0;
		startingLumber = bj_MELEE_STARTING_LUMBER_V0;

	} else {

		startingGold = bj_MELEE_STARTING_GOLD_V1;
		startingLumber = bj_MELEE_STARTING_LUMBER_V1;

	}

	// Set each player's starting resources.
	index = 0;

	while ( true ) {

		indexPlayer = Player( index );

		if ( ( GetPlayerSlotState( indexPlayer ) == PLAYER_SLOT_STATE_PLAYING ) ) {

			SetPlayerState( indexPlayer, PLAYER_STATE_RESOURCE_GOLD, startingGold )
			SetPlayerState( indexPlayer, PLAYER_STATE_RESOURCE_LUMBER, startingLumber )

		}

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

};

//***************************************************************************
//*
//*  Melee Template Hero Limit
//*
//***************************************************************************

//===========================================================================
const ReducePlayerTechMaxAllowed = ( whichPlayer, techId, limit ) => {

	let oldMax = GetPlayerTechMaxAllowed( whichPlayer, techId );

	// A value of -1 is used to indicate no limit, so check for that as well.

	if ( ( oldMax < 0 || oldMax > limit ) ) {

		SetPlayerTechMaxAllowed( whichPlayer, techId, limit )

	}

};

//===========================================================================
const MeleeStartingHeroLimit = () => {

	let index;

	index = 0;

	while ( true ) {

		// max heroes per player
		SetPlayerMaxHeroesAllowed( bj_MELEE_HERO_LIMIT, Player( index ) )

		// each player is restricted to a limit per hero type as well
		ReducePlayerTechMaxAllowed( Player( index ), "Hamg", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Hmkg", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Hpal", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Hblm", bj_MELEE_HERO_TYPE_LIMIT )

		ReducePlayerTechMaxAllowed( Player( index ), "Obla", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Ofar", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Otch", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Oshd", bj_MELEE_HERO_TYPE_LIMIT )

		ReducePlayerTechMaxAllowed( Player( index ), "Edem", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Ekee", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Emoo", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Ewar", bj_MELEE_HERO_TYPE_LIMIT )

		ReducePlayerTechMaxAllowed( Player( index ), "Udea", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Udre", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Ulic", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Ucrl", bj_MELEE_HERO_TYPE_LIMIT )

		ReducePlayerTechMaxAllowed( Player( index ), "Npbm", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Nbrn", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Nngs", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Nplh", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Nbst", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Nalc", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Ntin", bj_MELEE_HERO_TYPE_LIMIT )
		ReducePlayerTechMaxAllowed( Player( index ), "Nfir", bj_MELEE_HERO_TYPE_LIMIT )

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

};

//***************************************************************************
//*
//*  Melee Template Granted Hero Items
//*
//***************************************************************************

//===========================================================================
const MeleeTrainedUnitIsHeroBJFilter = () => {

	return IsUnitType( GetFilterUnit(), UNIT_TYPE_HERO )

};

//===========================================================================
// The first N heroes trained or hired for each player start off with a
// standard set of items.  This is currently:
//   - 1x Scroll of Town Portal
//
const MeleeGrantItemsToHero = ( whichUnit ) => {

	let owner = GetPlayerId( GetOwningPlayer( whichUnit ) );

	// If we haven't twinked N heroes for this player yet, twink away.

	if ( ( bj_meleeTwinkedHeroes[ owner ] < bj_MELEE_MAX_TWINKED_HEROES ) ) {

		UnitAddItemById( whichUnit, "stwp" )
		bj_meleeTwinkedHeroes = bj_meleeTwinkedHeroes[ owner ] + 1;

	}

};

//===========================================================================
const MeleeGrantItemsToTrainedHero = () => {

	MeleeGrantItemsToHero( GetTrainedUnit() )

};

//===========================================================================
const MeleeGrantItemsToHiredHero = () => {

	MeleeGrantItemsToHero( GetSoldUnit() )

};

//===========================================================================
const MeleeGrantHeroItems = () => {

	let index;
	let trig;

	// Initialize the twinked hero counts.
	index = 0;

	while ( true ) {

		bj_meleeTwinkedHeroes = 0;

		index = index + 1;
		if ( index == bj_MAX_PLAYER_SLOTS ) break;

	}

	// Register for an event whenever a hero is trained, so that we can give
	// him/her their starting items.
	index = 0;

	while ( true ) {

		trig = CreateTrigger();
		TriggerRegisterPlayerUnitEvent( trig, Player( index ), EVENT_PLAYER_UNIT_TRAIN_FINISH, filterMeleeTrainedUnitIsHeroBJ )
		TriggerAddAction( trig, MeleeGrantItemsToTrainedHero )

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

	// Register for an event whenever a neutral hero is hired, so that we
	// can give him/her their starting items.
	trig = CreateTrigger();
	TriggerRegisterPlayerUnitEvent( trig, Player( PLAYER_NEUTRAL_PASSIVE ), EVENT_PLAYER_UNIT_SELL, filterMeleeTrainedUnitIsHeroBJ )
	TriggerAddAction( trig, MeleeGrantItemsToHiredHero )

	// Flag that we are giving starting items to heroes, so that the melee
	// starting units code can create them as necessary.
	bj_meleeGrantHeroItems = true;

};

//***************************************************************************
//*
//*  Melee Template Clear Start Locations
//*
//***************************************************************************

//===========================================================================
const MeleeClearExcessUnit = () => {

	let theUnit = GetEnumUnit();
	let owner = GetPlayerId( GetOwningPlayer( theUnit ) );

	if ( ( owner == PLAYER_NEUTRAL_AGGRESSIVE ) ) {

		// Remove any Neutral Hostile units from the area.
		RemoveUnit( GetEnumUnit() )

	} else if ( ( owner == PLAYER_NEUTRAL_PASSIVE ) ) {

		// Remove non-structure Neutral Passive units from the area.

		if ( ! IsUnitType( theUnit, UNIT_TYPE_STRUCTURE ) ) {

			RemoveUnit( GetEnumUnit() )

		}

	}

};

//===========================================================================
const MeleeClearNearbyUnits = ( x, y, range ) => {

	let nearbyUnits;

	nearbyUnits = CreateGroup();
	GroupEnumUnitsInRange( nearbyUnits, x, y, range, null )
	ForGroup( nearbyUnits, MeleeClearExcessUnit )
	DestroyGroup( nearbyUnits )

};

//===========================================================================
const MeleeClearExcessUnits = () => {

	let index;
	let locX;
	let locY;
	let indexPlayer;

	index = 0;

	while ( true ) {

		indexPlayer = Player( index );

		// If the player slot is being used, clear any nearby creeps.

		if ( ( GetPlayerSlotState( indexPlayer ) == PLAYER_SLOT_STATE_PLAYING ) ) {

			locX = GetStartLocationX( GetPlayerStartLocation( indexPlayer ) );
			locY = GetStartLocationY( GetPlayerStartLocation( indexPlayer ) );

			MeleeClearNearbyUnits( locX, locY, bj_MELEE_CLEAR_UNITS_RADIUS )

		}

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

};

//***************************************************************************
//*
//*  Melee Template Starting Units
//*
//***************************************************************************

//===========================================================================
const MeleeEnumFindNearestMine = () => {

	let enumUnit = GetEnumUnit();
	let dist;
	let unitLoc;

	if ( ( GetUnitTypeId( enumUnit ) == "ngol" ) ) {

		unitLoc = GetUnitLoc( enumUnit );
		dist = DistanceBetweenPoints( unitLoc, bj_meleeNearestMineToLoc );
		RemoveLocation( unitLoc )

		// If this is our first mine, or the closest thusfar, use it instead.

		if ( ( bj_meleeNearestMineDist < 0 ) || ( dist < bj_meleeNearestMineDist ) ) {

			bj_meleeNearestMine = enumUnit;
			bj_meleeNearestMineDist = dist;

		}

	}

};

//===========================================================================
const MeleeFindNearestMine = ( src, range ) => {

	let nearbyMines;

	bj_meleeNearestMine = null;
	bj_meleeNearestMineDist = - 1;
	bj_meleeNearestMineToLoc = src;

	nearbyMines = CreateGroup();
	GroupEnumUnitsInRangeOfLoc( nearbyMines, src, range, null )
	ForGroup( nearbyMines, MeleeEnumFindNearestMine )
	DestroyGroup( nearbyMines )

	return bj_meleeNearestMine

};

//===========================================================================
const MeleeRandomHeroLoc = ( p, id1, id2, id3, id4, loc ) => {

	let hero;
	let roll;
	let pick;
	let v;

	// The selection of heroes is dependant on the game version.
	v = VersionGet();

	if ( ( v == VERSION_REIGN_OF_CHAOS ) ) {

		roll = GetRandomInt( 1, 3 );

	} else {

		roll = GetRandomInt( 1, 4 );

	}

	// Translate the roll into a unitid.

	if ( roll == 1 ) {

		pick = id1;

	} else if ( roll == 2 ) {

		pick = id2;

	} else if ( roll == 3 ) {

		pick = id3;

	} else if ( roll == 4 ) {

		pick = id4;

	} else {

		// Unrecognized id index - pick the first hero in the list.
		pick = id1;

	}

	// Create the hero.
	hero = CreateUnitAtLoc( p, pick, loc, bj_UNIT_FACING );

	if ( bj_meleeGrantHeroItems ) {

		MeleeGrantItemsToHero( hero )

	}

	return hero

};

//===========================================================================
// Returns a location which is (distance) away from (src) in the direction of (targ).
//
const MeleeGetProjectedLoc = ( src, targ, distance, deltaAngle ) => {

	let srcX = GetLocationX( src );
	let srcY = GetLocationY( src );
	let direction = Atan2( GetLocationY( targ ) - srcY, GetLocationX( targ ) - srcX ) + deltaAngle;
	return Location( srcX + distance * Cos( direction ), srcY + distance * Sin( direction ) )

};

//===========================================================================
const MeleeGetNearestValueWithin = ( val, minVal, maxVal ) => {

	if ( ( val < minVal ) ) {

		return minVal

	} else if ( ( val > maxVal ) ) {

		return maxVal

	} else {

		return val

	}

};

//===========================================================================
const MeleeGetLocWithinRect = ( src, r ) => {

	let withinX = MeleeGetNearestValueWithin( GetLocationX( src ), GetRectMinX( r ), GetRectMaxX( r ) );
	let withinY = MeleeGetNearestValueWithin( GetLocationY( src ), GetRectMinY( r ), GetRectMaxY( r ) );
	return Location( withinX, withinY )

};

//===========================================================================
// Starting Units for Human Players
//   - 1 Town Hall, placed at start location
//   - 5 Peasants, placed between start location and nearest gold mine
//
const MeleeStartingUnitsHuman = ( whichPlayer, startLoc, doHeroes, doCamera, doPreload ) => {

	let useRandomHero = IsMapFlagSet( MAP_RANDOM_HERO );
	let unitSpacing = 64;
	let nearestMine;
	let nearMineLoc;
	let heroLoc;
	let peonX;
	let peonY;
	let townHall;

	if ( ( doPreload ) ) {

		Preloader( "scripts\HumanMelee.pld" )

	}

	nearestMine = MeleeFindNearestMine( startLoc, bj_MELEE_MINE_SEARCH_RADIUS );

	if ( ( nearestMine != null ) ) {

		// Spawn Town Hall at the start location.
		townHall = CreateUnitAtLoc( whichPlayer, "htow", startLoc, bj_UNIT_FACING );

		// Spawn Peasants near the mine.
		nearMineLoc = MeleeGetProjectedLoc( GetUnitLoc( nearestMine ), startLoc, 320, 0 );
		peonX = GetLocationX( nearMineLoc );
		peonY = GetLocationY( nearMineLoc );
		CreateUnit( whichPlayer, "hpea", peonX + 0 * unitSpacing, peonY + 1 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "hpea", peonX + 1 * unitSpacing, peonY + 0.15 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "hpea", peonX - 1 * unitSpacing, peonY + 0.15 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "hpea", peonX + 0.6 * unitSpacing, peonY - 1 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "hpea", peonX - 0.6 * unitSpacing, peonY - 1 * unitSpacing, bj_UNIT_FACING )

		// Set random hero spawn point to be off to the side of the start location.
		heroLoc = MeleeGetProjectedLoc( GetUnitLoc( nearestMine ), startLoc, 384, 45 );

	} else {

		// Spawn Town Hall at the start location.
		townHall = CreateUnitAtLoc( whichPlayer, "htow", startLoc, bj_UNIT_FACING );

		// Spawn Peasants directly south of the town hall.
		peonX = GetLocationX( startLoc );
		peonY = GetLocationY( startLoc ) - 224;
		CreateUnit( whichPlayer, "hpea", peonX + 2 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "hpea", peonX + 1 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "hpea", peonX + 0 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "hpea", peonX - 1 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "hpea", peonX - 2 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )

		// Set random hero spawn point to be just south of the start location.
		heroLoc = Location( peonX, peonY - 2 * unitSpacing );

	}

	if ( ( townHall != null ) ) {

		UnitAddAbilityBJ( "Amic", townHall )
		UnitMakeAbilityPermanentBJ( true, "Amic", townHall )

	}

	if ( ( doHeroes ) ) {

		// If the "Random Hero" option is set, start the player with a random hero.
		// Otherwise, give them a "free hero" token.

		if ( useRandomHero ) {

			MeleeRandomHeroLoc( whichPlayer, "Hamg", "Hmkg", "Hpal", "Hblm", heroLoc )

		} else {

			SetPlayerState( whichPlayer, PLAYER_STATE_RESOURCE_HERO_TOKENS, bj_MELEE_STARTING_HERO_TOKENS )

		}

	}

	if ( ( doCamera ) ) {

		// Center the camera on the initial Peasants.
		SetCameraPositionForPlayer( whichPlayer, peonX, peonY )
		SetCameraQuickPositionForPlayer( whichPlayer, peonX, peonY )

	}

};

//===========================================================================
// Starting Units for Orc Players
//   - 1 Great Hall, placed at start location
//   - 5 Peons, placed between start location and nearest gold mine
//
const MeleeStartingUnitsOrc = ( whichPlayer, startLoc, doHeroes, doCamera, doPreload ) => {

	let useRandomHero = IsMapFlagSet( MAP_RANDOM_HERO );
	let unitSpacing = 64;
	let nearestMine;
	let nearMineLoc;
	let heroLoc;
	let peonX;
	let peonY;

	if ( ( doPreload ) ) {

		Preloader( "scripts\OrcMelee.pld" )

	}

	nearestMine = MeleeFindNearestMine( startLoc, bj_MELEE_MINE_SEARCH_RADIUS );

	if ( ( nearestMine != null ) ) {

		// Spawn Great Hall at the start location.
		CreateUnitAtLoc( whichPlayer, "ogre", startLoc, bj_UNIT_FACING )

		// Spawn Peons near the mine.
		nearMineLoc = MeleeGetProjectedLoc( GetUnitLoc( nearestMine ), startLoc, 320, 0 );
		peonX = GetLocationX( nearMineLoc );
		peonY = GetLocationY( nearMineLoc );
		CreateUnit( whichPlayer, "opeo", peonX + 0 * unitSpacing, peonY + 1 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "opeo", peonX + 1 * unitSpacing, peonY + 0.15 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "opeo", peonX - 1 * unitSpacing, peonY + 0.15 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "opeo", peonX + 0.6 * unitSpacing, peonY - 1 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "opeo", peonX - 0.6 * unitSpacing, peonY - 1 * unitSpacing, bj_UNIT_FACING )

		// Set random hero spawn point to be off to the side of the start location.
		heroLoc = MeleeGetProjectedLoc( GetUnitLoc( nearestMine ), startLoc, 384, 45 );

	} else {

		// Spawn Great Hall at the start location.
		CreateUnitAtLoc( whichPlayer, "ogre", startLoc, bj_UNIT_FACING )

		// Spawn Peons directly south of the town hall.
		peonX = GetLocationX( startLoc );
		peonY = GetLocationY( startLoc ) - 224;
		CreateUnit( whichPlayer, "opeo", peonX + 2 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "opeo", peonX + 1 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "opeo", peonX + 0 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "opeo", peonX - 1 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "opeo", peonX - 2 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )

		// Set random hero spawn point to be just south of the start location.
		heroLoc = Location( peonX, peonY - 2 * unitSpacing );

	}

	if ( ( doHeroes ) ) {

		// If the "Random Hero" option is set, start the player with a random hero.
		// Otherwise, give them a "free hero" token.

		if ( useRandomHero ) {

			MeleeRandomHeroLoc( whichPlayer, "Obla", "Ofar", "Otch", "Oshd", heroLoc )

		} else {

			SetPlayerState( whichPlayer, PLAYER_STATE_RESOURCE_HERO_TOKENS, bj_MELEE_STARTING_HERO_TOKENS )

		}

	}

	if ( ( doCamera ) ) {

		// Center the camera on the initial Peons.
		SetCameraPositionForPlayer( whichPlayer, peonX, peonY )
		SetCameraQuickPositionForPlayer( whichPlayer, peonX, peonY )

	}

};

//===========================================================================
// Starting Units for Undead Players
//   - 1 Necropolis, placed at start location
//   - 1 Haunted Gold Mine, placed on nearest gold mine
//   - 3 Acolytes, placed between start location and nearest gold mine
//   - 1 Ghoul, placed between start location and nearest gold mine
//   - Blight, centered on nearest gold mine, spread across a "large area"
//
const MeleeStartingUnitsUndead = ( whichPlayer, startLoc, doHeroes, doCamera, doPreload ) => {

	let useRandomHero = IsMapFlagSet( MAP_RANDOM_HERO );
	let unitSpacing = 64;
	let nearestMine;
	let nearMineLoc;
	let nearTownLoc;
	let heroLoc;
	let peonX;
	let peonY;
	let ghoulX;
	let ghoulY;

	if ( ( doPreload ) ) {

		Preloader( "scripts\UndeadMelee.pld" )

	}

	nearestMine = MeleeFindNearestMine( startLoc, bj_MELEE_MINE_SEARCH_RADIUS );

	if ( ( nearestMine != null ) ) {

		// Spawn Necropolis at the start location.
		CreateUnitAtLoc( whichPlayer, "unpl", startLoc, bj_UNIT_FACING )

		// Replace the nearest gold mine with a blighted version.
		nearestMine = BlightGoldMineForPlayerBJ( nearestMine, whichPlayer );

		// Spawn Ghoul near the Necropolis.
		nearTownLoc = MeleeGetProjectedLoc( startLoc, GetUnitLoc( nearestMine ), 288, 0 );
		ghoulX = GetLocationX( nearTownLoc );
		ghoulY = GetLocationY( nearTownLoc );
		bj_ghoul = CreateUnit( whichPlayer, "ugho", ghoulX + 0 * unitSpacing, ghoulY + 0 * unitSpacing, bj_UNIT_FACING );

		// Spawn Acolytes near the mine.
		nearMineLoc = MeleeGetProjectedLoc( GetUnitLoc( nearestMine ), startLoc, 320, 0 );
		peonX = GetLocationX( nearMineLoc );
		peonY = GetLocationY( nearMineLoc );
		CreateUnit( whichPlayer, "uaco", peonX + 0 * unitSpacing, peonY + 0.5 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "uaco", peonX + 0.65 * unitSpacing, peonY - 0.5 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "uaco", peonX - 0.65 * unitSpacing, peonY - 0.5 * unitSpacing, bj_UNIT_FACING )

		// Create a patch of blight around the gold mine.
		SetBlightLoc( whichPlayer, nearMineLoc, 768, true )

		// Set random hero spawn point to be off to the side of the start location.
		heroLoc = MeleeGetProjectedLoc( GetUnitLoc( nearestMine ), startLoc, 384, 45 );

	} else {

		// Spawn Necropolis at the start location.
		CreateUnitAtLoc( whichPlayer, "unpl", startLoc, bj_UNIT_FACING )

		// Spawn Acolytes and Ghoul directly south of the Necropolis.
		peonX = GetLocationX( startLoc );
		peonY = GetLocationY( startLoc ) - 224;
		CreateUnit( whichPlayer, "uaco", peonX - 1.5 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "uaco", peonX - 0.5 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "uaco", peonX + 0.5 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "ugho", peonX + 1.5 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )

		// Create a patch of blight around the start location.
		SetBlightLoc( whichPlayer, startLoc, 768, true )

		// Set random hero spawn point to be just south of the start location.
		heroLoc = Location( peonX, peonY - 2 * unitSpacing );

	}

	if ( ( doHeroes ) ) {

		// If the "Random Hero" option is set, start the player with a random hero.
		// Otherwise, give them a "free hero" token.

		if ( useRandomHero ) {

			MeleeRandomHeroLoc( whichPlayer, "Udea", "Udre", "Ulic", "Ucrl", heroLoc )

		} else {

			SetPlayerState( whichPlayer, PLAYER_STATE_RESOURCE_HERO_TOKENS, bj_MELEE_STARTING_HERO_TOKENS )

		}

	}

	if ( ( doCamera ) ) {

		// Center the camera on the initial Acolytes.
		SetCameraPositionForPlayer( whichPlayer, peonX, peonY )
		SetCameraQuickPositionForPlayer( whichPlayer, peonX, peonY )

	}

};

//===========================================================================
// Starting Units for Night Elf Players
//   - 1 Tree of Life, placed by nearest gold mine, already entangled
//   - 5 Wisps, placed between Tree of Life and nearest gold mine
//
const MeleeStartingUnitsNightElf = ( whichPlayer, startLoc, doHeroes, doCamera, doPreload ) => {

	let useRandomHero = IsMapFlagSet( MAP_RANDOM_HERO );
	let unitSpacing = 64;
	let minTreeDist = 3.5 * bj_CELLWIDTH;
	let minWispDist = 1.75 * bj_CELLWIDTH;
	let nearestMine;
	let nearMineLoc;
	let wispLoc;
	let heroLoc;
	let peonX;
	let peonY;
	let tree;

	if ( ( doPreload ) ) {

		Preloader( "scripts\NightElfMelee.pld" )

	}

	nearestMine = MeleeFindNearestMine( startLoc, bj_MELEE_MINE_SEARCH_RADIUS );

	if ( ( nearestMine != null ) ) {

		// Spawn Tree of Life near the mine and have it entangle the mine.
		// Project the Tree's coordinates from the gold mine, and then snap
		// the X and Y values to within minTreeDist of the Gold Mine.
		nearMineLoc = MeleeGetProjectedLoc( GetUnitLoc( nearestMine ), startLoc, 650, 0 );
		nearMineLoc = MeleeGetLocWithinRect( nearMineLoc, GetRectFromCircleBJ( GetUnitLoc( nearestMine ), minTreeDist ) );
		tree = CreateUnitAtLoc( whichPlayer, "etol", nearMineLoc, bj_UNIT_FACING );
		IssueTargetOrder( tree, "entangleinstant", nearestMine )

		// Spawn Wisps at the start location.
		wispLoc = MeleeGetProjectedLoc( GetUnitLoc( nearestMine ), startLoc, 320, 0 );
		wispLoc = MeleeGetLocWithinRect( wispLoc, GetRectFromCircleBJ( GetUnitLoc( nearestMine ), minWispDist ) );
		peonX = GetLocationX( wispLoc );
		peonY = GetLocationY( wispLoc );
		CreateUnit( whichPlayer, "ewsp", peonX + 0 * unitSpacing, peonY + 1 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "ewsp", peonX + 1 * unitSpacing, peonY + 0.15 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "ewsp", peonX - 1 * unitSpacing, peonY + 0.15 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "ewsp", peonX + 0.58 * unitSpacing, peonY - 1 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "ewsp", peonX - 0.58 * unitSpacing, peonY - 1 * unitSpacing, bj_UNIT_FACING )

		// Set random hero spawn point to be off to the side of the start location.
		heroLoc = MeleeGetProjectedLoc( GetUnitLoc( nearestMine ), startLoc, 384, 45 );

	} else {

		// Spawn Tree of Life at the start location.
		CreateUnitAtLoc( whichPlayer, "etol", startLoc, bj_UNIT_FACING )

		// Spawn Wisps directly south of the town hall.
		peonX = GetLocationX( startLoc );
		peonY = GetLocationY( startLoc ) - 224;
		CreateUnit( whichPlayer, "ewsp", peonX - 2 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "ewsp", peonX - 1 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "ewsp", peonX + 0 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "ewsp", peonX + 1 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )
		CreateUnit( whichPlayer, "ewsp", peonX + 2 * unitSpacing, peonY + 0 * unitSpacing, bj_UNIT_FACING )

		// Set random hero spawn point to be just south of the start location.
		heroLoc = Location( peonX, peonY - 2 * unitSpacing );

	}

	if ( ( doHeroes ) ) {

		// If the "Random Hero" option is set, start the player with a random hero.
		// Otherwise, give them a "free hero" token.

		if ( useRandomHero ) {

			MeleeRandomHeroLoc( whichPlayer, "Edem", "Ekee", "Emoo", "Ewar", heroLoc )

		} else {

			SetPlayerState( whichPlayer, PLAYER_STATE_RESOURCE_HERO_TOKENS, bj_MELEE_STARTING_HERO_TOKENS )

		}

	}

	if ( ( doCamera ) ) {

		// Center the camera on the initial Wisps.
		SetCameraPositionForPlayer( whichPlayer, peonX, peonY )
		SetCameraQuickPositionForPlayer( whichPlayer, peonX, peonY )

	}

};

//===========================================================================
// Starting Units for Players Whose Race is Unknown
//   - 12 Sheep, placed randomly around the start location
//
const MeleeStartingUnitsUnknownRace = ( whichPlayer, startLoc, doHeroes, doCamera, doPreload ) => {

	let index;

	if ( ( doPreload ) ) {

	null

	}

	index = 0;

	while ( true ) {

		CreateUnit( whichPlayer, "nshe", GetLocationX( startLoc ) + GetRandomReal( - 256, 256 ), GetLocationY( startLoc ) + GetRandomReal( - 256, 256 ), GetRandomReal( 0, 360 ) )
		index = index + 1;
		if ( index == 12 ) break;

	}

	if ( ( doHeroes ) ) {

		// Give them a "free hero" token, out of pity.
		SetPlayerState( whichPlayer, PLAYER_STATE_RESOURCE_HERO_TOKENS, bj_MELEE_STARTING_HERO_TOKENS )

	}

	if ( ( doCamera ) ) {

		// Center the camera on the initial sheep.
		SetCameraPositionLocForPlayer( whichPlayer, startLoc )
		SetCameraQuickPositionLocForPlayer( whichPlayer, startLoc )

	}

};

//===========================================================================
const MeleeStartingUnits = () => {

	let index;
	let indexPlayer;
	let indexStartLoc;
	let indexRace;

	Preloader( "scripts\SharedMelee.pld" )

	index = 0;

	while ( true ) {

		indexPlayer = Player( index );

		if ( ( GetPlayerSlotState( indexPlayer ) == PLAYER_SLOT_STATE_PLAYING ) ) {

			indexStartLoc = GetStartLocationLoc( GetPlayerStartLocation( indexPlayer ) );
			indexRace = GetPlayerRace( indexPlayer );

			// Create initial race-specific starting units

			if ( ( indexRace == RACE_HUMAN ) ) {

				MeleeStartingUnitsHuman( indexPlayer, indexStartLoc, true, true, true )

			} else if ( ( indexRace == RACE_ORC ) ) {

				MeleeStartingUnitsOrc( indexPlayer, indexStartLoc, true, true, true )

			} else if ( ( indexRace == RACE_UNDEAD ) ) {

				MeleeStartingUnitsUndead( indexPlayer, indexStartLoc, true, true, true )

			} else if ( ( indexRace == RACE_NIGHTELF ) ) {

				MeleeStartingUnitsNightElf( indexPlayer, indexStartLoc, true, true, true )

			} else {

				MeleeStartingUnitsUnknownRace( indexPlayer, indexStartLoc, true, true, true )

			}

		}

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

};

//===========================================================================
const MeleeStartingUnitsForPlayer = ( whichRace, whichPlayer, loc, doHeroes ) => {

	// Create initial race-specific starting units

	if ( ( whichRace == RACE_HUMAN ) ) {

		MeleeStartingUnitsHuman( whichPlayer, loc, doHeroes, false, false )

	} else if ( ( whichRace == RACE_ORC ) ) {

		MeleeStartingUnitsOrc( whichPlayer, loc, doHeroes, false, false )

	} else if ( ( whichRace == RACE_UNDEAD ) ) {

		MeleeStartingUnitsUndead( whichPlayer, loc, doHeroes, false, false )

	} else if ( ( whichRace == RACE_NIGHTELF ) ) {

		MeleeStartingUnitsNightElf( whichPlayer, loc, doHeroes, false, false )

	} else {

		// Unrecognized race - ignore the request.

	}

};

//***************************************************************************
//*
//*  Melee Template Starting AI Scripts
//*
//***************************************************************************

//===========================================================================
const PickMeleeAI = ( num, s1, s2, s3 ) => {

	let pick;

	// easy difficulty never uses any custom AI scripts
	// that are designed to be a bit more challenging
	//

	if ( GetAIDifficulty( num ) == AI_DIFFICULTY_NEWBIE ) {

		StartMeleeAI( num, s1 )
		return null

	}

	if ( s2 == null ) {

		pick = 1;

	} else if ( s3 == null ) {

		pick = GetRandomInt( 1, 2 );

	} else {

		pick = GetRandomInt( 1, 3 );

	}

	if ( pick == 1 ) {

		StartMeleeAI( num, s1 )

	} else if ( pick == 2 ) {

		StartMeleeAI( num, s2 )

	} else {

		StartMeleeAI( num, s3 )

	}

};

//===========================================================================
const MeleeStartingAI = () => {

	let index;
	let indexPlayer;
	let indexRace;

	index = 0;

	while ( true ) {

		indexPlayer = Player( index );

		if ( ( GetPlayerSlotState( indexPlayer ) == PLAYER_SLOT_STATE_PLAYING ) ) {

			indexRace = GetPlayerRace( indexPlayer );

			if ( ( GetPlayerController( indexPlayer ) == MAP_CONTROL_COMPUTER ) ) {

				// Run a race-specific melee AI script.

				if ( ( indexRace == RACE_HUMAN ) ) {

					PickMeleeAI( indexPlayer, "human.ai", null, null )

				} else if ( ( indexRace == RACE_ORC ) ) {

					PickMeleeAI( indexPlayer, "orc.ai", null, null )

				} else if ( ( indexRace == RACE_UNDEAD ) ) {

					PickMeleeAI( indexPlayer, "undead.ai", null, null )
					RecycleGuardPosition( bj_ghoul[ index ] )

				} else if ( ( indexRace == RACE_NIGHTELF ) ) {

					PickMeleeAI( indexPlayer, "elf.ai", null, null )

				} else {

					// Unrecognized race.

				}

				ShareEverythingWithTeamAI( indexPlayer )

			}

		}

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

};

const LockGuardPosition = ( targ ) => {

	SetUnitCreepGuard( targ, true )

};

//***************************************************************************
//*
//*  Melee Template Victory / Defeat Conditions
//*
//***************************************************************************

//===========================================================================
const MeleePlayerIsOpponent = ( playerIndex, opponentIndex ) => {

	let thePlayer = Player( playerIndex );
	let theOpponent = Player( opponentIndex );

	// The player himself is not an opponent.

	if ( ( playerIndex == opponentIndex ) ) {

		return false

	}

	// Unused player slots are not opponents.

	if ( ( GetPlayerSlotState( theOpponent ) != PLAYER_SLOT_STATE_PLAYING ) ) {

		return false

	}

	// Players who are already defeated are not opponents.

	if ( ( bj_meleeDefeated[ opponentIndex ] ) ) {

		return false

	}

	// Allied players with allied victory set are not opponents.

	if ( GetPlayerAlliance( thePlayer, theOpponent, ALLIANCE_PASSIVE ) ) {

		if ( GetPlayerAlliance( theOpponent, thePlayer, ALLIANCE_PASSIVE ) ) {

			if ( ( GetPlayerState( thePlayer, PLAYER_STATE_ALLIED_VICTORY ) == 1 ) ) {

				if ( ( GetPlayerState( theOpponent, PLAYER_STATE_ALLIED_VICTORY ) == 1 ) ) {

					return false

				}

			}

		}

	}

	return true

};

//===========================================================================
// Count buildings currently owned by all allies, including the player themself.
//
const MeleeGetAllyStructureCount = ( whichPlayer ) => {

	let playerIndex;
	let buildingCount;
	let indexPlayer;

	// Count the number of buildings controlled by all not-yet-defeated co-allies.
	buildingCount = 0;
	playerIndex = 0;

	while ( true ) {

		indexPlayer = Player( playerIndex );

		// uncomment to cause defeat even if you have control of ally structures, but yours have been nixed
		//if (PlayersAreCoAllied(whichPlayer, indexPlayer) and not bj_meleeDefeated[playerIndex]) then

		if ( ( PlayersAreCoAllied( whichPlayer, indexPlayer ) ) ) {

			buildingCount = buildingCount + GetPlayerStructureCount( indexPlayer, true );

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

	return buildingCount

};

//===========================================================================
// Count allies, excluding dead players and the player themself.
//
const MeleeGetAllyCount = ( whichPlayer ) => {

	let playerIndex;
	let playerCount;
	let indexPlayer;

	// Count the number of not-yet-defeated co-allies.
	playerCount = 0;
	playerIndex = 0;

	while ( true ) {

		indexPlayer = Player( playerIndex );

		if ( PlayersAreCoAllied( whichPlayer, indexPlayer ) && ! bj_meleeDefeated[ playerIndex ] && ( whichPlayer != indexPlayer ) ) {

			playerCount = playerCount + 1;

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

	return playerCount

};

//===========================================================================
// Counts key structures owned by a player and his or her allies, including
// structures currently upgrading or under construction.
//
// Key structures: Town Hall, Great Hall, Tree of Life, Necropolis
//
const MeleeGetAllyKeyStructureCount = ( whichPlayer ) => {

	let playerIndex;
	let indexPlayer;
	let keyStructs;

	// Count the number of buildings controlled by all not-yet-defeated co-allies.
	keyStructs = 0;
	playerIndex = 0;

	while ( true ) {

		indexPlayer = Player( playerIndex );

		if ( ( PlayersAreCoAllied( whichPlayer, indexPlayer ) ) ) {

			keyStructs = keyStructs + GetPlayerTypedUnitCount( indexPlayer, "townhall", true, true );
			keyStructs = keyStructs + GetPlayerTypedUnitCount( indexPlayer, "greathall", true, true );
			keyStructs = keyStructs + GetPlayerTypedUnitCount( indexPlayer, "treeoflife", true, true );
			keyStructs = keyStructs + GetPlayerTypedUnitCount( indexPlayer, "necropolis", true, true );

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

	return keyStructs

};

//===========================================================================
// Enum: Draw out a specific player.
//
const MeleeDoDrawEnum = () => {

	let thePlayer = GetEnumPlayer();

	CachePlayerHeroData( thePlayer )
	RemovePlayerPreserveUnitsBJ( thePlayer, PLAYER_GAME_RESULT_TIE, false )

};

//===========================================================================
// Enum: Victory out a specific player.
//
const MeleeDoVictoryEnum = () => {

	let thePlayer = GetEnumPlayer();
	let playerIndex = GetPlayerId( thePlayer );

	if ( ( ! bj_meleeVictoried[ playerIndex ] ) ) {

		bj_meleeVictoried = true;
		CachePlayerHeroData( thePlayer )
		RemovePlayerPreserveUnitsBJ( thePlayer, PLAYER_GAME_RESULT_VICTORY, false )

	}

};

//===========================================================================
// Defeat out a specific player.
//
const MeleeDoDefeat = ( whichPlayer ) => {

	bj_meleeDefeated = true;
	RemovePlayerPreserveUnitsBJ( whichPlayer, PLAYER_GAME_RESULT_DEFEAT, false )

};

//===========================================================================
// Enum: Defeat out a specific player.
//
const MeleeDoDefeatEnum = () => {

	let thePlayer = GetEnumPlayer();

	// needs to happen before ownership change
	CachePlayerHeroData( thePlayer )
	MakeUnitsPassiveForTeam( thePlayer )
	MeleeDoDefeat( thePlayer )

};

//===========================================================================
// A specific player left the game.
//
const MeleeDoLeave = ( whichPlayer ) => {

	if ( ( GetIntegerGameState( GAME_STATE_DISCONNECTED ) != 0 ) ) {

		GameOverDialogBJ( whichPlayer, true )

	} else {

		bj_meleeDefeated = true;
		RemovePlayerPreserveUnitsBJ( whichPlayer, PLAYER_GAME_RESULT_DEFEAT, true )

	}

};

//===========================================================================
// Remove all observers
// 
const MeleeRemoveObservers = () => {

	let playerIndex;
	let indexPlayer;

	// Give all observers the game over dialog
	playerIndex = 0;

	while ( true ) {

		indexPlayer = Player( playerIndex );

		if ( ( IsPlayerObserver( indexPlayer ) ) ) {

			RemovePlayerPreserveUnitsBJ( indexPlayer, PLAYER_GAME_RESULT_NEUTRAL, false )

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

};

//===========================================================================
// Test all players to determine if a team has won.  For a team to win, all
// remaining (read: undefeated) players need to be co-allied with all other
// remaining players.  If even one player is not allied towards another,
// everyone must be denied victory.
//
const MeleeCheckForVictors = () => {

	let playerIndex;
	let opponentIndex;
	let opponentlessPlayers = CreateForce();
	let gameOver = false;

	// Check to see if any players have opponents remaining.
	playerIndex = 0;

	while ( true ) {

		if ( ( ! bj_meleeDefeated[ playerIndex ] ) ) {

			// Determine whether or not this player has any remaining opponents.
			opponentIndex = 0;

			while ( true ) {

				// If anyone has an opponent, noone can be victorious yet.

				if ( MeleePlayerIsOpponent( playerIndex, opponentIndex ) ) {

					return CreateForce()

				}

				opponentIndex = opponentIndex + 1;
				if ( opponentIndex == bj_MAX_PLAYERS ) break;

			}

			// Keep track of each opponentless player so that we can give
			// them a victory later.
			ForceAddPlayer( opponentlessPlayers, Player( playerIndex ) )
			gameOver = true;

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

	// Set the game over global flag
	bj_meleeGameOver = gameOver;

	return opponentlessPlayers

};

//===========================================================================
// Test each player to determine if anyone has been defeated.
//
const MeleeCheckForLosersAndVictors = () => {

	let playerIndex;
	let indexPlayer;
	let defeatedPlayers = CreateForce();
	let victoriousPlayers;
	let gameOver = false;

	// If the game is already over, do nothing

	if ( ( bj_meleeGameOver ) ) {

		return null

	}

	// If the game was disconnected then it is over, in this case we
	// don't want to report results for anyone as they will most likely
	// conflict with the actual game results

	if ( ( GetIntegerGameState( GAME_STATE_DISCONNECTED ) != 0 ) ) {

		bj_meleeGameOver = true;
		return null

	}

	// Check each player to see if he or she has been defeated yet.
	playerIndex = 0;

	while ( true ) {

		indexPlayer = Player( playerIndex );

		if ( ( ! bj_meleeDefeated[ playerIndex ] && ! bj_meleeVictoried[ playerIndex ] ) ) {

			//call DisplayTimedTextToPlayer(GetLocalPlayer(), 0, 0, 60, "Player"+I2S(playerIndex)+" has "+I2S(MeleeGetAllyStructureCount(indexPlayer))+" ally buildings.")

			if ( ( MeleeGetAllyStructureCount( indexPlayer ) <= 0 ) ) {

				// Keep track of each defeated player so that we can give
				// them a defeat later.
				ForceAddPlayer( defeatedPlayers, Player( playerIndex ) )

				// Set their defeated flag now so MeleeCheckForVictors
				// can detect victors.
				bj_meleeDefeated = true;

			}

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

	// Now that the defeated flags are set, check if there are any victors
	victoriousPlayers = MeleeCheckForVictors();

	// Defeat all defeated players
	ForForce( defeatedPlayers, MeleeDoDefeatEnum )

	// Give victory to all victorious players
	ForForce( victoriousPlayers, MeleeDoVictoryEnum )

	// If the game is over we should remove all observers

	if ( ( bj_meleeGameOver ) ) {

		MeleeRemoveObservers()

	}

};

//===========================================================================
// Returns a race-specific "build X or be revealed" message.
//
const MeleeGetCrippledWarningMessage = ( whichPlayer ) => {

	let r = GetPlayerRace( whichPlayer );

	if ( ( r == RACE_HUMAN ) ) {

		return GetLocalizedString( "CRIPPLE_WARNING_HUMAN" )

	} else if ( ( r == RACE_ORC ) ) {

		return GetLocalizedString( "CRIPPLE_WARNING_ORC" )

	} else if ( ( r == RACE_NIGHTELF ) ) {

		return GetLocalizedString( "CRIPPLE_WARNING_NIGHTELF" )

	} else if ( ( r == RACE_UNDEAD ) ) {

		return GetLocalizedString( "CRIPPLE_WARNING_UNDEAD" )

	} else {

		// Unrecognized Race
		return ""

	}

};

//===========================================================================
// Returns a race-specific "build X" label for cripple timers.
//
const MeleeGetCrippledTimerMessage = ( whichPlayer ) => {

	let r = GetPlayerRace( whichPlayer );

	if ( ( r == RACE_HUMAN ) ) {

		return GetLocalizedString( "CRIPPLE_TIMER_HUMAN" )

	} else if ( ( r == RACE_ORC ) ) {

		return GetLocalizedString( "CRIPPLE_TIMER_ORC" )

	} else if ( ( r == RACE_NIGHTELF ) ) {

		return GetLocalizedString( "CRIPPLE_TIMER_NIGHTELF" )

	} else if ( ( r == RACE_UNDEAD ) ) {

		return GetLocalizedString( "CRIPPLE_TIMER_UNDEAD" )

	} else {

		// Unrecognized Race
		return ""

	}

};

//===========================================================================
// Returns a race-specific "build X" label for cripple timers.
//
const MeleeGetCrippledRevealedMessage = ( whichPlayer ) => {

	return GetLocalizedString( "CRIPPLE_REVEALING_PREFIX" ) + GetPlayerName( whichPlayer ) + GetLocalizedString( "CRIPPLE_REVEALING_POSTFIX" )

};

//===========================================================================
const MeleeExposePlayer = ( whichPlayer, expose ) => {

	let playerIndex;
	let indexPlayer;
	let toExposeTo = CreateForce();

	CripplePlayer( whichPlayer, toExposeTo, false )

	bj_playerIsExposed = expose;
	playerIndex = 0;

	while ( true ) {

		indexPlayer = Player( playerIndex );

		if ( ( ! PlayersAreCoAllied( whichPlayer, indexPlayer ) ) ) {

			ForceAddPlayer( toExposeTo, indexPlayer )

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

	CripplePlayer( whichPlayer, toExposeTo, expose )
	DestroyForce( toExposeTo )

};

//===========================================================================
const MeleeExposeAllPlayers = () => {

	let playerIndex;
	let indexPlayer;
	let playerIndex2;
	let indexPlayer2;
	let toExposeTo = CreateForce();

	playerIndex = 0;

	while ( true ) {

		indexPlayer = Player( playerIndex );

		ForceClear( toExposeTo )
		CripplePlayer( indexPlayer, toExposeTo, false )

		playerIndex2 = 0;

		while ( true ) {

			indexPlayer2 = Player( playerIndex2 );

			if ( playerIndex != playerIndex2 ) {

				if ( ( ! PlayersAreCoAllied( indexPlayer, indexPlayer2 ) ) ) {

					ForceAddPlayer( toExposeTo, indexPlayer2 )

				}

			}

			playerIndex2 = playerIndex2 + 1;
			if ( playerIndex2 == bj_MAX_PLAYERS ) break;

		}

		CripplePlayer( indexPlayer, toExposeTo, true )

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

	DestroyForce( toExposeTo )

};

//===========================================================================
const MeleeCrippledPlayerTimeout = () => {

	let expiredTimer = GetExpiredTimer();
	let playerIndex;
	let exposedPlayer;

	// Determine which player's timer expired.
	playerIndex = 0;

	while ( true ) {

		if ( ( bj_crippledTimer[ playerIndex ] == expiredTimer ) ) {

			if ( true ) break;

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

	if ( ( playerIndex == bj_MAX_PLAYERS ) ) {

		return null

	}

	exposedPlayer = Player( playerIndex );

	if ( ( GetLocalPlayer() == exposedPlayer ) ) {

		// Use only local code (no net traffic) within this block to avoid desyncs.

		// Hide the timer window for this player.
		TimerDialogDisplay( bj_crippledTimerWindows[ playerIndex ], false )

	}

	// Display a text message to all players, explaining the exposure.
	DisplayTimedTextToPlayer( GetLocalPlayer(), 0, 0, bj_MELEE_CRIPPLE_MSG_DURATION, MeleeGetCrippledRevealedMessage( exposedPlayer ) )

	// Expose the player.
	MeleeExposePlayer( exposedPlayer, true )

};

//===========================================================================
const MeleePlayerIsCrippled = ( whichPlayer ) => {

	let allyStructures = MeleeGetAllyStructureCount( whichPlayer );
	let allyKeyStructures = MeleeGetAllyKeyStructureCount( whichPlayer );

	// Dead teams are not considered to be crippled.
	return ( allyStructures > 0 ) && ( allyKeyStructures <= 0 )

};

//===========================================================================
// Test each player to determine if anyone has become crippled.
//
const MeleeCheckForCrippledPlayers = () => {

	let playerIndex;
	let indexPlayer;
	let crippledPlayers = CreateForce();
	let isNowCrippled;
	let indexRace;

	// The "finish soon" exposure of all players overrides any "crippled" exposure

	if ( bj_finishSoonAllExposed ) {

		return null

	}

	// Check each player to see if he or she has been crippled or uncrippled.
	playerIndex = 0;

	while ( true ) {

		indexPlayer = Player( playerIndex );
		isNowCrippled = MeleePlayerIsCrippled( indexPlayer );

		if ( ( ! bj_playerIsCrippled[ playerIndex ] && isNowCrippled ) ) {

			// Player became crippled; start their cripple timer.
			bj_playerIsCrippled = true;
			TimerStart( bj_crippledTimer[ playerIndex ], bj_MELEE_CRIPPLE_TIMEOUT, false, MeleeCrippledPlayerTimeout )

			if ( ( GetLocalPlayer() == indexPlayer ) ) {

				// Use only local code (no net traffic) within this block to avoid desyncs.

				// Show the timer window.
				TimerDialogDisplay( bj_crippledTimerWindows[ playerIndex ], true )

				// Display a warning message.
				DisplayTimedTextToPlayer( indexPlayer, 0, 0, bj_MELEE_CRIPPLE_MSG_DURATION, MeleeGetCrippledWarningMessage( indexPlayer ) )

			}

		} else if ( ( bj_playerIsCrippled[ playerIndex ] && ! isNowCrippled ) ) {

			// Player became uncrippled; stop their cripple timer.
			bj_playerIsCrippled = false;
			PauseTimer( bj_crippledTimer[ playerIndex ] )

			if ( ( GetLocalPlayer() == indexPlayer ) ) {

				// Use only local code (no net traffic) within this block to avoid desyncs.

				// Hide the timer window for this player.
				TimerDialogDisplay( bj_crippledTimerWindows[ playerIndex ], false )

				// Display a confirmation message if the player's team is still alive.

				if ( ( MeleeGetAllyStructureCount( indexPlayer ) > 0 ) ) {

					if ( ( bj_playerIsExposed[ playerIndex ] ) ) {

						DisplayTimedTextToPlayer( indexPlayer, 0, 0, bj_MELEE_CRIPPLE_MSG_DURATION, GetLocalizedString( "CRIPPLE_UNREVEALED" ) )

					} else {

						DisplayTimedTextToPlayer( indexPlayer, 0, 0, bj_MELEE_CRIPPLE_MSG_DURATION, GetLocalizedString( "CRIPPLE_UNCRIPPLED" ) )

					}

				}

			}

			// If the player granted shared vision, deny that vision now.
			MeleeExposePlayer( indexPlayer, false )

		}

		playerIndex = playerIndex + 1;
		if ( playerIndex == bj_MAX_PLAYERS ) break;

	}

};

//===========================================================================
// Determine if the lost unit should result in any defeats or victories.
//
const MeleeCheckLostUnit = ( lostUnit ) => {

	let lostUnitOwner = GetOwningPlayer( lostUnit );

	// We only need to check for mortality if this was the last building.

	if ( ( GetPlayerStructureCount( lostUnitOwner, true ) <= 0 ) ) {

		MeleeCheckForLosersAndVictors()

	}

	// Check if the lost unit has crippled or uncrippled the player.
	// (A team with 0 units is dead, and thus considered uncrippled.)
	MeleeCheckForCrippledPlayers()

};

//===========================================================================
// Determine if the gained unit should result in any defeats, victories,
// or cripple-status changes.
//
const MeleeCheckAddedUnit = ( addedUnit ) => {

	let addedUnitOwner = GetOwningPlayer( addedUnit );

	// If the player was crippled, this unit may have uncrippled him/her.

	if ( ( bj_playerIsCrippled[ GetPlayerId( addedUnitOwner ) ] ) ) {

		MeleeCheckForCrippledPlayers()

	}

};

//===========================================================================
const MeleeTriggerActionConstructCancel = () => {

	MeleeCheckLostUnit( GetCancelledStructure() )

};

//===========================================================================
const MeleeTriggerActionUnitDeath = () => {

	if ( ( IsUnitType( GetDyingUnit(), UNIT_TYPE_STRUCTURE ) ) ) {

		MeleeCheckLostUnit( GetDyingUnit() )

	}

};

//===========================================================================
const MeleeTriggerActionUnitConstructionStart = () => {

	MeleeCheckAddedUnit( GetConstructingStructure() )

};

//===========================================================================
const MeleeTriggerActionPlayerDefeated = () => {

	let thePlayer = GetTriggerPlayer();
	CachePlayerHeroData( thePlayer )

	if ( ( MeleeGetAllyCount( thePlayer ) > 0 ) ) {

		// If at least one ally is still alive and kicking, share units with
		// them and proceed with death.
		ShareEverythingWithTeam( thePlayer )

		if ( ( ! bj_meleeDefeated[ GetPlayerId( thePlayer ) ] ) ) {

			MeleeDoDefeat( thePlayer )

		}

	} else {

		// If no living allies remain, swap all units and buildings over to
		// neutral_passive and proceed with death.
		MakeUnitsPassiveForTeam( thePlayer )

		if ( ( ! bj_meleeDefeated[ GetPlayerId( thePlayer ) ] ) ) {

			MeleeDoDefeat( thePlayer )

		}

	}

	MeleeCheckForLosersAndVictors()

};

//===========================================================================
const MeleeTriggerActionPlayerLeft = () => {

	let thePlayer = GetTriggerPlayer();

	// Just show game over for observers when they leave

	if ( ( IsPlayerObserver( thePlayer ) ) ) {

		RemovePlayerPreserveUnitsBJ( thePlayer, PLAYER_GAME_RESULT_NEUTRAL, false )
		return null

	}

	CachePlayerHeroData( thePlayer )

	// This is the same as defeat except the player generates the message 
	// "player left the game" as opposed to "player was defeated".

	if ( ( MeleeGetAllyCount( thePlayer ) > 0 ) ) {

		// If at least one ally is still alive and kicking, share units with
		// them and proceed with death.
		ShareEverythingWithTeam( thePlayer )
		MeleeDoLeave( thePlayer )

	} else {

		// If no living allies remain, swap all units and buildings over to
		// neutral_passive and proceed with death.
		MakeUnitsPassiveForTeam( thePlayer )
		MeleeDoLeave( thePlayer )

	}

	MeleeCheckForLosersAndVictors()

};

//===========================================================================
const MeleeTriggerActionAllianceChange = () => {

	MeleeCheckForLosersAndVictors()
	MeleeCheckForCrippledPlayers()

};

//===========================================================================
const MeleeTriggerTournamentFinishSoon = () => {

	// Note: We may get this trigger multiple times
	let playerIndex;
	let indexPlayer;
	let timeRemaining = GetTournamentFinishSoonTimeRemaining();

	if ( ! bj_finishSoonAllExposed ) {

		bj_finishSoonAllExposed = true;

		// Reset all crippled players and their timers, and hide the local crippled timer dialog
		playerIndex = 0;

		while ( true ) {

			indexPlayer = Player( playerIndex );

			if ( bj_playerIsCrippled[ playerIndex ] ) {

				// Uncripple the player
				bj_playerIsCrippled = false;
				PauseTimer( bj_crippledTimer[ playerIndex ] )

				if ( ( GetLocalPlayer() == indexPlayer ) ) {

					// Use only local code (no net traffic) within this block to avoid desyncs.

					// Hide the timer window.
					TimerDialogDisplay( bj_crippledTimerWindows[ playerIndex ], false )

				}

			}

			playerIndex = playerIndex + 1;
			if ( playerIndex == bj_MAX_PLAYERS ) break;

		}

		// Expose all players
		MeleeExposeAllPlayers()

	}

	// Show the "finish soon" timer dialog and set the real time remaining
	TimerDialogDisplay( bj_finishSoonTimerDialog, true )
	TimerDialogSetRealTimeRemaining( bj_finishSoonTimerDialog, timeRemaining )

};

//===========================================================================
const MeleeWasUserPlayer = ( whichPlayer ) => {

	let slotState;

	if ( ( GetPlayerController( whichPlayer ) != MAP_CONTROL_USER ) ) {

		return false

	}

	slotState = GetPlayerSlotState( whichPlayer );

	return ( slotState == PLAYER_SLOT_STATE_PLAYING || slotState == PLAYER_SLOT_STATE_LEFT )

};

//===========================================================================
const MeleeTournamentFinishNowRuleA = ( multiplier ) => {

	let playerScore;
	let teamScore;
	let teamForce;
	let teamCount;
	let index;
	let indexPlayer;
	let index2;
	let indexPlayer2;
	let bestTeam;
	let bestScore;
	let draw;

	// Compute individual player scores
	index = 0;

	while ( true ) {

		indexPlayer = Player( index );

		if ( MeleeWasUserPlayer( indexPlayer ) ) {

			playerScore = GetTournamentScore( indexPlayer );

			if ( playerScore[ index ] <= 0 ) {

				playerScore = 1;

			}

		} else {

			playerScore = 0;

		}

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

	// Compute team scores and team forces
	teamCount = 0;
	index = 0;

	while ( true ) {

		if ( playerScore[ index ] != 0 ) {

			indexPlayer = Player( index );

			teamScore = 0;
			teamForce = CreateForce();

			index2 = index;

			while ( true ) {

				if ( playerScore[ index2 ] != 0 ) {

					indexPlayer2 = Player( index2 );

					if ( PlayersAreCoAllied( indexPlayer, indexPlayer2 ) ) {

						teamScore = teamScore[ teamCount ] + playerScore[ index2 ];
						ForceAddPlayer( teamForce[ teamCount ], indexPlayer2 )
						playerScore = 0;

					}

				}

				index2 = index2 + 1;
				if ( index2 == bj_MAX_PLAYERS ) break;

			}

			teamCount = teamCount + 1;

		}

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

	// The game is now over
	bj_meleeGameOver = true;

	// There should always be at least one team, but continue to work if not

	if ( teamCount != 0 ) {

		// Find best team score
		bestTeam = - 1;
		bestScore = - 1;
		index = 0;

		while ( true ) {

			if ( teamScore[ index ] > bestScore ) {

				bestTeam = index;
				bestScore = teamScore[ index ];

			}

			index = index + 1;
			if ( index == teamCount ) break;

		}

		// Check whether the best team's score is 'multiplier' times better than
		// every other team. In the case of multiplier == 1 and exactly equal team
		// scores, the first team (which was randomly chosen by the server) will win.
		draw = false;
		index = 0;

		while ( true ) {

			if ( index != bestTeam ) {

				if ( bestScore < ( multiplier * teamScore[ index ] ) ) {

					draw = true;

				}

			}

			index = index + 1;
			if ( index == teamCount ) break;

		}

		if ( draw ) {

			// Give draw to all players on all teams
			index = 0;

			while ( true ) {

				ForForce( teamForce[ index ], MeleeDoDrawEnum )

				index = index + 1;
				if ( index == teamCount ) break;

			}

		} else {

			// Give defeat to all players on teams other than the best team
			index = 0;

			while ( true ) {

				if ( index != bestTeam ) {

					ForForce( teamForce[ index ], MeleeDoDefeatEnum )

				}

				index = index + 1;
				if ( index == teamCount ) break;

			}

			// Give victory to all players on the best team
			ForForce( teamForce[ bestTeam ], MeleeDoVictoryEnum )

		}

	}

};

//===========================================================================
const MeleeTriggerTournamentFinishNow = () => {

	let rule = GetTournamentFinishNowRule();

	// If the game is already over, do nothing

	if ( bj_meleeGameOver ) {

		return null

	}

	if ( ( rule == 1 ) ) {

		// Finals games
		MeleeTournamentFinishNowRuleA( 1 )

	} else {

		// Preliminary games
		MeleeTournamentFinishNowRuleA( 3 )

	}

	// Since the game is over we should remove all observers
	MeleeRemoveObservers()

};

//===========================================================================
const MeleeInitVictoryDefeat = () => {

	let trig;
	let index;
	let indexPlayer;

	// Create a timer window for the "finish soon" timeout period, it has no timer
	// because it is driven by real time (outside of the game state to avoid desyncs)
	bj_finishSoonTimerDialog = CreateTimerDialog( null );

	// Set a trigger to fire when we receive a "finish soon" game event
	trig = CreateTrigger();
	TriggerRegisterGameEvent( trig, EVENT_GAME_TOURNAMENT_FINISH_SOON )
	TriggerAddAction( trig, MeleeTriggerTournamentFinishSoon )

	// Set a trigger to fire when we receive a "finish now" game event
	trig = CreateTrigger();
	TriggerRegisterGameEvent( trig, EVENT_GAME_TOURNAMENT_FINISH_NOW )
	TriggerAddAction( trig, MeleeTriggerTournamentFinishNow )

	// Set up each player's mortality code.
	index = 0;

	while ( true ) {

		indexPlayer = Player( index );

		// Make sure this player slot is playing.

		if ( ( GetPlayerSlotState( indexPlayer ) == PLAYER_SLOT_STATE_PLAYING ) ) {

			bj_meleeDefeated = false;
			bj_meleeVictoried = false;

			// Create a timer and timer window in case the player is crippled.
			bj_playerIsCrippled = false;
			bj_playerIsExposed = false;
			bj_crippledTimer = CreateTimer();
			bj_crippledTimerWindows = CreateTimerDialog( bj_crippledTimer[ index ] );
			TimerDialogSetTitle( bj_crippledTimerWindows[ index ], MeleeGetCrippledTimerMessage( indexPlayer ) )

			// Set a trigger to fire whenever a building is cancelled for this player.
			trig = CreateTrigger();
			TriggerRegisterPlayerUnitEvent( trig, indexPlayer, EVENT_PLAYER_UNIT_CONSTRUCT_CANCEL, null )
			TriggerAddAction( trig, MeleeTriggerActionConstructCancel )

			// Set a trigger to fire whenever a unit dies for this player.
			trig = CreateTrigger();
			TriggerRegisterPlayerUnitEvent( trig, indexPlayer, EVENT_PLAYER_UNIT_DEATH, null )
			TriggerAddAction( trig, MeleeTriggerActionUnitDeath )

			// Set a trigger to fire whenever a unit begins construction for this player
			trig = CreateTrigger();
			TriggerRegisterPlayerUnitEvent( trig, indexPlayer, EVENT_PLAYER_UNIT_CONSTRUCT_START, null )
			TriggerAddAction( trig, MeleeTriggerActionUnitConstructionStart )

			// Set a trigger to fire whenever this player defeats-out
			trig = CreateTrigger();
			TriggerRegisterPlayerEvent( trig, indexPlayer, EVENT_PLAYER_DEFEAT )
			TriggerAddAction( trig, MeleeTriggerActionPlayerDefeated )

			// Set a trigger to fire whenever this player leaves
			trig = CreateTrigger();
			TriggerRegisterPlayerEvent( trig, indexPlayer, EVENT_PLAYER_LEAVE )
			TriggerAddAction( trig, MeleeTriggerActionPlayerLeft )

			// Set a trigger to fire whenever this player changes his/her alliances.
			trig = CreateTrigger();
			TriggerRegisterPlayerAllianceChange( trig, indexPlayer, ALLIANCE_PASSIVE )
			TriggerRegisterPlayerStateEvent( trig, indexPlayer, PLAYER_STATE_ALLIED_VICTORY, EQUAL, 1 )
			TriggerAddAction( trig, MeleeTriggerActionAllianceChange )

		} else {

			bj_meleeDefeated = true;
			bj_meleeVictoried = false;

			// Handle leave events for observers

			if ( ( IsPlayerObserver( indexPlayer ) ) ) {

				// Set a trigger to fire whenever this player leaves
				trig = CreateTrigger();
				TriggerRegisterPlayerEvent( trig, indexPlayer, EVENT_PLAYER_LEAVE )
				TriggerAddAction( trig, MeleeTriggerActionPlayerLeft )

			}

		}

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

	// Test for victory / defeat at startup, in case the user has already won / lost.
	// Allow for a short time to pass first, so that the map can finish loading.
	TimerStart( CreateTimer(), 2, false, MeleeTriggerActionAllianceChange )

};

//***************************************************************************
//*
//*  Player Slot Availability
//*
//***************************************************************************

//===========================================================================
const CheckInitPlayerSlotAvailability = () => {

	let index;

	if ( ( ! bj_slotControlReady ) ) {

		index = 0;

		while ( true ) {

			bj_slotControlUsed = false;
			bj_slotControl = MAP_CONTROL_USER;
			index = index + 1;
			if ( index == bj_MAX_PLAYERS ) break;

		}

		bj_slotControlReady = true;

	}

};

//===========================================================================
const SetPlayerSlotAvailable = ( whichPlayer, control ) => {

	let playerIndex = GetPlayerId( whichPlayer );

	CheckInitPlayerSlotAvailability()
	bj_slotControlUsed = true;
	bj_slotControl = control;

};

//***************************************************************************
//*
//*  Generic Template Player-slot Initialization
//*
//***************************************************************************

//===========================================================================
const TeamInitPlayerSlots = ( teamCount ) => {

	let index;
	let indexPlayer;
	let team;

	SetTeams( teamCount )

	CheckInitPlayerSlotAvailability()
	index = 0;
	team = 0;

	while ( true ) {

		if ( ( bj_slotControlUsed[ index ] ) ) {

			indexPlayer = Player( index );
			SetPlayerTeam( indexPlayer, team )
			team = team + 1;

			if ( ( team >= teamCount ) ) {

				team = 0;

			}

		}

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

};

//===========================================================================
const MeleeInitPlayerSlots = () => {

	TeamInitPlayerSlots( bj_MAX_PLAYERS )

};

//===========================================================================
const FFAInitPlayerSlots = () => {

	TeamInitPlayerSlots( bj_MAX_PLAYERS )

};

//===========================================================================
const OneOnOneInitPlayerSlots = () => {

	// Limit the game to 2 players.
	SetTeams( 2 )
	SetPlayers( 2 )
	TeamInitPlayerSlots( 2 )

};

//===========================================================================
const InitGenericPlayerSlots = () => {

	let gType = GetGameTypeSelected();

	if ( ( gType == GAME_TYPE_MELEE ) ) {

		MeleeInitPlayerSlots()

	} else if ( ( gType == GAME_TYPE_FFA ) ) {

		FFAInitPlayerSlots()

	} else if ( ( gType == GAME_TYPE_USE_MAP_SETTINGS ) ) {

		// Do nothing; the map-specific script handles this.

	} else if ( ( gType == GAME_TYPE_ONE_ON_ONE ) ) {

		OneOnOneInitPlayerSlots()

	} else if ( ( gType == GAME_TYPE_TWO_TEAM_PLAY ) ) {

		TeamInitPlayerSlots( 2 )

	} else if ( ( gType == GAME_TYPE_THREE_TEAM_PLAY ) ) {

		TeamInitPlayerSlots( 3 )

	} else if ( ( gType == GAME_TYPE_FOUR_TEAM_PLAY ) ) {

		TeamInitPlayerSlots( 4 )

	} else {

		// Unrecognized Game Type

	}

};

//***************************************************************************
//*
//*  Blizzard.j Initialization
//*
//***************************************************************************

//===========================================================================
const SetDNCSoundsDawn = () => {

	if ( bj_useDawnDuskSounds ) {

		StartSound( bj_dawnSound )

	}

};

//===========================================================================
const SetDNCSoundsDusk = () => {

	if ( bj_useDawnDuskSounds ) {

		StartSound( bj_duskSound )

	}

};

//===========================================================================
const SetDNCSoundsDay = () => {

	let ToD = GetTimeOfDay();

	if ( ( ToD >= bj_TOD_DAWN && ToD < bj_TOD_DUSK ) && ! bj_dncIsDaytime ) {

		bj_dncIsDaytime = true;

		// change ambient sounds
		StopSound( bj_nightAmbientSound, false, true )
		StartSound( bj_dayAmbientSound )

	}

};

//===========================================================================
const SetDNCSoundsNight = () => {

	let ToD = GetTimeOfDay();

	if ( ( ToD < bj_TOD_DAWN || ToD >= bj_TOD_DUSK ) && bj_dncIsDaytime ) {

		bj_dncIsDaytime = false;

		// change ambient sounds
		StopSound( bj_dayAmbientSound, false, true )
		StartSound( bj_nightAmbientSound )

	}

};

//===========================================================================
const InitDNCSounds = () => {

	// Create sounds to be played at dawn and dusk.
	bj_dawnSound = CreateSoundFromLabel( "RoosterSound", false, false, false, 10000, 10000 );
	bj_duskSound = CreateSoundFromLabel( "WolfSound", false, false, false, 10000, 10000 );

	// Set up triggers to respond to dawn and dusk.
	bj_dncSoundsDawn = CreateTrigger();
	TriggerRegisterGameStateEvent( bj_dncSoundsDawn, GAME_STATE_TIME_OF_DAY, EQUAL, bj_TOD_DAWN )
	TriggerAddAction( bj_dncSoundsDawn, SetDNCSoundsDawn )

	bj_dncSoundsDusk = CreateTrigger();
	TriggerRegisterGameStateEvent( bj_dncSoundsDusk, GAME_STATE_TIME_OF_DAY, EQUAL, bj_TOD_DUSK )
	TriggerAddAction( bj_dncSoundsDusk, SetDNCSoundsDusk )

	// Set up triggers to respond to changes from day to night or vice-versa.
	bj_dncSoundsDay = CreateTrigger();
	TriggerRegisterGameStateEvent( bj_dncSoundsDay, GAME_STATE_TIME_OF_DAY, GREATER_THAN_OR_EQUAL, bj_TOD_DAWN )
	TriggerRegisterGameStateEvent( bj_dncSoundsDay, GAME_STATE_TIME_OF_DAY, LESS_THAN, bj_TOD_DUSK )
	TriggerAddAction( bj_dncSoundsDay, SetDNCSoundsDay )

	bj_dncSoundsNight = CreateTrigger();
	TriggerRegisterGameStateEvent( bj_dncSoundsNight, GAME_STATE_TIME_OF_DAY, LESS_THAN, bj_TOD_DAWN )
	TriggerRegisterGameStateEvent( bj_dncSoundsNight, GAME_STATE_TIME_OF_DAY, GREATER_THAN_OR_EQUAL, bj_TOD_DUSK )
	TriggerAddAction( bj_dncSoundsNight, SetDNCSoundsNight )

};

//===========================================================================
const InitBlizzardGlobals = () => {

	let index;
	let userControlledPlayers;
	let v;

	// Init filter function vars
	filterIssueHauntOrderAtLocBJ = Filter( IssueHauntOrderAtLocBJFilter );
	filterEnumDestructablesInCircleBJ = Filter( EnumDestructablesInCircleBJFilter );
	filterGetUnitsInRectOfPlayer = Filter( GetUnitsInRectOfPlayerFilter );
	filterGetUnitsOfTypeIdAll = Filter( GetUnitsOfTypeIdAllFilter );
	filterGetUnitsOfPlayerAndTypeId = Filter( GetUnitsOfPlayerAndTypeIdFilter );
	filterMeleeTrainedUnitIsHeroBJ = Filter( MeleeTrainedUnitIsHeroBJFilter );
	filterLivingPlayerUnitsOfTypeId = Filter( LivingPlayerUnitsOfTypeIdFilter );

	// Init force presets
	index = 0;

	while ( true ) {

		if ( index == bj_MAX_PLAYER_SLOTS ) break;
		bj_FORCE_PLAYER = CreateForce();
		ForceAddPlayer( bj_FORCE_PLAYER[ index ], Player( index ) )
		index = index + 1;

	}

	bj_FORCE_ALL_PLAYERS = CreateForce();
	ForceEnumPlayers( bj_FORCE_ALL_PLAYERS, null )

	// Init Cinematic Mode history
	bj_cineModePriorSpeed = GetGameSpeed();
	bj_cineModePriorFogSetting = IsFogEnabled();
	bj_cineModePriorMaskSetting = IsFogMaskEnabled();

	// Init Trigger Queue
	index = 0;

	while ( true ) {

		if ( index >= bj_MAX_QUEUED_TRIGGERS ) break;
		bj_queuedExecTriggers = null;
		bj_queuedExecUseConds = false;
		index = index + 1;

	}

	// Init singleplayer check
	bj_isSinglePlayer = false;
	userControlledPlayers = 0;
	index = 0;

	while ( true ) {

		if ( index >= bj_MAX_PLAYERS ) break;

		if ( ( GetPlayerController( Player( index ) ) == MAP_CONTROL_USER && GetPlayerSlotState( Player( index ) ) == PLAYER_SLOT_STATE_PLAYING ) ) {

			userControlledPlayers = userControlledPlayers + 1;

		}

		index = index + 1;

	}

	bj_isSinglePlayer = ( userControlledPlayers == 1 );

	// Init sounds
	//set bj_pingMinimapSound = CreateSoundFromLabel("AutoCastButtonClick", false, false, false, 10000, 10000)
	bj_rescueSound = CreateSoundFromLabel( "Rescue", false, false, false, 10000, 10000 );
	bj_questDiscoveredSound = CreateSoundFromLabel( "QuestNew", false, false, false, 10000, 10000 );
	bj_questUpdatedSound = CreateSoundFromLabel( "QuestUpdate", false, false, false, 10000, 10000 );
	bj_questCompletedSound = CreateSoundFromLabel( "QuestCompleted", false, false, false, 10000, 10000 );
	bj_questFailedSound = CreateSoundFromLabel( "QuestFailed", false, false, false, 10000, 10000 );
	bj_questHintSound = CreateSoundFromLabel( "Hint", false, false, false, 10000, 10000 );
	bj_questSecretSound = CreateSoundFromLabel( "SecretFound", false, false, false, 10000, 10000 );
	bj_questItemAcquiredSound = CreateSoundFromLabel( "ItemReward", false, false, false, 10000, 10000 );
	bj_questWarningSound = CreateSoundFromLabel( "Warning", false, false, false, 10000, 10000 );
	bj_victoryDialogSound = CreateSoundFromLabel( "QuestCompleted", false, false, false, 10000, 10000 );
	bj_defeatDialogSound = CreateSoundFromLabel( "QuestFailed", false, false, false, 10000, 10000 );

	// Init corpse creation triggers.
	DelayedSuspendDecayCreate()

	// Init version-specific data
	v = VersionGet();

	if ( ( v == VERSION_REIGN_OF_CHAOS ) ) {

		bj_MELEE_MAX_TWINKED_HEROES = bj_MELEE_MAX_TWINKED_HEROES_V0;

	} else {

		bj_MELEE_MAX_TWINKED_HEROES = bj_MELEE_MAX_TWINKED_HEROES_V1;

	}

};

//===========================================================================
const InitQueuedTriggers = () => {

	bj_queuedExecTimeout = CreateTrigger();
	TriggerRegisterTimerExpireEvent( bj_queuedExecTimeout, bj_queuedExecTimeoutTimer )
	TriggerAddAction( bj_queuedExecTimeout, QueuedTriggerDoneBJ )

};

//===========================================================================
const InitMapRects = () => {

	bj_mapInitialPlayableArea = Rect( GetCameraBoundMinX() - GetCameraMargin( CAMERA_MARGIN_LEFT ), GetCameraBoundMinY() - GetCameraMargin( CAMERA_MARGIN_BOTTOM ), GetCameraBoundMaxX() + GetCameraMargin( CAMERA_MARGIN_RIGHT ), GetCameraBoundMaxY() + GetCameraMargin( CAMERA_MARGIN_TOP ) );
	bj_mapInitialCameraBounds = GetCurrentCameraBoundsMapRectBJ();

};

//===========================================================================
const InitSummonableCaps = () => {

	let index;

	index = 0;

	while ( true ) {

		// upgraded units
		// Note: Only do this if the corresponding upgrade is not yet researched
		// Barrage - Siege Engines

		if ( ( ! GetPlayerTechResearched( Player( index ), "Rhrt", true ) ) ) {

			SetPlayerTechMaxAllowed( Player( index ), "hrtt", 0 )

		}

		// Berserker Upgrade - Troll Berserkers

		if ( ( ! GetPlayerTechResearched( Player( index ), "Robk", true ) ) ) {

			SetPlayerTechMaxAllowed( Player( index ), "otbk", 0 )

		}

		// max skeletons per player
		SetPlayerTechMaxAllowed( Player( index ), "uske", bj_MAX_SKELETONS )

		index = index + 1;
		if ( index == bj_MAX_PLAYERS ) break;

	}

};

//===========================================================================
// Update the per-class stock limits.
//
const UpdateStockAvailability = ( whichItem ) => {

	let iType = GetItemType( whichItem );
	let iLevel = GetItemLevel( whichItem );

	// Update allowed type/level combinations.

	if ( ( iType == ITEM_TYPE_PERMANENT ) ) {

		bj_stockAllowedPermanent = true;

	} else if ( ( iType == ITEM_TYPE_CHARGED ) ) {

		bj_stockAllowedCharged = true;

	} else if ( ( iType == ITEM_TYPE_ARTIFACT ) ) {

		bj_stockAllowedArtifact = true;

	} else {

		// Not interested in this item type - ignore the item.

	}

};

//===========================================================================
// Find a sellable item of the given type and level, and then add it.
//
const UpdateEachStockBuildingEnum = () => {

	let iteration = 0;
	let pickedItemId;

	while ( true ) {

		pickedItemId = ChooseRandomItemEx( bj_stockPickedItemType, bj_stockPickedItemLevel );
		if ( IsItemIdSellable( pickedItemId ) ) break;

		// If we get hung up on an entire class/level combo of unsellable
		// items, or a very unlucky series of random numbers, give up.
		iteration = iteration + 1;

		if ( ( iteration > bj_STOCK_MAX_ITERATIONS ) ) {

			return null

		}

	}

	AddItemToStock( GetEnumUnit(), pickedItemId, 1, 1 )

};

//===========================================================================
const UpdateEachStockBuilding = ( iType, iLevel ) => {

	let g;

	bj_stockPickedItemType = iType;
	bj_stockPickedItemLevel = iLevel;

	g = CreateGroup();
	GroupEnumUnitsOfType( g, "marketplace", null )
	ForGroup( g, UpdateEachStockBuildingEnum )
	DestroyGroup( g )

};

//===========================================================================
// Update stock inventory.
//
const PerformStockUpdates = () => {

	let pickedItemId;
	let pickedItemType;
	let pickedItemLevel = 0;
	let allowedCombinations = 0;
	let iLevel;

	// Give each type/level combination a chance of being picked.
	iLevel = 1;

	while ( true ) {

		if ( ( bj_stockAllowedPermanent[ iLevel ] ) ) {

			allowedCombinations = allowedCombinations + 1;

			if ( ( GetRandomInt( 1, allowedCombinations ) == 1 ) ) {

				pickedItemType = ITEM_TYPE_PERMANENT;
				pickedItemLevel = iLevel;

			}

		}

		if ( ( bj_stockAllowedCharged[ iLevel ] ) ) {

			allowedCombinations = allowedCombinations + 1;

			if ( ( GetRandomInt( 1, allowedCombinations ) == 1 ) ) {

				pickedItemType = ITEM_TYPE_CHARGED;
				pickedItemLevel = iLevel;

			}

		}

		if ( ( bj_stockAllowedArtifact[ iLevel ] ) ) {

			allowedCombinations = allowedCombinations + 1;

			if ( ( GetRandomInt( 1, allowedCombinations ) == 1 ) ) {

				pickedItemType = ITEM_TYPE_ARTIFACT;
				pickedItemLevel = iLevel;

			}

		}

		iLevel = iLevel + 1;
		if ( iLevel > bj_MAX_ITEM_LEVEL ) break;

	}

	// Make sure we found a valid item type to add.

	if ( ( allowedCombinations == 0 ) ) {

		return null

	}

	UpdateEachStockBuilding( pickedItemType, pickedItemLevel )

};

//===========================================================================
// Perform the first update, and then arrange future updates.
//
const StartStockUpdates = () => {

	PerformStockUpdates()
	TimerStart( bj_stockUpdateTimer, bj_STOCK_RESTOCK_INTERVAL, true, PerformStockUpdates )

};

//===========================================================================
const RemovePurchasedItem = () => {

	RemoveItemFromStock( GetSellingUnit(), GetItemTypeId( GetSoldItem() ) )

};

//===========================================================================
const InitNeutralBuildings = () => {

	let iLevel;

	// Chart of allowed stock items.
	iLevel = 0;

	while ( true ) {

		bj_stockAllowedPermanent = false;
		bj_stockAllowedCharged = false;
		bj_stockAllowedArtifact = false;
		iLevel = iLevel + 1;
		if ( iLevel > bj_MAX_ITEM_LEVEL ) break;

	}

	// Limit stock inventory slots.
	SetAllItemTypeSlots( bj_MAX_STOCK_ITEM_SLOTS )
	SetAllUnitTypeSlots( bj_MAX_STOCK_UNIT_SLOTS )

	// Arrange the first update.
	bj_stockUpdateTimer = CreateTimer();
	TimerStart( bj_stockUpdateTimer, bj_STOCK_RESTOCK_INITIAL_DELAY, false, StartStockUpdates )

	// Set up a trigger to fire whenever an item is sold.
	bj_stockItemPurchased = CreateTrigger();
	TriggerRegisterPlayerUnitEvent( bj_stockItemPurchased, Player( PLAYER_NEUTRAL_PASSIVE ), EVENT_PLAYER_UNIT_SELL_ITEM, null )
	TriggerAddAction( bj_stockItemPurchased, RemovePurchasedItem )

};

//===========================================================================
const MarkGameStarted = () => {

	bj_gameStarted = true;
	DestroyTimer( bj_gameStartedTimer )

};

//===========================================================================
const DetectGameStarted = () => {

	bj_gameStartedTimer = CreateTimer();
	TimerStart( bj_gameStartedTimer, bj_GAME_STARTED_THRESHOLD, false, MarkGameStarted )

};

//===========================================================================
const InitBlizzard = () => {

	// Set up the Neutral Victim player slot, to torture the abandoned units
	// of defeated players.  Since some triggers expect this player slot to
	// exist, this is performed for all maps.
	ConfigureNeutralVictim()

	InitBlizzardGlobals()
	InitQueuedTriggers()
	InitRescuableBehaviorBJ()
	InitDNCSounds()
	InitMapRects()
	InitSummonableCaps()
	InitNeutralBuildings()
	DetectGameStarted()

};

//***************************************************************************
//*
//*  Random distribution
//*
//*  Used to select a random object from a given distribution of chances
//*
//*  - RandomDistReset clears the distribution list
//*
//*  - RandomDistAddItem adds a new object to the distribution list
//*    with a given identifier and an integer chance to be chosen
//*
//*  - RandomDistChoose will use the current distribution list to choose
//*    one of the objects randomly based on the chance distribution
//*  
//*  Note that the chances are effectively normalized by their sum,
//*  so only the relative values of each chance are important
//*
//***************************************************************************

//===========================================================================
const RandomDistReset = () => {

	bj_randDistCount = 0;

};

//===========================================================================
const RandomDistAddItem = ( inID, inChance ) => {

	bj_randDistID = inID;
	bj_randDistChance = inChance;
	bj_randDistCount = bj_randDistCount + 1;

};

//===========================================================================
const RandomDistChoose = () => {

	let sum = 0;
	let chance = 0;
	let index;
	let foundID = - 1;
	let done;

	// No items?

	if ( ( bj_randDistCount == 0 ) ) {

		return - 1

	}

	// Find sum of all chances
	index = 0;

	while ( true ) {

		sum = sum + bj_randDistChance[ index ];

		index = index + 1;
		if ( index == bj_randDistCount ) break;

	}

	// Choose random number within the total range
	chance = GetRandomInt( 1, sum );

	// Find ID which corresponds to this chance
	index = 0;
	sum = 0;
	done = false;

	while ( true ) {

		sum = sum + bj_randDistChance[ index ];

		if ( ( chance <= sum ) ) {

			foundID = bj_randDistID[ index ];
			done = true;

		}

		index = index + 1;

		if ( ( index == bj_randDistCount ) ) {

			done = true;

		}

		if ( done == true ) break;

	}

	return foundID

};

//***************************************************************************
//*
//*  Drop item
//*
//*  Makes the given unit drop the given item
//*
//*  Note: This could potentially cause problems if the unit is standing
//*        right on the edge of an unpathable area and happens to drop the
//*        item into the unpathable area where nobody can get it...
//*
//***************************************************************************

const UnitDropItem = ( inUnit, inItemID ) => {

	let x;
	let y;
	let radius = 32;
	let unitX;
	let unitY;
	let droppedItem;

	if ( ( inItemID == - 1 ) ) {

		return null

	}

	unitX = GetUnitX( inUnit );
	unitY = GetUnitY( inUnit );

	x = GetRandomReal( unitX - radius, unitX + radius );
	y = GetRandomReal( unitY - radius, unitY + radius );

	droppedItem = CreateItem( inItemID, x, y );

	SetItemDropID( droppedItem, GetUnitTypeId( inUnit ) )
	UpdateStockAvailability( droppedItem )

	return droppedItem

};

//===========================================================================
const WidgetDropItem = ( inWidget, inItemID ) => {

	let x;
	let y;
	let radius = 32;
	let widgetX;
	let widgetY;

	if ( ( inItemID == - 1 ) ) {

		return null

	}

	widgetX = GetWidgetX( inWidget );
	widgetY = GetWidgetY( inWidget );

	x = GetRandomReal( widgetX - radius, widgetX + radius );
	y = GetRandomReal( widgetY - radius, widgetY + radius );

	return CreateItem( inItemID, x, y )

};

