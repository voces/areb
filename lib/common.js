	//============================================================================
	// Native types. All native functions take extended handle types when
	// possible to help prevent passing bad values to native functions
	//

	// Not currently working correctly...

	// Looks up the "name" field for any object (unit, item, ability)

	//===================================================
	// Game Constants    
	//===================================================

	// pfff
	const FALSE = false;
	const TRUE = true;
	const JASS_MAX_ARRAY_SIZE = 32768;

	const PLAYER_NEUTRAL_PASSIVE = GetPlayerNeutralPassive();
	const PLAYER_NEUTRAL_AGGRESSIVE = GetPlayerNeutralAggressive();

	const PLAYER_COLOR_RED = ConvertPlayerColor( 0 );
	const PLAYER_COLOR_BLUE = ConvertPlayerColor( 1 );
	const PLAYER_COLOR_CYAN = ConvertPlayerColor( 2 );
	const PLAYER_COLOR_PURPLE = ConvertPlayerColor( 3 );
	const PLAYER_COLOR_YELLOW = ConvertPlayerColor( 4 );
	const PLAYER_COLOR_ORANGE = ConvertPlayerColor( 5 );
	const PLAYER_COLOR_GREEN = ConvertPlayerColor( 6 );
	const PLAYER_COLOR_PINK = ConvertPlayerColor( 7 );
	const PLAYER_COLOR_LIGHT_GRAY = ConvertPlayerColor( 8 );
	const PLAYER_COLOR_LIGHT_BLUE = ConvertPlayerColor( 9 );
	const PLAYER_COLOR_AQUA = ConvertPlayerColor( 10 );
	const PLAYER_COLOR_BROWN = ConvertPlayerColor( 11 );
	const PLAYER_COLOR_MAROON = ConvertPlayerColor( 12 );
	const PLAYER_COLOR_NAVY = ConvertPlayerColor( 13 );
	const PLAYER_COLOR_TURQUOISE = ConvertPlayerColor( 14 );
	const PLAYER_COLOR_VIOLET = ConvertPlayerColor( 15 );
	const PLAYER_COLOR_WHEAT = ConvertPlayerColor( 16 );
	const PLAYER_COLOR_PEACH = ConvertPlayerColor( 17 );
	const PLAYER_COLOR_MINT = ConvertPlayerColor( 18 );
	const PLAYER_COLOR_LAVENDER = ConvertPlayerColor( 19 );
	const PLAYER_COLOR_COAL = ConvertPlayerColor( 20 );
	const PLAYER_COLOR_SNOW = ConvertPlayerColor( 21 );
	const PLAYER_COLOR_EMERALD = ConvertPlayerColor( 22 );
	const PLAYER_COLOR_PEANUT = ConvertPlayerColor( 23 );

	const RACE_HUMAN = ConvertRace( 1 );
	const RACE_ORC = ConvertRace( 2 );
	const RACE_UNDEAD = ConvertRace( 3 );
	const RACE_NIGHTELF = ConvertRace( 4 );
	const RACE_DEMON = ConvertRace( 5 );
	const RACE_OTHER = ConvertRace( 7 );

	const PLAYER_GAME_RESULT_VICTORY = ConvertPlayerGameResult( 0 );
	const PLAYER_GAME_RESULT_DEFEAT = ConvertPlayerGameResult( 1 );
	const PLAYER_GAME_RESULT_TIE = ConvertPlayerGameResult( 2 );
	const PLAYER_GAME_RESULT_NEUTRAL = ConvertPlayerGameResult( 3 );

	const ALLIANCE_PASSIVE = ConvertAllianceType( 0 );
	const ALLIANCE_HELP_REQUEST = ConvertAllianceType( 1 );
	const ALLIANCE_HELP_RESPONSE = ConvertAllianceType( 2 );
	const ALLIANCE_SHARED_XP = ConvertAllianceType( 3 );
	const ALLIANCE_SHARED_SPELLS = ConvertAllianceType( 4 );
	const ALLIANCE_SHARED_VISION = ConvertAllianceType( 5 );
	const ALLIANCE_SHARED_CONTROL = ConvertAllianceType( 6 );
	const ALLIANCE_SHARED_ADVANCED_CONTROL = ConvertAllianceType( 7 );
	const ALLIANCE_RESCUABLE = ConvertAllianceType( 8 );
	const ALLIANCE_SHARED_VISION_FORCED = ConvertAllianceType( 9 );

	const VERSION_REIGN_OF_CHAOS = ConvertVersion( 0 );
	const VERSION_FROZEN_THRONE = ConvertVersion( 1 );

	const ATTACK_TYPE_NORMAL = ConvertAttackType( 0 );
	const ATTACK_TYPE_MELEE = ConvertAttackType( 1 );
	const ATTACK_TYPE_PIERCE = ConvertAttackType( 2 );
	const ATTACK_TYPE_SIEGE = ConvertAttackType( 3 );
	const ATTACK_TYPE_MAGIC = ConvertAttackType( 4 );
	const ATTACK_TYPE_CHAOS = ConvertAttackType( 5 );
	const ATTACK_TYPE_HERO = ConvertAttackType( 6 );

	const DAMAGE_TYPE_UNKNOWN = ConvertDamageType( 0 );
	const DAMAGE_TYPE_NORMAL = ConvertDamageType( 4 );
	const DAMAGE_TYPE_ENHANCED = ConvertDamageType( 5 );
	const DAMAGE_TYPE_FIRE = ConvertDamageType( 8 );
	const DAMAGE_TYPE_COLD = ConvertDamageType( 9 );
	const DAMAGE_TYPE_LIGHTNING = ConvertDamageType( 10 );
	const DAMAGE_TYPE_POISON = ConvertDamageType( 11 );
	const DAMAGE_TYPE_DISEASE = ConvertDamageType( 12 );
	const DAMAGE_TYPE_DIVINE = ConvertDamageType( 13 );
	const DAMAGE_TYPE_MAGIC = ConvertDamageType( 14 );
	const DAMAGE_TYPE_SONIC = ConvertDamageType( 15 );
	const DAMAGE_TYPE_ACID = ConvertDamageType( 16 );
	const DAMAGE_TYPE_FORCE = ConvertDamageType( 17 );
	const DAMAGE_TYPE_DEATH = ConvertDamageType( 18 );
	const DAMAGE_TYPE_MIND = ConvertDamageType( 19 );
	const DAMAGE_TYPE_PLANT = ConvertDamageType( 20 );
	const DAMAGE_TYPE_DEFENSIVE = ConvertDamageType( 21 );
	const DAMAGE_TYPE_DEMOLITION = ConvertDamageType( 22 );
	const DAMAGE_TYPE_SLOW_POISON = ConvertDamageType( 23 );
	const DAMAGE_TYPE_SPIRIT_LINK = ConvertDamageType( 24 );
	const DAMAGE_TYPE_SHADOW_STRIKE = ConvertDamageType( 25 );
	const DAMAGE_TYPE_UNIVERSAL = ConvertDamageType( 26 );

	const WEAPON_TYPE_WHOKNOWS = ConvertWeaponType( 0 );
	const WEAPON_TYPE_METAL_LIGHT_CHOP = ConvertWeaponType( 1 );
	const WEAPON_TYPE_METAL_MEDIUM_CHOP = ConvertWeaponType( 2 );
	const WEAPON_TYPE_METAL_HEAVY_CHOP = ConvertWeaponType( 3 );
	const WEAPON_TYPE_METAL_LIGHT_SLICE = ConvertWeaponType( 4 );
	const WEAPON_TYPE_METAL_MEDIUM_SLICE = ConvertWeaponType( 5 );
	const WEAPON_TYPE_METAL_HEAVY_SLICE = ConvertWeaponType( 6 );
	const WEAPON_TYPE_METAL_MEDIUM_BASH = ConvertWeaponType( 7 );
	const WEAPON_TYPE_METAL_HEAVY_BASH = ConvertWeaponType( 8 );
	const WEAPON_TYPE_METAL_MEDIUM_STAB = ConvertWeaponType( 9 );
	const WEAPON_TYPE_METAL_HEAVY_STAB = ConvertWeaponType( 10 );
	const WEAPON_TYPE_WOOD_LIGHT_SLICE = ConvertWeaponType( 11 );
	const WEAPON_TYPE_WOOD_MEDIUM_SLICE = ConvertWeaponType( 12 );
	const WEAPON_TYPE_WOOD_HEAVY_SLICE = ConvertWeaponType( 13 );
	const WEAPON_TYPE_WOOD_LIGHT_BASH = ConvertWeaponType( 14 );
	const WEAPON_TYPE_WOOD_MEDIUM_BASH = ConvertWeaponType( 15 );
	const WEAPON_TYPE_WOOD_HEAVY_BASH = ConvertWeaponType( 16 );
	const WEAPON_TYPE_WOOD_LIGHT_STAB = ConvertWeaponType( 17 );
	const WEAPON_TYPE_WOOD_MEDIUM_STAB = ConvertWeaponType( 18 );
	const WEAPON_TYPE_CLAW_LIGHT_SLICE = ConvertWeaponType( 19 );
	const WEAPON_TYPE_CLAW_MEDIUM_SLICE = ConvertWeaponType( 20 );
	const WEAPON_TYPE_CLAW_HEAVY_SLICE = ConvertWeaponType( 21 );
	const WEAPON_TYPE_AXE_MEDIUM_CHOP = ConvertWeaponType( 22 );
	const WEAPON_TYPE_ROCK_HEAVY_BASH = ConvertWeaponType( 23 );

	const PATHING_TYPE_ANY = ConvertPathingType( 0 );
	const PATHING_TYPE_WALKABILITY = ConvertPathingType( 1 );
	const PATHING_TYPE_FLYABILITY = ConvertPathingType( 2 );
	const PATHING_TYPE_BUILDABILITY = ConvertPathingType( 3 );
	const PATHING_TYPE_PEONHARVESTPATHING = ConvertPathingType( 4 );
	const PATHING_TYPE_BLIGHTPATHING = ConvertPathingType( 5 );
	const PATHING_TYPE_FLOATABILITY = ConvertPathingType( 6 );
	const PATHING_TYPE_AMPHIBIOUSPATHING = ConvertPathingType( 7 );

	const MOUSE_BUTTON_TYPE_LEFT = ConvertMouseButtonType( 1 );
	const MOUSE_BUTTON_TYPE_MIDDLE = ConvertMouseButtonType( 2 );
	const MOUSE_BUTTON_TYPE_RIGHT = ConvertMouseButtonType( 3 );

	const ANIM_TYPE_BIRTH = ConvertAnimType( 0 );
	const ANIM_TYPE_DEATH = ConvertAnimType( 1 );
	const ANIM_TYPE_DECAY = ConvertAnimType( 2 );
	const ANIM_TYPE_DISSIPATE = ConvertAnimType( 3 );
	const ANIM_TYPE_STAND = ConvertAnimType( 4 );
	const ANIM_TYPE_WALK = ConvertAnimType( 5 );
	const ANIM_TYPE_ATTACK = ConvertAnimType( 6 );
	const ANIM_TYPE_MORPH = ConvertAnimType( 7 );
	const ANIM_TYPE_SLEEP = ConvertAnimType( 8 );
	const ANIM_TYPE_SPELL = ConvertAnimType( 9 );
	const ANIM_TYPE_PORTRAIT = ConvertAnimType( 10 );

	const SUBANIM_TYPE_ROOTED = ConvertSubAnimType( 11 );
	const SUBANIM_TYPE_ALTERNATE_EX = ConvertSubAnimType( 12 );
	const SUBANIM_TYPE_LOOPING = ConvertSubAnimType( 13 );
	const SUBANIM_TYPE_SLAM = ConvertSubAnimType( 14 );
	const SUBANIM_TYPE_THROW = ConvertSubAnimType( 15 );
	const SUBANIM_TYPE_SPIKED = ConvertSubAnimType( 16 );
	const SUBANIM_TYPE_FAST = ConvertSubAnimType( 17 );
	const SUBANIM_TYPE_SPIN = ConvertSubAnimType( 18 );
	const SUBANIM_TYPE_READY = ConvertSubAnimType( 19 );
	const SUBANIM_TYPE_CHANNEL = ConvertSubAnimType( 20 );
	const SUBANIM_TYPE_DEFEND = ConvertSubAnimType( 21 );
	const SUBANIM_TYPE_VICTORY = ConvertSubAnimType( 22 );
	const SUBANIM_TYPE_TURN = ConvertSubAnimType( 23 );
	const SUBANIM_TYPE_LEFT = ConvertSubAnimType( 24 );
	const SUBANIM_TYPE_RIGHT = ConvertSubAnimType( 25 );
	const SUBANIM_TYPE_FIRE = ConvertSubAnimType( 26 );
	const SUBANIM_TYPE_FLESH = ConvertSubAnimType( 27 );
	const SUBANIM_TYPE_HIT = ConvertSubAnimType( 28 );
	const SUBANIM_TYPE_WOUNDED = ConvertSubAnimType( 29 );
	const SUBANIM_TYPE_LIGHT = ConvertSubAnimType( 30 );
	const SUBANIM_TYPE_MODERATE = ConvertSubAnimType( 31 );
	const SUBANIM_TYPE_SEVERE = ConvertSubAnimType( 32 );
	const SUBANIM_TYPE_CRITICAL = ConvertSubAnimType( 33 );
	const SUBANIM_TYPE_COMPLETE = ConvertSubAnimType( 34 );
	const SUBANIM_TYPE_GOLD = ConvertSubAnimType( 35 );
	const SUBANIM_TYPE_LUMBER = ConvertSubAnimType( 36 );
	const SUBANIM_TYPE_WORK = ConvertSubAnimType( 37 );
	const SUBANIM_TYPE_TALK = ConvertSubAnimType( 38 );
	const SUBANIM_TYPE_FIRST = ConvertSubAnimType( 39 );
	const SUBANIM_TYPE_SECOND = ConvertSubAnimType( 40 );
	const SUBANIM_TYPE_THIRD = ConvertSubAnimType( 41 );
	const SUBANIM_TYPE_FOURTH = ConvertSubAnimType( 42 );
	const SUBANIM_TYPE_FIFTH = ConvertSubAnimType( 43 );
	const SUBANIM_TYPE_ONE = ConvertSubAnimType( 44 );
	const SUBANIM_TYPE_TWO = ConvertSubAnimType( 45 );
	const SUBANIM_TYPE_THREE = ConvertSubAnimType( 46 );
	const SUBANIM_TYPE_FOUR = ConvertSubAnimType( 47 );
	const SUBANIM_TYPE_FIVE = ConvertSubAnimType( 48 );
	const SUBANIM_TYPE_SMALL = ConvertSubAnimType( 49 );
	const SUBANIM_TYPE_MEDIUM = ConvertSubAnimType( 50 );
	const SUBANIM_TYPE_LARGE = ConvertSubAnimType( 51 );
	const SUBANIM_TYPE_UPGRADE = ConvertSubAnimType( 52 );
	const SUBANIM_TYPE_DRAIN = ConvertSubAnimType( 53 );
	const SUBANIM_TYPE_FILL = ConvertSubAnimType( 54 );
	const SUBANIM_TYPE_CHAINLIGHTNING = ConvertSubAnimType( 55 );
	const SUBANIM_TYPE_EATTREE = ConvertSubAnimType( 56 );
	const SUBANIM_TYPE_PUKE = ConvertSubAnimType( 57 );
	const SUBANIM_TYPE_FLAIL = ConvertSubAnimType( 58 );
	const SUBANIM_TYPE_OFF = ConvertSubAnimType( 59 );
	const SUBANIM_TYPE_SWIM = ConvertSubAnimType( 60 );
	const SUBANIM_TYPE_ENTANGLE = ConvertSubAnimType( 61 );
	const SUBANIM_TYPE_BERSERK = ConvertSubAnimType( 62 );

	//===================================================
	// Map Setup Constants    
	//===================================================

	const RACE_PREF_HUMAN = ConvertRacePref( 1 );
	const RACE_PREF_ORC = ConvertRacePref( 2 );
	const RACE_PREF_NIGHTELF = ConvertRacePref( 4 );
	const RACE_PREF_UNDEAD = ConvertRacePref( 8 );
	const RACE_PREF_DEMON = ConvertRacePref( 16 );
	const RACE_PREF_RANDOM = ConvertRacePref( 32 );
	const RACE_PREF_USER_SELECTABLE = ConvertRacePref( 64 );

	const MAP_CONTROL_USER = ConvertMapControl( 0 );
	const MAP_CONTROL_COMPUTER = ConvertMapControl( 1 );
	const MAP_CONTROL_RESCUABLE = ConvertMapControl( 2 );
	const MAP_CONTROL_NEUTRAL = ConvertMapControl( 3 );
	const MAP_CONTROL_CREEP = ConvertMapControl( 4 );
	const MAP_CONTROL_NONE = ConvertMapControl( 5 );

	const GAME_TYPE_MELEE = ConvertGameType( 1 );
	const GAME_TYPE_FFA = ConvertGameType( 2 );
	const GAME_TYPE_USE_MAP_SETTINGS = ConvertGameType( 4 );
	const GAME_TYPE_BLIZ = ConvertGameType( 8 );
	const GAME_TYPE_ONE_ON_ONE = ConvertGameType( 16 );
	const GAME_TYPE_TWO_TEAM_PLAY = ConvertGameType( 32 );
	const GAME_TYPE_THREE_TEAM_PLAY = ConvertGameType( 64 );
	const GAME_TYPE_FOUR_TEAM_PLAY = ConvertGameType( 128 );

	const MAP_FOG_HIDE_TERRAIN = ConvertMapFlag( 1 );
	const MAP_FOG_MAP_EXPLORED = ConvertMapFlag( 2 );
	const MAP_FOG_ALWAYS_VISIBLE = ConvertMapFlag( 4 );

	const MAP_USE_HANDICAPS = ConvertMapFlag( 8 );
	const MAP_OBSERVERS = ConvertMapFlag( 16 );
	const MAP_OBSERVERS_ON_DEATH = ConvertMapFlag( 32 );

	const MAP_FIXED_COLORS = ConvertMapFlag( 128 );

	const MAP_LOCK_RESOURCE_TRADING = ConvertMapFlag( 256 );
	const MAP_RESOURCE_TRADING_ALLIES_ONLY = ConvertMapFlag( 512 );

	const MAP_LOCK_ALLIANCE_CHANGES = ConvertMapFlag( 1024 );
	const MAP_ALLIANCE_CHANGES_HIDDEN = ConvertMapFlag( 2048 );

	const MAP_CHEATS = ConvertMapFlag( 4096 );
	const MAP_CHEATS_HIDDEN = ConvertMapFlag( 8192 );

	const MAP_LOCK_SPEED = ConvertMapFlag( 8192 * 2 );
	const MAP_LOCK_RANDOM_SEED = ConvertMapFlag( 8192 * 4 );
	const MAP_SHARED_ADVANCED_CONTROL = ConvertMapFlag( 8192 * 8 );
	const MAP_RANDOM_HERO = ConvertMapFlag( 8192 * 16 );
	const MAP_RANDOM_RACES = ConvertMapFlag( 8192 * 32 );
	const MAP_RELOADED = ConvertMapFlag( 8192 * 64 );

	const MAP_PLACEMENT_RANDOM = ConvertPlacement( 0 );
	const MAP_PLACEMENT_FIXED = ConvertPlacement( 1 );
	const MAP_PLACEMENT_USE_MAP_SETTINGS = ConvertPlacement( 2 );
	const MAP_PLACEMENT_TEAMS_TOGETHER = ConvertPlacement( 3 );

	const MAP_LOC_PRIO_LOW = ConvertStartLocPrio( 0 );
	const MAP_LOC_PRIO_HIGH = ConvertStartLocPrio( 1 );
	const MAP_LOC_PRIO_NOT = ConvertStartLocPrio( 2 );

	const MAP_DENSITY_NONE = ConvertMapDensity( 0 );
	const MAP_DENSITY_LIGHT = ConvertMapDensity( 1 );
	const MAP_DENSITY_MEDIUM = ConvertMapDensity( 2 );
	const MAP_DENSITY_HEAVY = ConvertMapDensity( 3 );

	const MAP_DIFFICULTY_EASY = ConvertGameDifficulty( 0 );
	const MAP_DIFFICULTY_NORMAL = ConvertGameDifficulty( 1 );
	const MAP_DIFFICULTY_HARD = ConvertGameDifficulty( 2 );
	const MAP_DIFFICULTY_INSANE = ConvertGameDifficulty( 3 );

	const MAP_SPEED_SLOWEST = ConvertGameSpeed( 0 );
	const MAP_SPEED_SLOW = ConvertGameSpeed( 1 );
	const MAP_SPEED_NORMAL = ConvertGameSpeed( 2 );
	const MAP_SPEED_FAST = ConvertGameSpeed( 3 );
	const MAP_SPEED_FASTEST = ConvertGameSpeed( 4 );

	const PLAYER_SLOT_STATE_EMPTY = ConvertPlayerSlotState( 0 );
	const PLAYER_SLOT_STATE_PLAYING = ConvertPlayerSlotState( 1 );
	const PLAYER_SLOT_STATE_LEFT = ConvertPlayerSlotState( 2 );

	//===================================================
	// Sound Constants
	//===================================================
	const SOUND_VOLUMEGROUP_UNITMOVEMENT = ConvertVolumeGroup( 0 );
	const SOUND_VOLUMEGROUP_UNITSOUNDS = ConvertVolumeGroup( 1 );
	const SOUND_VOLUMEGROUP_COMBAT = ConvertVolumeGroup( 2 );
	const SOUND_VOLUMEGROUP_SPELLS = ConvertVolumeGroup( 3 );
	const SOUND_VOLUMEGROUP_UI = ConvertVolumeGroup( 4 );
	const SOUND_VOLUMEGROUP_MUSIC = ConvertVolumeGroup( 5 );
	const SOUND_VOLUMEGROUP_AMBIENTSOUNDS = ConvertVolumeGroup( 6 );
	const SOUND_VOLUMEGROUP_FIRE = ConvertVolumeGroup( 7 );

	//===================================================
	// Game, Player, and Unit States
	//
	// For use with TriggerRegister<X>StateEvent
	//
	//===================================================

	const GAME_STATE_DIVINE_INTERVENTION = ConvertIGameState( 0 );
	const GAME_STATE_DISCONNECTED = ConvertIGameState( 1 );
	const GAME_STATE_TIME_OF_DAY = ConvertFGameState( 2 );

	const PLAYER_STATE_GAME_RESULT = ConvertPlayerState( 0 );

	// current resource levels
	//
	const PLAYER_STATE_RESOURCE_GOLD = ConvertPlayerState( 1 );
	const PLAYER_STATE_RESOURCE_LUMBER = ConvertPlayerState( 2 );
	const PLAYER_STATE_RESOURCE_HERO_TOKENS = ConvertPlayerState( 3 );
	const PLAYER_STATE_RESOURCE_FOOD_CAP = ConvertPlayerState( 4 );
	const PLAYER_STATE_RESOURCE_FOOD_USED = ConvertPlayerState( 5 );
	const PLAYER_STATE_FOOD_CAP_CEILING = ConvertPlayerState( 6 );

	const PLAYER_STATE_GIVES_BOUNTY = ConvertPlayerState( 7 );
	const PLAYER_STATE_ALLIED_VICTORY = ConvertPlayerState( 8 );
	const PLAYER_STATE_PLACED = ConvertPlayerState( 9 );
	const PLAYER_STATE_OBSERVER_ON_DEATH = ConvertPlayerState( 10 );
	const PLAYER_STATE_OBSERVER = ConvertPlayerState( 11 );
	const PLAYER_STATE_UNFOLLOWABLE = ConvertPlayerState( 12 );

	// taxation rate for each resource
	//
	const PLAYER_STATE_GOLD_UPKEEP_RATE = ConvertPlayerState( 13 );
	const PLAYER_STATE_LUMBER_UPKEEP_RATE = ConvertPlayerState( 14 );

	// cumulative resources collected by the player during the mission
	//
	const PLAYER_STATE_GOLD_GATHERED = ConvertPlayerState( 15 );
	const PLAYER_STATE_LUMBER_GATHERED = ConvertPlayerState( 16 );

	const PLAYER_STATE_NO_CREEP_SLEEP = ConvertPlayerState( 25 );

	const UNIT_STATE_LIFE = ConvertUnitState( 0 );
	const UNIT_STATE_MAX_LIFE = ConvertUnitState( 1 );
	const UNIT_STATE_MANA = ConvertUnitState( 2 );
	const UNIT_STATE_MAX_MANA = ConvertUnitState( 3 );

	const AI_DIFFICULTY_NEWBIE = ConvertAIDifficulty( 0 );
	const AI_DIFFICULTY_NORMAL = ConvertAIDifficulty( 1 );
	const AI_DIFFICULTY_INSANE = ConvertAIDifficulty( 2 );

	// player score values
	const PLAYER_SCORE_UNITS_TRAINED = ConvertPlayerScore( 0 );
	const PLAYER_SCORE_UNITS_KILLED = ConvertPlayerScore( 1 );
	const PLAYER_SCORE_STRUCT_BUILT = ConvertPlayerScore( 2 );
	const PLAYER_SCORE_STRUCT_RAZED = ConvertPlayerScore( 3 );
	const PLAYER_SCORE_TECH_PERCENT = ConvertPlayerScore( 4 );
	const PLAYER_SCORE_FOOD_MAXPROD = ConvertPlayerScore( 5 );
	const PLAYER_SCORE_FOOD_MAXUSED = ConvertPlayerScore( 6 );
	const PLAYER_SCORE_HEROES_KILLED = ConvertPlayerScore( 7 );
	const PLAYER_SCORE_ITEMS_GAINED = ConvertPlayerScore( 8 );
	const PLAYER_SCORE_MERCS_HIRED = ConvertPlayerScore( 9 );
	const PLAYER_SCORE_GOLD_MINED_TOTAL = ConvertPlayerScore( 10 );
	const PLAYER_SCORE_GOLD_MINED_UPKEEP = ConvertPlayerScore( 11 );
	const PLAYER_SCORE_GOLD_LOST_UPKEEP = ConvertPlayerScore( 12 );
	const PLAYER_SCORE_GOLD_LOST_TAX = ConvertPlayerScore( 13 );
	const PLAYER_SCORE_GOLD_GIVEN = ConvertPlayerScore( 14 );
	const PLAYER_SCORE_GOLD_RECEIVED = ConvertPlayerScore( 15 );
	const PLAYER_SCORE_LUMBER_TOTAL = ConvertPlayerScore( 16 );
	const PLAYER_SCORE_LUMBER_LOST_UPKEEP = ConvertPlayerScore( 17 );
	const PLAYER_SCORE_LUMBER_LOST_TAX = ConvertPlayerScore( 18 );
	const PLAYER_SCORE_LUMBER_GIVEN = ConvertPlayerScore( 19 );
	const PLAYER_SCORE_LUMBER_RECEIVED = ConvertPlayerScore( 20 );
	const PLAYER_SCORE_UNIT_TOTAL = ConvertPlayerScore( 21 );
	const PLAYER_SCORE_HERO_TOTAL = ConvertPlayerScore( 22 );
	const PLAYER_SCORE_RESOURCE_TOTAL = ConvertPlayerScore( 23 );
	const PLAYER_SCORE_TOTAL = ConvertPlayerScore( 24 );

	//===================================================
	// Game, Player and Unit Events
	//
	//  When an event causes a trigger to fire these
	//  values allow the action code to determine which
	//  event was dispatched and therefore which set of
	//  native functions should be used to get information
	//  about the event.
	//
	// Do NOT change the order or value of these constants
	// without insuring that the JASS_GAME_EVENTS_WAR3 enum
	// is changed to match.
	//
	//===================================================

	//===================================================
	// For use with TriggerRegisterGameEvent    
	//===================================================    

	const EVENT_GAME_VICTORY = ConvertGameEvent( 0 );
	const EVENT_GAME_END_LEVEL = ConvertGameEvent( 1 );

	const EVENT_GAME_VARIABLE_LIMIT = ConvertGameEvent( 2 );
	const EVENT_GAME_STATE_LIMIT = ConvertGameEvent( 3 );

	const EVENT_GAME_TIMER_EXPIRED = ConvertGameEvent( 4 );

	const EVENT_GAME_ENTER_REGION = ConvertGameEvent( 5 );
	const EVENT_GAME_LEAVE_REGION = ConvertGameEvent( 6 );

	const EVENT_GAME_TRACKABLE_HIT = ConvertGameEvent( 7 );
	const EVENT_GAME_TRACKABLE_TRACK = ConvertGameEvent( 8 );

	const EVENT_GAME_SHOW_SKILL = ConvertGameEvent( 9 );
	const EVENT_GAME_BUILD_SUBMENU = ConvertGameEvent( 10 );

	//===================================================
	// For use with TriggerRegisterPlayerEvent
	//===================================================
	const EVENT_PLAYER_STATE_LIMIT = ConvertPlayerEvent( 11 );
	const EVENT_PLAYER_ALLIANCE_CHANGED = ConvertPlayerEvent( 12 );

	const EVENT_PLAYER_DEFEAT = ConvertPlayerEvent( 13 );
	const EVENT_PLAYER_VICTORY = ConvertPlayerEvent( 14 );
	const EVENT_PLAYER_LEAVE = ConvertPlayerEvent( 15 );
	const EVENT_PLAYER_CHAT = ConvertPlayerEvent( 16 );
	const EVENT_PLAYER_END_CINEMATIC = ConvertPlayerEvent( 17 );

	//===================================================
	// For use with TriggerRegisterPlayerUnitEvent
	//===================================================

	const EVENT_PLAYER_UNIT_ATTACKED = ConvertPlayerUnitEvent( 18 );
	const EVENT_PLAYER_UNIT_RESCUED = ConvertPlayerUnitEvent( 19 );

	const EVENT_PLAYER_UNIT_DEATH = ConvertPlayerUnitEvent( 20 );
	const EVENT_PLAYER_UNIT_DECAY = ConvertPlayerUnitEvent( 21 );

	const EVENT_PLAYER_UNIT_DETECTED = ConvertPlayerUnitEvent( 22 );
	const EVENT_PLAYER_UNIT_HIDDEN = ConvertPlayerUnitEvent( 23 );

	const EVENT_PLAYER_UNIT_SELECTED = ConvertPlayerUnitEvent( 24 );
	const EVENT_PLAYER_UNIT_DESELECTED = ConvertPlayerUnitEvent( 25 );

	const EVENT_PLAYER_UNIT_CONSTRUCT_START = ConvertPlayerUnitEvent( 26 );
	const EVENT_PLAYER_UNIT_CONSTRUCT_CANCEL = ConvertPlayerUnitEvent( 27 );
	const EVENT_PLAYER_UNIT_CONSTRUCT_FINISH = ConvertPlayerUnitEvent( 28 );

	const EVENT_PLAYER_UNIT_UPGRADE_START = ConvertPlayerUnitEvent( 29 );
	const EVENT_PLAYER_UNIT_UPGRADE_CANCEL = ConvertPlayerUnitEvent( 30 );
	const EVENT_PLAYER_UNIT_UPGRADE_FINISH = ConvertPlayerUnitEvent( 31 );

	const EVENT_PLAYER_UNIT_TRAIN_START = ConvertPlayerUnitEvent( 32 );
	const EVENT_PLAYER_UNIT_TRAIN_CANCEL = ConvertPlayerUnitEvent( 33 );
	const EVENT_PLAYER_UNIT_TRAIN_FINISH = ConvertPlayerUnitEvent( 34 );

	const EVENT_PLAYER_UNIT_RESEARCH_START = ConvertPlayerUnitEvent( 35 );
	const EVENT_PLAYER_UNIT_RESEARCH_CANCEL = ConvertPlayerUnitEvent( 36 );
	const EVENT_PLAYER_UNIT_RESEARCH_FINISH = ConvertPlayerUnitEvent( 37 );
	const EVENT_PLAYER_UNIT_ISSUED_ORDER = ConvertPlayerUnitEvent( 38 );
	const EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER = ConvertPlayerUnitEvent( 39 );
	const EVENT_PLAYER_UNIT_ISSUED_TARGET_ORDER = ConvertPlayerUnitEvent( 40 );
	const EVENT_PLAYER_UNIT_ISSUED_UNIT_ORDER = ConvertPlayerUnitEvent( 40 );

	const EVENT_PLAYER_HERO_LEVEL = ConvertPlayerUnitEvent( 41 );
	const EVENT_PLAYER_HERO_SKILL = ConvertPlayerUnitEvent( 42 );

	const EVENT_PLAYER_HERO_REVIVABLE = ConvertPlayerUnitEvent( 43 );

	const EVENT_PLAYER_HERO_REVIVE_START = ConvertPlayerUnitEvent( 44 );
	const EVENT_PLAYER_HERO_REVIVE_CANCEL = ConvertPlayerUnitEvent( 45 );
	const EVENT_PLAYER_HERO_REVIVE_FINISH = ConvertPlayerUnitEvent( 46 );
	const EVENT_PLAYER_UNIT_SUMMON = ConvertPlayerUnitEvent( 47 );
	const EVENT_PLAYER_UNIT_DROP_ITEM = ConvertPlayerUnitEvent( 48 );
	const EVENT_PLAYER_UNIT_PICKUP_ITEM = ConvertPlayerUnitEvent( 49 );
	const EVENT_PLAYER_UNIT_USE_ITEM = ConvertPlayerUnitEvent( 50 );

	const EVENT_PLAYER_UNIT_LOADED = ConvertPlayerUnitEvent( 51 );

	//===================================================
	// For use with TriggerRegisterUnitEvent
	//===================================================

	const EVENT_UNIT_DAMAGED = ConvertUnitEvent( 52 );
	const EVENT_UNIT_DEATH = ConvertUnitEvent( 53 );
	const EVENT_UNIT_DECAY = ConvertUnitEvent( 54 );
	const EVENT_UNIT_DETECTED = ConvertUnitEvent( 55 );
	const EVENT_UNIT_HIDDEN = ConvertUnitEvent( 56 );
	const EVENT_UNIT_SELECTED = ConvertUnitEvent( 57 );
	const EVENT_UNIT_DESELECTED = ConvertUnitEvent( 58 );

	const EVENT_UNIT_STATE_LIMIT = ConvertUnitEvent( 59 );

	// Events which may have a filter for the "other unit"              
	//                                                                  
	const EVENT_UNIT_ACQUIRED_TARGET = ConvertUnitEvent( 60 );
	const EVENT_UNIT_TARGET_IN_RANGE = ConvertUnitEvent( 61 );
	const EVENT_UNIT_ATTACKED = ConvertUnitEvent( 62 );
	const EVENT_UNIT_RESCUED = ConvertUnitEvent( 63 );

	const EVENT_UNIT_CONSTRUCT_CANCEL = ConvertUnitEvent( 64 );
	const EVENT_UNIT_CONSTRUCT_FINISH = ConvertUnitEvent( 65 );

	const EVENT_UNIT_UPGRADE_START = ConvertUnitEvent( 66 );
	const EVENT_UNIT_UPGRADE_CANCEL = ConvertUnitEvent( 67 );
	const EVENT_UNIT_UPGRADE_FINISH = ConvertUnitEvent( 68 );

	// Events which involve the specified unit performing               
	// training of other units                                          
	//                                                                  
	const EVENT_UNIT_TRAIN_START = ConvertUnitEvent( 69 );
	const EVENT_UNIT_TRAIN_CANCEL = ConvertUnitEvent( 70 );
	const EVENT_UNIT_TRAIN_FINISH = ConvertUnitEvent( 71 );

	const EVENT_UNIT_RESEARCH_START = ConvertUnitEvent( 72 );
	const EVENT_UNIT_RESEARCH_CANCEL = ConvertUnitEvent( 73 );
	const EVENT_UNIT_RESEARCH_FINISH = ConvertUnitEvent( 74 );

	const EVENT_UNIT_ISSUED_ORDER = ConvertUnitEvent( 75 );
	const EVENT_UNIT_ISSUED_POINT_ORDER = ConvertUnitEvent( 76 );
	const EVENT_UNIT_ISSUED_TARGET_ORDER = ConvertUnitEvent( 77 );

	const EVENT_UNIT_HERO_LEVEL = ConvertUnitEvent( 78 );
	const EVENT_UNIT_HERO_SKILL = ConvertUnitEvent( 79 );

	const EVENT_UNIT_HERO_REVIVABLE = ConvertUnitEvent( 80 );
	const EVENT_UNIT_HERO_REVIVE_START = ConvertUnitEvent( 81 );
	const EVENT_UNIT_HERO_REVIVE_CANCEL = ConvertUnitEvent( 82 );
	const EVENT_UNIT_HERO_REVIVE_FINISH = ConvertUnitEvent( 83 );

	const EVENT_UNIT_SUMMON = ConvertUnitEvent( 84 );

	const EVENT_UNIT_DROP_ITEM = ConvertUnitEvent( 85 );
	const EVENT_UNIT_PICKUP_ITEM = ConvertUnitEvent( 86 );
	const EVENT_UNIT_USE_ITEM = ConvertUnitEvent( 87 );

	const EVENT_UNIT_LOADED = ConvertUnitEvent( 88 );

	const EVENT_WIDGET_DEATH = ConvertWidgetEvent( 89 );

	const EVENT_DIALOG_BUTTON_CLICK = ConvertDialogEvent( 90 );
	const EVENT_DIALOG_CLICK = ConvertDialogEvent( 91 );

	//===================================================
	// Frozen Throne Expansion Events
	// Need to be added here to preserve compat
	//===================================================    

	const EVENT_GAME_LOADED = ConvertGameEvent( 256 );
	const EVENT_GAME_TOURNAMENT_FINISH_SOON = ConvertGameEvent( 257 );
	const EVENT_GAME_TOURNAMENT_FINISH_NOW = ConvertGameEvent( 258 );
	const EVENT_GAME_SAVE = ConvertGameEvent( 259 );

	//===================================================
	// For use with TriggerRegisterPlayerEvent
	//===================================================

	const EVENT_PLAYER_ARROW_LEFT_DOWN = ConvertPlayerEvent( 261 );
	const EVENT_PLAYER_ARROW_LEFT_UP = ConvertPlayerEvent( 262 );
	const EVENT_PLAYER_ARROW_RIGHT_DOWN = ConvertPlayerEvent( 263 );
	const EVENT_PLAYER_ARROW_RIGHT_UP = ConvertPlayerEvent( 264 );
	const EVENT_PLAYER_ARROW_DOWN_DOWN = ConvertPlayerEvent( 265 );
	const EVENT_PLAYER_ARROW_DOWN_UP = ConvertPlayerEvent( 266 );
	const EVENT_PLAYER_ARROW_UP_DOWN = ConvertPlayerEvent( 267 );
	const EVENT_PLAYER_ARROW_UP_UP = ConvertPlayerEvent( 268 );
	const EVENT_PLAYER_MOUSE_DOWN = ConvertPlayerEvent( 305 );
	const EVENT_PLAYER_MOUSE_UP = ConvertPlayerEvent( 306 );
	const EVENT_PLAYER_MOUSE_MOVE = ConvertPlayerEvent( 307 );

	//===================================================
	// For use with TriggerRegisterPlayerUnitEvent
	//===================================================

	const EVENT_PLAYER_UNIT_SELL = ConvertPlayerUnitEvent( 269 );
	const EVENT_PLAYER_UNIT_CHANGE_OWNER = ConvertPlayerUnitEvent( 270 );
	const EVENT_PLAYER_UNIT_SELL_ITEM = ConvertPlayerUnitEvent( 271 );
	const EVENT_PLAYER_UNIT_SPELL_CHANNEL = ConvertPlayerUnitEvent( 272 );
	const EVENT_PLAYER_UNIT_SPELL_CAST = ConvertPlayerUnitEvent( 273 );
	const EVENT_PLAYER_UNIT_SPELL_EFFECT = ConvertPlayerUnitEvent( 274 );
	const EVENT_PLAYER_UNIT_SPELL_FINISH = ConvertPlayerUnitEvent( 275 );
	const EVENT_PLAYER_UNIT_SPELL_ENDCAST = ConvertPlayerUnitEvent( 276 );
	const EVENT_PLAYER_UNIT_PAWN_ITEM = ConvertPlayerUnitEvent( 277 );

	//===================================================
	// For use with TriggerRegisterUnitEvent
	//===================================================

	const EVENT_UNIT_SELL = ConvertUnitEvent( 286 );
	const EVENT_UNIT_CHANGE_OWNER = ConvertUnitEvent( 287 );
	const EVENT_UNIT_SELL_ITEM = ConvertUnitEvent( 288 );
	const EVENT_UNIT_SPELL_CHANNEL = ConvertUnitEvent( 289 );
	const EVENT_UNIT_SPELL_CAST = ConvertUnitEvent( 290 );
	const EVENT_UNIT_SPELL_EFFECT = ConvertUnitEvent( 291 );
	const EVENT_UNIT_SPELL_FINISH = ConvertUnitEvent( 292 );
	const EVENT_UNIT_SPELL_ENDCAST = ConvertUnitEvent( 293 );
	const EVENT_UNIT_PAWN_ITEM = ConvertUnitEvent( 294 );

	//===================================================
	// Limit Event API constants    
	// variable, player state, game state, and unit state events
	// ( do NOT change the order of these... )
	//===================================================
	const LESS_THAN = ConvertLimitOp( 0 );
	const LESS_THAN_OR_EQUAL = ConvertLimitOp( 1 );
	const EQUAL = ConvertLimitOp( 2 );
	const GREATER_THAN_OR_EQUAL = ConvertLimitOp( 3 );
	const GREATER_THAN = ConvertLimitOp( 4 );
	const NOT_EQUAL = ConvertLimitOp( 5 );

	//===================================================
	// Unit Type Constants for use with IsUnitType()
	//===================================================

	const UNIT_TYPE_HERO = ConvertUnitType( 0 );
	const UNIT_TYPE_DEAD = ConvertUnitType( 1 );
	const UNIT_TYPE_STRUCTURE = ConvertUnitType( 2 );

	const UNIT_TYPE_FLYING = ConvertUnitType( 3 );
	const UNIT_TYPE_GROUND = ConvertUnitType( 4 );

	const UNIT_TYPE_ATTACKS_FLYING = ConvertUnitType( 5 );
	const UNIT_TYPE_ATTACKS_GROUND = ConvertUnitType( 6 );

	const UNIT_TYPE_MELEE_ATTACKER = ConvertUnitType( 7 );
	const UNIT_TYPE_RANGED_ATTACKER = ConvertUnitType( 8 );

	const UNIT_TYPE_GIANT = ConvertUnitType( 9 );
	const UNIT_TYPE_SUMMONED = ConvertUnitType( 10 );
	const UNIT_TYPE_STUNNED = ConvertUnitType( 11 );
	const UNIT_TYPE_PLAGUED = ConvertUnitType( 12 );
	const UNIT_TYPE_SNARED = ConvertUnitType( 13 );

	const UNIT_TYPE_UNDEAD = ConvertUnitType( 14 );
	const UNIT_TYPE_MECHANICAL = ConvertUnitType( 15 );
	const UNIT_TYPE_PEON = ConvertUnitType( 16 );
	const UNIT_TYPE_SAPPER = ConvertUnitType( 17 );
	const UNIT_TYPE_TOWNHALL = ConvertUnitType( 18 );
	const UNIT_TYPE_ANCIENT = ConvertUnitType( 19 );

	const UNIT_TYPE_TAUREN = ConvertUnitType( 20 );
	const UNIT_TYPE_POISONED = ConvertUnitType( 21 );
	const UNIT_TYPE_POLYMORPHED = ConvertUnitType( 22 );
	const UNIT_TYPE_SLEEPING = ConvertUnitType( 23 );
	const UNIT_TYPE_RESISTANT = ConvertUnitType( 24 );
	const UNIT_TYPE_ETHEREAL = ConvertUnitType( 25 );
	const UNIT_TYPE_MAGIC_IMMUNE = ConvertUnitType( 26 );

	//===================================================
	// Unit Type Constants for use with ChooseRandomItemEx()
	//===================================================

	const ITEM_TYPE_PERMANENT = ConvertItemType( 0 );
	const ITEM_TYPE_CHARGED = ConvertItemType( 1 );
	const ITEM_TYPE_POWERUP = ConvertItemType( 2 );
	const ITEM_TYPE_ARTIFACT = ConvertItemType( 3 );
	const ITEM_TYPE_PURCHASABLE = ConvertItemType( 4 );
	const ITEM_TYPE_CAMPAIGN = ConvertItemType( 5 );
	const ITEM_TYPE_MISCELLANEOUS = ConvertItemType( 6 );
	const ITEM_TYPE_UNKNOWN = ConvertItemType( 7 );
	const ITEM_TYPE_ANY = ConvertItemType( 8 );

	// Deprecated, should use ITEM_TYPE_POWERUP
	const ITEM_TYPE_TOME = ConvertItemType( 2 );

	//===================================================
	// Animatable Camera Fields
	//===================================================

	const CAMERA_FIELD_TARGET_DISTANCE = ConvertCameraField( 0 );
	const CAMERA_FIELD_FARZ = ConvertCameraField( 1 );
	const CAMERA_FIELD_ANGLE_OF_ATTACK = ConvertCameraField( 2 );
	const CAMERA_FIELD_FIELD_OF_VIEW = ConvertCameraField( 3 );
	const CAMERA_FIELD_ROLL = ConvertCameraField( 4 );
	const CAMERA_FIELD_ROTATION = ConvertCameraField( 5 );
	const CAMERA_FIELD_ZOFFSET = ConvertCameraField( 6 );
	const CAMERA_FIELD_NEARZ = ConvertCameraField( 7 );

	const BLEND_MODE_NONE = ConvertBlendMode( 0 );
	const BLEND_MODE_DONT_CARE = ConvertBlendMode( 0 );
	const BLEND_MODE_KEYALPHA = ConvertBlendMode( 1 );
	const BLEND_MODE_BLEND = ConvertBlendMode( 2 );
	const BLEND_MODE_ADDITIVE = ConvertBlendMode( 3 );
	const BLEND_MODE_MODULATE = ConvertBlendMode( 4 );
	const BLEND_MODE_MODULATE_2X = ConvertBlendMode( 5 );

	const RARITY_FREQUENT = ConvertRarityControl( 0 );
	const RARITY_RARE = ConvertRarityControl( 1 );

	const TEXMAP_FLAG_NONE = ConvertTexMapFlags( 0 );
	const TEXMAP_FLAG_WRAP_U = ConvertTexMapFlags( 1 );
	const TEXMAP_FLAG_WRAP_V = ConvertTexMapFlags( 2 );
	const TEXMAP_FLAG_WRAP_UV = ConvertTexMapFlags( 3 );

	const FOG_OF_WAR_MASKED = ConvertFogState( 1 );
	const FOG_OF_WAR_FOGGED = ConvertFogState( 2 );
	const FOG_OF_WAR_VISIBLE = ConvertFogState( 4 );

	//===================================================
	// Camera Margin constants for use with GetCameraMargin
	//===================================================

	const CAMERA_MARGIN_LEFT = 0;
	const CAMERA_MARGIN_RIGHT = 1;
	const CAMERA_MARGIN_TOP = 2;
	const CAMERA_MARGIN_BOTTOM = 3;

	//===================================================
	// Effect API constants
	//===================================================

	const EFFECT_TYPE_EFFECT = ConvertEffectType( 0 );
	const EFFECT_TYPE_TARGET = ConvertEffectType( 1 );
	const EFFECT_TYPE_CASTER = ConvertEffectType( 2 );
	const EFFECT_TYPE_SPECIAL = ConvertEffectType( 3 );
	const EFFECT_TYPE_AREA_EFFECT = ConvertEffectType( 4 );
	const EFFECT_TYPE_MISSILE = ConvertEffectType( 5 );
	const EFFECT_TYPE_LIGHTNING = ConvertEffectType( 6 );

	const SOUND_TYPE_EFFECT = ConvertSoundType( 0 );
	const SOUND_TYPE_EFFECT_LOOPED = ConvertSoundType( 1 );

	//============================================================================
	// MathAPI

	// Expect values between -1 and 1...returns 0 for invalid input

	// Returns 0 if x and y are both 0

	// Returns 0 if x <= 0

	// computes x to the y power
	// y == 0.0             => 1
	// x ==0.0 and y < 0    => 0
	//

	//============================================================================
	// String Utility API

	//============================================================================
	// Map Setup API
	//
	//  These are native functions for describing the map configuration
	//  these funcs should only be used in the "config" function of
	//  a map script. The functions should also be called in this order
	//  ( i.e. call SetPlayers before SetPlayerColor...
	//

	// forces player to have the specified start loc and marks the start loc as occupied
	// which removes it from consideration for subsequently placed players
	// ( i.e. you can use this to put people in a fixed loc and then
	//   use random placement for any unplaced players etc )

	//============================================================================
	// Timer API
	//

	//============================================================================
	// Group API
	//

	// This will be difficult to support with potentially disjoint, cell-based regions
	// as it would involve enumerating all the cells that are covered by a particularregion
	// a better implementation would be a trigger that adds relevant units as they enter
	// and removes them if they leave...

	//============================================================================
	// Force API
	//

	//============================================================================
	// Region and Location API
	//

	// This function is asynchronous. The values it returns are not guaranteed synchronous between each player.
	//  If you attempt to use it in a synchronous manner, it may cause a desync.

	// Returns full map bounds, including unplayable borders, in world coordinates

	//============================================================================
	// Native trigger interface
	//

	//============================================================================
	// Boolean Expr API ( for compositing trigger conditions and unit filter funcs...)
	//============================================================================

	//============================================================================
	// Trigger Game Event API
	//============================================================================

	// EVENT_GAME_VARIABLE_LIMIT
	//constant native string GetTriggeringVariableName takes nothing returns string

	// Creates it's own timer and triggers when it expires

	// Triggers when the timer you tell it about expires

	//  EVENT_GAME_STATE_LIMIT

	// EVENT_GAME_VICTORY

	// EVENT_GAME_ENTER_REGION

	// EVENT_GAME_LEAVE_REGION

	// EVENT_GAME_TRACKABLE_HIT
	// EVENT_GAME_TRACKABLE_TRACK

	// EVENT_DIALOG_BUTTON_CLICK

	// EVENT_GAME_TOURNAMENT_FINISH_SOON

	// EVENT_GAME_SAVE

	//============================================================================
	// Trigger Player Based Event API
	//============================================================================

	// EVENT_PLAYER_DEFEAT
	// EVENT_PLAYER_VICTORY

	// EVENT_PLAYER_HERO_LEVEL
	// EVENT_UNIT_HERO_LEVEL

	// EVENT_PLAYER_HERO_SKILL
	// EVENT_UNIT_HERO_SKILL

	// EVENT_PLAYER_HERO_REVIVABLE

	// EVENT_PLAYER_HERO_REVIVE_START
	// EVENT_PLAYER_HERO_REVIVE_CANCEL
	// EVENT_PLAYER_HERO_REVIVE_FINISH
	// EVENT_UNIT_HERO_REVIVE_START
	// EVENT_UNIT_HERO_REVIVE_CANCEL
	// EVENT_UNIT_HERO_REVIVE_FINISH

	// EVENT_PLAYER_UNIT_ATTACKED

	// EVENT_PLAYER_UNIT_RESCUED

	// EVENT_PLAYER_UNIT_DEATH

	// EVENT_PLAYER_UNIT_DECAY

	// EVENT_PLAYER_UNIT_SELECTED
	//constant native GetSelectedUnit takes nothing returns unit

	// EVENT_PLAYER_UNIT_CONSTRUCT_START

	// EVENT_PLAYER_UNIT_CONSTRUCT_FINISH
	// EVENT_PLAYER_UNIT_CONSTRUCT_CANCEL

	// EVENT_PLAYER_UNIT_RESEARCH_START
	// EVENT_PLAYER_UNIT_RESEARCH_CANCEL
	// EVENT_PLAYER_UNIT_RESEARCH_FINISH

	// EVENT_PLAYER_UNIT_TRAIN_START
	// EVENT_PLAYER_UNIT_TRAIN_CANCEL

	// EVENT_PLAYER_UNIT_TRAIN_FINISH

	// EVENT_PLAYER_UNIT_DETECTED

	// EVENT_PLAYER_UNIT_SUMMONED

	// EVENT_PLAYER_UNIT_LOADED

	// EVENT_PLAYER_UNIT_SELL

	// EVENT_PLAYER_UNIT_SELL_ITEM

	// EVENT_PLAYER_UNIT_CHANGE_OWNER

	// EVENT_PLAYER_UNIT_DROP_ITEM
	// EVENT_PLAYER_UNIT_PICKUP_ITEM
	// EVENT_PLAYER_UNIT_USE_ITEM

	// EVENT_PLAYER_UNIT_ISSUED_ORDER

	// EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER

	// EVENT_PLAYER_UNIT_ISSUED_TARGET_ORDER

	// EVENT_UNIT_SPELL_CHANNEL
	// EVENT_UNIT_SPELL_CAST
	// EVENT_UNIT_SPELL_EFFECT
	// EVENT_UNIT_SPELL_FINISH
	// EVENT_UNIT_SPELL_ENDCAST
	// EVENT_PLAYER_UNIT_SPELL_CHANNEL
	// EVENT_PLAYER_UNIT_SPELL_CAST
	// EVENT_PLAYER_UNIT_SPELL_EFFECT
	// EVENT_PLAYER_UNIT_SPELL_FINISH
	// EVENT_PLAYER_UNIT_SPELL_ENDCAST

	// EVENT_PLAYER_STATE_LIMIT

	// EVENT_PLAYER_CHAT

	// returns the actual string they typed in ( same as what you registered for
	// if you required exact match )

	// returns the string that you registered for

	//============================================================================
	// Trigger Unit Based Event API
	//============================================================================

	// returns handle to unit which triggered the most recent event when called from
	// within a trigger action function...returns null handle when used incorrectly

	// EVENT_UNIT_STATE_LIMIT

	// EVENT_UNIT_DAMAGED

	// EVENT_UNIT_DEATH
	// EVENT_UNIT_DECAY
	// Use the GetDyingUnit and GetDecayingUnit funcs above

	// EVENT_UNIT_DETECTED 

	// EVENT_UNIT_ACQUIRED_TARGET
	// EVENT_UNIT_TARGET_IN_RANGE

	// EVENT_UNIT_ATTACKED
	// Use GetAttacker from the Player Unit Event API Below...

	// EVENT_UNIT_RESCUEDED
	// Use GetRescuer from the Player Unit Event API Below...

	// EVENT_UNIT_CONSTRUCT_CANCEL
	// EVENT_UNIT_CONSTRUCT_FINISH

	// See the Player Unit Construction Event API above for event info funcs

	// EVENT_UNIT_TRAIN_START
	// EVENT_UNIT_TRAIN_CANCELLED
	// EVENT_UNIT_TRAIN_FINISH

	// See the Player Unit Training Event API above for event info funcs

	// EVENT_UNIT_SELL

	// See the Player Unit Sell Event API above for event info funcs

	// EVENT_UNIT_DROP_ITEM
	// EVENT_UNIT_PICKUP_ITEM
	// EVENT_UNIT_USE_ITEM
	// See the Player Unit/Item manipulation Event API above for event info funcs

	// EVENT_UNIT_ISSUED_ORDER
	// EVENT_UNIT_ISSUED_POINT_ORDER
	// EVENT_UNIT_ISSUED_TARGET_ORDER

	// See the Player Unit Order Event API above for event info funcs

	//============================================================================
	// Widget API

	//============================================================================
	// Destructable Object API
	// Facing arguments are specified in degrees

	//============================================================================
	// Item API

	//============================================================================
	// Unit API
	// Facing arguments are specified in degrees

	//native        SetUnitPointValueByType takes integer unitType, integer newPointValue returns nothing

	//============================================================================
	// Player API

	// Used to store hero level data for the scorescreen
	// before units are moved to neutral passive in melee games
	//

	//============================================================================
	// Fog of War API

	//============================================================================
	// Game API

	// Async only!

	// %%% SetCampaignMenuRace is deprecated.  It must remain to support
	// old maps which use it, but all new maps should use SetCampaignMenuRaceEx

	//============================================================================
	// Campaign API

	//============================================================================
	// Dialog API

	// Creates a new or reads in an existing game cache file stored
	// in the current campaign profile dir
	//

	// Will return 0 if the specified value's data is not found in the cache

	//============================================================================
	// Randomization API

	// Choose any random unit/item. (NP means Neutral Passive)

	//============================================================================
	// Visual API

	//============================================================================
	// Trackable API

	//============================================================================
	// Quest API

	//============================================================================
	// Timer Dialog API

	//============================================================================
	// Leaderboard API

	// Create a leaderboard object

	//============================================================================
	// Multiboard API
	//============================================================================

	// Create a multiboard object

	// broadcast settings to all items

	// funcs for modifying individual items

	// meant to unequivocally suspend display of existing and
	// subsequently displayed multiboards
	//

	//============================================================================
	// Camera API

	// These return values for the local players camera only...

	//============================================================================
	// Sound API
	//

	// the following method must be called immediately after calling "StartSound" 

	// these calls are only valid if the sound was created with 3d enabled

	// Music Interface. Note that if music is disabled, these calls do nothing

	// other music and sound calls

	//============================================================================
	// Effects API
	//

	//============================================================================
	// Terrain API
	//

	//============================================================================
	// Image API
	//

	//============================================================================
	// Ubersplat API
	//

	//============================================================================
	// Blight API
	//

	//============================================================================
	// Doodad API
	//

	//============================================================================
	// Computer AI interface
	//

	//============================================================================

	// Automation Test

	// JAPI Functions

	// Add this function to follow the style of GetUnitX and GetUnitY, it has the same result as BlzGetLocalUnitZ

