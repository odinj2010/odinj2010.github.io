/* ==========================================================================
   AUTHENTIC DATA STORE (js/tutorials-data.js)
   --------------------------------------------------------------------------
   Structured hierarchical data for NfgOdin (NFG):
   1. Order: AI -> Software -> Modding
   2. All projects marked 'Active' (none 'Completed')
   3. digit.ai placed under AI
   4. 'Hardware & SBC' renamed to 'Raspberry Pi' (filter tag: 'Raspberry Pi 5')
   ========================================================================== */

/**
 * Projects data structured: AI -> Software -> Modding
 */
export const projectTree = [
  {
    id: "ai",
    title: "AI",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    description: "Hierarchical reinforcement learning frameworks, autonomous game-playing agents, and AI desktop companions.",
    subcategories: [
      {
        id: "rl",
        title: "Reinforcement Learning",
        description: "Emulation hooks and autonomous agent training algorithms.",
        projects: [
          {
            id: "pokemon-yellow-ai",
            title: "PokemonYellow-HRL-AI",
            platform: "Pokemon Yellow",
            status: "Active",
            description: "Hierarchical Reinforcement Learning (HRL) framework training an intelligent autonomous agent to navigate, battle, and beat Pokémon Yellow via Game Boy emulation hooks.",
            tech: ["Python", "Reinforcement Learning", "Gym / Emulation API"],
            githubUrl: "https://github.com/odinj2010/PokemonYellow-HRL-AI",
            guideUrl: "#/tutorials/ai/rl/hrl-environment-setup"
          }
        ]
      },
      {
        id: "assistants",
        title: "AI Companions",
        description: "Desktop companions and generative assistance tooling.",
        projects: [
          {
            id: "digit-ai",
            title: "digit.ai",
            platform: "Desktop",
            status: "Active",
            description: "Desktop companion application and local assistant interface built for desktop productivity.",
            tech: ["Python", "AI Desktop Companion"],
            githubUrl: "https://github.com/odinj2010/digit.ai"
          }
        ]
      }
    ]
  },
  {
    id: "software",
    title: "Software",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
    description: "Standalone desktop software, mod management utilities, audio acoustics CAD, and Raspberry Pi system tooling.",
    subcategories: [
      {
        id: "desktop",
        title: "Desktop Applications",
        description: "Standalone GUI software and engineering workstations.",
        projects: [
          {
            id: "runebox",
            title: "RuneBox - Audio CAD & Acoustics Lab",
            platform: "Audio CAD",
            status: "Active",
            description: "Commercial-grade car audio subwoofer enclosure CAD & acoustics laboratory featuring pure Python 3D vector visualization, wiring schematics, and precision cut sheets.",
            tech: ["Python", "3D Vector Graphics", "Acoustics CAD"],
            githubUrl: "https://github.com/odinj2010/RuneBox",
            guideUrl: "#/tutorials/software/desktop/enclosure-tuning"
          }
        ]
      },
      {
        id: "raspberry-pi",
        title: "Raspberry Pi",
        description: "Embedded Linux controllers, hardware daemons, and system tooling for single-board computers.",
        projects: [
          {
            id: "sbc-core",
            title: "SBC-Core",
            platform: "Pi 5",
            status: "Active",
            description: "Core utility suite, daemon controller, and hardware interface system built specifically for Raspberry Pi 5 single-board computer environments.",
            tech: ["Python", "Raspberry Pi 5", "Linux / Hardware"],
            githubUrl: "https://github.com/odinj2010/SBC-Core"
          }
        ]
      }
    ]
  },
  {
    id: "modding",
    title: "Modding",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 2 18 2 18 6 6 6 6 2"/><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="6" x2="6.01" y1="13" y2="13"/><line x1="10" x2="10.01" y1="13" y2="13"/><line x1="15" x2="19" y1="12" y2="12"/><line x1="17" x2="17" y1="10" y2="14"/></svg>`,
    description: "Memory hook engines, game modifications, and specialized asset editors for classic RPGs and sandbox games.",
    subcategories: [
      {
        id: "loaders",
        title: "Loaders",
        description: "Native C++ memory hook engines and runtime DLL injectors.",
        projects: [
          {
            id: "ffviise-mod-loader",
            title: "Final Fantasy VII Mod Loader (2026 Re-release Steam Edition)",
            platform: "Final Fantasy VII",
            status: "Active",
            description: "A lightweight, portable, and high-performance native mod loader for the Final Fantasy VII Steam Edition re-release, bypassing third-party overhead.",
            tech: ["C++", "Win32 API", "Game Hooks", "Memory Injection"],
            githubUrl: "https://github.com/odinj2010/FFVIISE_Mod_Loader",
            nexusUrl: "https://www.nexusmods.com/finalfantasy7/mods/157",
            guideUrl: "#/tutorials/modding/loaders/ffviise-loader"
          }
        ]
      },
      {
        id: "mods",
        title: "Mods",
        description: "In-game mechanics, dimensional portals, and resource management mods.",
        projects: [
          {
            id: "riftlink",
            title: "RiftLink",
            platform: "Minecraft",
            game: "Minecraft",
            status: "Active",
            description: "A modern gameplay, dimensional mechanics, and custom utility mod currently in active development for Minecraft 1.21.1 on the NeoForge mod loader platform.",
            tech: ["Java", "NeoForge", "Minecraft", "1.21.1"],
            githubUrl: "https://github.com/odinj2010/RiftLink",
            guideUrl: "#/tutorials/modding/mods/installing-riftlink"
          },
          {
            id: "sticky-resources",
            title: "StickyResources",
            platform: "Minecraft",
            game: "Minecraft",
            status: "Active",
            description: "Custom Java-based gameplay enhancement and resource automation mod for Minecraft 1.20.1 on the Forge mod loader platform.",
            tech: ["Java", "Forge", "Minecraft", "1.20.1"],
            githubUrl: "https://github.com/odinj2010/StickyResources",
            curseforgeUrl: "https://www.curseforge.com/minecraft/mc-mods/sticky-resources"
          },
          {
            id: "ffvii-159",
            title: "Final Fantasy VII Difficulty Mod (2026 Re-release Steam Edition)",
            platform: "Final Fantasy VII",
            game: "Final Fantasy VII",
            status: "Active",
            description: "Custom balance overhaul retuning encounter dynamics, enemy AI behaviors, and stats for the 2026 Steam re-release.",
            tech: ["Game Balance", "Enemy AI", "FFVII Mod"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy7/mods/159"
          },
          {
            id: "ffvii-158",
            title: "Final Fantasy VII Mod Loader - Battle Overlay Plugin",
            platform: "Final Fantasy VII",
            game: "Final Fantasy VII",
            status: "Active",
            description: "Real-time in-game battle telemetry and tactical statistics overlay rendered directly over active combat scenes.",
            tech: ["C++", "DirectX Hook", "UI Overlay"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy7/mods/158"
          },
          {
            id: "ffx-321",
            title: "Spiras Trials - Custom Difficulty and Rewards",
            platform: "Final Fantasy X/X-2 HD Remaster",
            game: "Final Fantasy X / X-2",
            status: "Active",
            description: "Custom difficulty rebalance overhaul re-tuning monster AI scripts, boss statistics, ability costs, and rewarding encounter progression across Spira.",
            tech: ["Difficulty Rebalance", "Enemy AI", "FFX/X-2"],
            nexusUrl: "https://www.nexusmods.com/finalfantasyxx2hdremaster/mods/321"
          },
          {
            id: "ffx-320",
            title: "Classic Magic and Command Nomenclature (Original FF7 Style)",
            platform: "Final Fantasy X/X-2 HD Remaster",
            game: "Final Fantasy X / X-2",
            status: "Active",
            description: "Aesthetic localization rework adjusting spell tiers and battle abilities back to classic vintage naming nomenclature (Bolt/Bolt2/Bolt3, Fire/Fire2/Fire3).",
            tech: ["Text Rework", "Localization", "FFX/X-2"],
            nexusUrl: "https://www.nexusmods.com/finalfantasyxx2hdremaster/mods/320"
          },
          {
            id: "ff8-101",
            title: "Title Screen Overhaul",
            platform: "Final Fantasy VIII Remastered",
            game: "Final Fantasy VIII",
            status: "Active",
            description: "High-definition overhaul and custom aesthetic revamp for the Final Fantasy VIII Remastered main title screen.",
            tech: ["UI Overhaul", "Textures", "FFVIII Remastered"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy8remastered/mods/101"
          },
          {
            id: "ff8-100",
            title: "Moomba Enhanced Textures",
            platform: "Final Fantasy VIII Remastered",
            game: "Final Fantasy VIII",
            status: "Active",
            description: "Faithfully upscaled and re-authored texture pack enhancing the iconic Moomba creature model.",
            tech: ["Texture Pack", "Character Art", "FFVIII Remastered"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy8remastered/mods/100"
          },
          {
            id: "ff8-99",
            title: "Intro Logos - Cheat Icons - Start Screen Overhaul",
            platform: "Final Fantasy VIII Remastered",
            game: "Final Fantasy VIII",
            status: "Active",
            description: "Clean aesthetic replacement for opening publisher logos, booster/cheat UI icons, and the initial start sequence.",
            tech: ["UI / HUD", "Logos", "FFVIII Remastered"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy8remastered/mods/99"
          },
          {
            id: "ff8-98",
            title: "Triple Triad Re-texture",
            platform: "Final Fantasy VIII Remastered",
            game: "Final Fantasy VIII",
            status: "Active",
            description: "Complete visual redesign of the Triple Triad mini-game card faces, borders, and battle mat surfaces.",
            tech: ["Mini-game Overhaul", "Cards", "FFVIII Remastered"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy8remastered/mods/98"
          },
          {
            id: "ff8-97",
            title: "Realistic Character Portrait Textures",
            platform: "Final Fantasy VIII Remastered",
            game: "Final Fantasy VIII",
            status: "Active",
            description: "High-definition realistic texture overhaul for party member menu portraits and dialogue avatars.",
            tech: ["Portraits", "Character Art", "FFVIII Remastered"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy8remastered/mods/97"
          },
          {
            id: "ff8-96",
            title: "Realistic GF Portrait Textures",
            platform: "Final Fantasy VIII Remastered",
            game: "Final Fantasy VIII",
            status: "Active",
            description: "Detailed, realistic high-resolution portrait textures for Guardian Forces in the junction and battle menus.",
            tech: ["GF Art", "Menu Textures", "FFVIII Remastered"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy8remastered/mods/96"
          },
          {
            id: "ff8-95",
            title: "Shiva Nude Shaved",
            platform: "Final Fantasy VIII Remastered",
            game: "Final Fantasy VIII",
            status: "Active",
            description: "Custom summon texture modification for Guardian Force Shiva in Final Fantasy VIII Remastered.",
            tech: ["Summon Model", "Textures", "FFVIII Remastered"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy8remastered/mods/95"
          },
          {
            id: "skyrim-158649",
            title: "Fenrir Companion Follower",
            platform: "Skyrim SE",
            game: "Skyrim SE",
            status: "Active",
            description: "Custom wolf companion follower inspired by Fenrir, featuring custom combat AI behaviors and companion commands.",
            tech: ["Follower Mod", "Companion AI", "Skyrim SE"],
            nexusUrl: "https://www.nexusmods.com/skyrimspecialedition/mods/158649"
          },
          {
            id: "ff7r-1429",
            title: "Ichigos Bankai Tensa Zangetsu",
            platform: "Final Fantasy VII Remake",
            game: "Final Fantasy VII Remake",
            status: "Active",
            description: "Custom weapon model replacement bringing Ichigo Kurosaki's iconic Bankai blade, Tensa Zangetsu, into Final Fantasy VII Remake.",
            tech: ["Weapon Model", "3D Replacement", "FFVII Remake"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy7remake/mods/1429"
          },
          {
            id: "ff7r-1426",
            title: "Metal Cactuar Mod",
            platform: "Final Fantasy VII Remake",
            game: "Final Fantasy VII Remake",
            status: "Active",
            description: "Custom texture and material overhaul giving Cactuar a sleek, polished metallic chrome finish.",
            tech: ["Enemy Retexture", "Materials", "FFVII Remake"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy7remake/mods/1426"
          },
          {
            id: "ff7r-1425",
            title: "Ichigos Shikai Zangetsu",
            platform: "Final Fantasy VII Remake",
            game: "Final Fantasy VII Remake",
            status: "Active",
            description: "Custom weapon model replacement introducing Ichigo's oversized Shikai cleaver, Zangetsu, for Cloud Strife.",
            tech: ["Weapon Model", "3D Replacement", "FFVII Remake"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy7remake/mods/1425"
          },
          {
            id: "ff7r-1424",
            title: "Divine Axe Rhitta",
            platform: "Final Fantasy VII Remake",
            game: "Final Fantasy VII Remake",
            status: "Active",
            description: "Custom weapon model mod importing Escanor's legendary sacred treasure, Divine Axe Rhitta, into Final Fantasy VII Remake.",
            tech: ["Weapon Model", "3D Asset", "FFVII Remake"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy7remake/mods/1424"
          },
          {
            id: "ff7r-1423",
            title: "Reptilian Leviathan Mod",
            platform: "Final Fantasy VII Remake",
            game: "Final Fantasy VII Remake",
            status: "Active",
            description: "Custom texture overhaul transforming the summon Leviathan with distinct reptilian scales and coloration.",
            tech: ["Summon Retexture", "Textures", "FFVII Remake"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy7remake/mods/1423"
          },
          {
            id: "ff7r-1421",
            title: "Kenpachi's Shikai Nozarashi Mod",
            platform: "Final Fantasy VII Remake",
            game: "Final Fantasy VII Remake",
            status: "Active",
            description: "Custom weapon model importing Kenpachi Zaraki's devastating battle axe / cleaver Shikai, Nozarashi.",
            tech: ["Weapon Model", "3D Replacement", "FFVII Remake"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy7remake/mods/1421"
          },
          {
            id: "ff7r-1420",
            title: "Elder Wand Mod",
            platform: "Final Fantasy VII Remake",
            game: "Final Fantasy VII Remake",
            status: "Active",
            description: "Custom magic weapon replacement model bringing the legendary Elder Wand into Final Fantasy VII Remake.",
            tech: ["Weapon Model", "3D Replacement", "FFVII Remake"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy7remake/mods/1420"
          },
          {
            id: "ff7r-1419",
            title: "Viking Axe Mod",
            platform: "Final Fantasy VII Remake",
            game: "Final Fantasy VII Remake",
            status: "Active",
            description: "Custom rugged Norse Viking battle axe replacement model with detailed forged steel and wood textures.",
            tech: ["Weapon Model", "Textures", "FFVII Remake"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy7remake/mods/1419"
          },
          {
            id: "ff7r-1417",
            title: "Bahamut Retexture Mod",
            platform: "Final Fantasy VII Remake",
            game: "Final Fantasy VII Remake",
            status: "Active",
            description: "Custom high-detail retexture and shading overhaul for the dragon king summon, Bahamut.",
            tech: ["Summon Retexture", "Materials", "FFVII Remake"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy7remake/mods/1417"
          },
          {
            id: "ff7r-1415",
            title: "Chocobo and Moogle Summon Texture",
            platform: "Final Fantasy VII Remake",
            game: "Final Fantasy VII Remake",
            status: "Active",
            description: "Custom vibrant aesthetic texture modification for the beloved Chocobo & Moogle summon pair.",
            tech: ["Summon Retexture", "Textures", "FFVII Remake"],
            nexusUrl: "https://www.nexusmods.com/finalfantasy7remake/mods/1415"
          }
        ]
      },
      {
        id: "tools",
        title: "Tools",
        description: "Custom unpackers, 3D glTF extractors, and game data editors built to author mods.",
        projects: [
          {
            id: "spira-mod-manager",
            title: "Spira Mod Manager (Final Fantasy X and X-2 HD Remastered Mod Manager)",
            platform: "Final Fantasy X",
            status: "Active",
            description: "Dedicated mod management tool enabling easy installation, conflict detection, profile switching, and order control for FFX and X-2 HD Remastered.",
            tech: ["Python", "Mod Manager", "VFS Injection", "FFX/X-2"],
            githubUrl: "https://github.com/odinj2010/FFX-Mod-Manager",
            nexusUrl: "https://www.nexusmods.com/finalfantasyxx2hdremaster/mods/327"
          },
          {
            id: "ffx-sphere-grid-tool",
            title: "FFX Sphere Grid Tool",
            platform: "Final Fantasy X",
            status: "Active",
            description: "Specialized visual editor and binary parser for the iconic Final Fantasy X Sphere Grid layout, character paths, and stat nodes.",
            tech: ["Python", "Binary Editor", "FFX Modding"],
            githubUrl: "https://github.com/odinj2010/FFX_Sphere_Grid_Tool"
          },
          {
            id: "ffx-phyre-tool",
            title: "FFX Phyre Tool",
            platform: "Final Fantasy X",
            status: "Active",
            description: "High-performance extractor and compiler for PhyreEngine binary model archives and textures directly into modern open glTF 2.0 standard for Blender workflows.",
            tech: ["Python", "glTF 2.0", "PhyreEngine 3D"],
            githubUrl: "https://github.com/odinj2010/FFX-Phyre-Tool",
            nexusUrl: "https://www.nexusmods.com/finalfantasyxx2hdremaster/mods/315",
            guideUrl: "#/tutorials/modding/tools/phyre-gltf-export"
          },
          {
            id: "7th-heaven-converter",
            title: "7th Heaven to FFVIISE Mod Loader Converter Utility",
            platform: "Final Fantasy VII",
            status: "Active",
            description: "Automated archive extraction and conversion utility translating legacy 7th Heaven .iro files into native unpacked folder structures for the FFVIISE Mod Loader.",
            tech: ["Python", "IRO Archives", "Conversion Tool"],
            githubUrl: "https://github.com/odinj2010/7thHeavenToFFVIIModLoader",
            nexusUrl: "https://www.nexusmods.com/finalfantasy7/mods/161",
            guideUrl: "#/tutorials/modding/tools/7thheaven-migration"
          },
          {
            id: "ffviise-modding-tool",
            title: "FFVIISE Modding Tool",
            platform: "Final Fantasy VII",
            status: "Active",
            description: "Dedicated authoring and packing tool for configuring mods targeting the 2026 Steam edition of Final Fantasy VII.",
            tech: ["Python", "Asset Packing", "Steam Edition"],
            githubUrl: "https://github.com/odinj2010/FFVIISE_Modding_Tool"
          },
          {
            id: "ffx-audio-tool",
            title: "FFX Audio Tool",
            platform: "Final Fantasy X",
            status: "Active",
            description: "Stream extraction and conversion tool for proprietary audio banks inside Final Fantasy X / X-2 HD Remaster.",
            tech: ["Python", "Audio Extraction", "Binary Parsing"],
            githubUrl: "https://github.com/odinj2010/FFX_Audio_Tool"
          },
          {
            id: "ffx-shop-tool",
            title: "FFX Shop Tool",
            platform: "Final Fantasy X",
            status: "Active",
            description: "Binary data parser and inventory editor for shop tables and merchants in Final Fantasy X.",
            tech: ["Python", "Game Data Tables"],
            githubUrl: "https://github.com/odinj2010/FFX_Shop_Tool"
          },
          {
            id: "ffx-ai-tool",
            title: "FFX AI Tool",
            platform: "Final Fantasy X",
            status: "Active",
            description: "Bytecode decompiler and behavior script inspector for battle enemy AI routines in Final Fantasy X.",
            tech: ["Python", "Bytecode Decompilation"],
            githubUrl: "https://github.com/odinj2010/FFX_AI_Tool"
          }
        ]
      }
    ]
  }
];

/**
 * Tutorials data structured: AI -> Software -> Modding
 */
export const tutorialTree = [
  {
    id: "ai",
    title: "AI",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    subcategories: [
      {
        id: "rl",
        title: "Reinforcement Learning",
        guides: [
          {
            id: "hrl-environment-setup",
            title: "Setting Up the Pokemon Yellow Gym Environment",
            platform: "Pokemon Yellow",
            readingTime: "7 min read",
            difficulty: "Intermediate",
            summary: "Configuring emulator interfaces and reward functions for hierarchical RL training.",
            steps: [
              {
                title: "1. Memory Bus Bridge",
                description: "The agent hooks directly into the emulator memory bus to monitor player coordinates, health, and combat events in real time."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "software",
    title: "Software",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
    subcategories: [
      {
        id: "desktop",
        title: "Desktop Applications",
        guides: [
          {
            id: "enclosure-tuning",
            title: "Simulating Port Velocity & Box Volume in RuneBox",
            platform: "Audio CAD",
            readingTime: "8 min read",
            difficulty: "Intermediate",
            summary: "Learn how RuneBox calculates acoustic compliance, port resonant frequencies, and generates fabrication cut sheets.",
            steps: [
              {
                title: "1. Acoustic Compliance & Tuning",
                description: "Balance net volume and port area to prevent turbulence while maximizing sub-bass efficiency.",
                callout: {
                  type: "tip",
                  title: "CAD Visualization",
                  content: "RuneBox computes pure 3D vector graphics to preview internal box partitions and port bends."
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "modding",
    title: "Modding",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 2 18 2 18 6 6 6 6 2"/><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="6" x2="6.01" y1="13" y2="13"/><line x1="10" x2="10.01" y1="13" y2="13"/><line x1="15" x2="19" y1="12" y2="12"/><line x1="17" x2="17" y1="10" y2="14"/></svg>`,
    subcategories: [
      {
        id: "loaders",
        title: "Loaders",
        guides: [
          {
            id: "ffviise-loader",
            title: "Setting Up FFVIISE Mod Loader",
            platform: "Final Fantasy VII",
            readingTime: "5 min read",
            difficulty: "Beginner",
            summary: "How to install the native FFVIISE mod loader directly into your Steam Final Fantasy VII installation.",
            steps: [
              {
                title: "1. Overview & Clean Install",
                description: "FFVIISE Mod Loader is a lightweight native loader for the Final Fantasy VII Steam edition, designed for fast load times without third-party bloat. Start with a clean, verified Steam installation.",
                callout: {
                  type: "note",
                  title: "Steam Clean Install",
                  content: "It is recommended to verify file integrity via Steam before dropping loader binaries into your directory."
                }
              },
              {
                title: "2. Installation",
                description: "Place the mod loader binaries directly into your game folder alongside <code>ff7_en.exe</code>.",
                codeBlock: {
                  language: "bash",
                  filename: "Target Directory Layout",
                  code: `FINAL FANTASY VII/
├── ff7_en.exe
├── [FFVIISE Mod Loader Files]
└── mods/           <-- Place your active mods here`
                }
              },
              {
                title: "3. Adding Mods",
                description: "Drop your extracted mod folders into the newly created <code>mods</code> directory."
              }
            ]
          }
        ]
      },
      {
        id: "mods",
        title: "Mods",
        guides: [
          {
            id: "installing-riftlink",
            title: "Installing RiftLink on NeoForge",
            platform: "Minecraft",
            readingTime: "4 min read",
            difficulty: "Beginner",
            summary: "Quick guide to adding RiftLink to your NeoForge Minecraft profile.",
            steps: [
              {
                title: "1. Prerequisites",
                description: "Ensure you have Minecraft 1.21.1 and the compatible NeoForge loader installed."
              },
              {
                title: "2. Mod Placement",
                description: "Drop the downloaded RiftLink <code>.jar</code> directly into your <code>.minecraft/mods</code> folder."
              }
            ]
          }
        ]
      },
      {
        id: "tools",
        title: "Tools",
        guides: [
          {
            id: "7thheaven-migration",
            title: "Converting IRO Mods with 7thHeavenToFFVIIModLoader",
            platform: "Final Fantasy VII",
            readingTime: "6 min read",
            difficulty: "Intermediate",
            summary: "Convert classic 7th Heaven .iro packages into folder structures ready for the native mod loader.",
            steps: [
              {
                title: "1. Extracting .IRO Archives",
                description: "Legacy mods for FFVII are distributed in proprietary .iro archives. The Python converter extracts and organizes them for native loading.",
                codeBlock: {
                  language: "bash",
                  filename: "Usage",
                  code: `# Clone and run the converter
git clone https://github.com/odinj2010/7thHeavenToFFVIIModLoader.git
cd 7thHeavenToFFVIIModLoader
python convert.py --input "path/to/mod.iro" --output "path/to/mods/ExtractedMod"`
                }
              }
            ]
          },
          {
            id: "phyre-gltf-export",
            title: "Exporting 3D Models to glTF with FFX-Phyre-Tool",
            platform: "Final Fantasy X",
            readingTime: "7 min read",
            difficulty: "Intermediate",
            summary: "Extract 3D models and textures from Final Fantasy X/X-2 HD Remaster for use in Blender or modern engines.",
            steps: [
              {
                title: "1. Model Extraction",
                description: "FFX-Phyre-Tool translates proprietary mesh and texture blocks directly into glTF 2.0 open standard files.",
                codeBlock: {
                  language: "bash",
                  filename: "Run Extraction",
                  code: `python phyre_tool.py --extract "model.phyre" --out "exported_model.gltf"`
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
