/* ==========================================================================
   AUTHENTIC DATA STORE (js/tutorials-data.js)
   --------------------------------------------------------------------------
   Structured hierarchical data for NfgOdin (NFG):
   1. Projects categorized with subcategories & game tags
   2. Tutorials structured with matching hierarchy
   ========================================================================== */

/**
 * Projects data structured by domain -> subcategory -> items (with game tags)
 */
export const projectTree = [
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
            title: "FFVIISE Mod Loader",
            game: "Final Fantasy VII",
            status: "Released",
            description: "A lightweight, portable, and high-performance native mod loader for the Final Fantasy VII Steam Edition re-release, bypassing third-party overhead.",
            tech: ["C++", "Win32 API", "Game Hooks"],
            githubUrl: "https://github.com/odinj2010/FFVIISE_Mod_Loader",
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
            title: "RiftLink (Minecraft 1.21.1)",
            game: "Minecraft",
            status: "Active",
            description: "A modern gameplay, dimensional mechanics, and custom utility mod developed for Minecraft 1.21.1 on the NeoForge mod loader platform.",
            tech: ["Java", "NeoForge", "Minecraft 1.21.1"],
            githubUrl: "https://github.com/odinj2010/RiftLink",
            guideUrl: "#/tutorials/modding/mods/installing-riftlink"
          },
          {
            id: "sticky-resources",
            title: "StickyResources",
            game: "Minecraft",
            status: "Active",
            description: "Custom Java-based gameplay enhancement and resource automation mod for Minecraft.",
            tech: ["Java", "Minecraft Modding"],
            githubUrl: "https://github.com/odinj2010/StickyResources"
          }
        ]
      },
      {
        id: "tools",
        title: "Tools",
        description: "Custom unpackers, 3D glTF extractors, and game data editors built to author mods.",
        projects: [
          {
            id: "ffx-sphere-grid-tool",
            title: "FFX Sphere Grid Tool",
            game: "Final Fantasy X",
            status: "Completed",
            description: "Specialized visual editor and binary parser for the iconic Final Fantasy X Sphere Grid layout, character paths, and stat nodes.",
            tech: ["Python", "Binary Editor", "FFX Modding"],
            githubUrl: "https://github.com/odinj2010/FFX_Sphere_Grid_Tool"
          },
          {
            id: "ffx-phyre-tool",
            title: "FFX-Phyre-Tool (glTF 2.0)",
            game: "Final Fantasy X",
            status: "Released",
            description: "Extract and repack 3D models and textures from Final Fantasy X/X-2 HD Remaster directly into the modern open glTF 2.0 standard for Blender workflows.",
            tech: ["Python", "glTF 2.0", "PhyreEngine 3D"],
            githubUrl: "https://github.com/odinj2010/FFX-Phyre-Tool",
            guideUrl: "#/tutorials/modding/tools/phyre-gltf-export"
          },
          {
            id: "7th-heaven-converter",
            title: "7thHeavenToFFVIIModLoader",
            game: "Final Fantasy VII",
            status: "Released",
            description: "Automated archive extraction and manifest conversion utility translating legacy 7th Heaven .iro files into native unpacked folder structures.",
            tech: ["Python", "IRO Archives", "Data Extraction"],
            githubUrl: "https://github.com/odinj2010/7thHeavenToFFVIIModLoader",
            guideUrl: "#/tutorials/modding/tools/7thheaven-migration"
          },
          {
            id: "ffviise-modding-tool",
            title: "FFVIISE Modding Tool",
            game: "Final Fantasy VII",
            status: "Released",
            description: "Dedicated authoring and packing tool for configuring mods targeting the 2026 Steam edition of Final Fantasy VII.",
            tech: ["Python", "Asset Packing", "Steam Edition"],
            githubUrl: "https://github.com/odinj2010/FFVIISE_Modding_Tool"
          },
          {
            id: "ffx-audio-tool",
            title: "FFX_Audio_Tool",
            game: "Final Fantasy X",
            status: "Completed",
            description: "Stream extraction and conversion tool for proprietary audio banks inside Final Fantasy X / X-2 HD Remaster.",
            tech: ["Python", "Audio Extraction", "Binary Parsing"],
            githubUrl: "https://github.com/odinj2010/FFX_Audio_Tool"
          },
          {
            id: "ffx-shop-tool",
            title: "FFX_Shop_Tool",
            game: "Final Fantasy X",
            status: "Completed",
            description: "Binary data parser and inventory editor for shop tables and merchants in Final Fantasy X.",
            tech: ["Python", "Game Data Tables"],
            githubUrl: "https://github.com/odinj2010/FFX_Shop_Tool"
          },
          {
            id: "ffx-ai-tool",
            title: "FFX_AI_Tool",
            game: "Final Fantasy X",
            status: "Completed",
            description: "Bytecode decompiler and behavior script inspector for battle enemy AI routines in Final Fantasy X.",
            tech: ["Python", "Bytecode Decompilation"],
            githubUrl: "https://github.com/odinj2010/FFX_AI_Tool"
          }
        ]
      }
    ]
  },
  {
    id: "software",
    title: "Software",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
    description: "Desktop applications, standalone managers, CAD acoustics simulation suites, and single-board computer software.",
    subcategories: [
      {
        id: "desktop",
        title: "Desktop Applications",
        description: "Standalone GUI tools and companion applications.",
        projects: [
          {
            id: "ffx-mod-manager",
            title: "FFX-Mod-Manager",
            game: "Final Fantasy X",
            status: "Released",
            description: "A clean, fast, and secure standalone desktop mod manager for Final Fantasy X / X-2 HD Remaster on Steam. Handles automated mod injection and profile switching.",
            tech: ["Python", "GUI Tooling", "Steam Modding"],
            githubUrl: "https://github.com/odinj2010/FFX-Mod-Manager"
          },
          {
            id: "runebox",
            title: "RuneBox - Audio CAD & Acoustics Lab",
            game: "Audio CAD",
            status: "Active",
            description: "Commercial-grade car audio subwoofer enclosure CAD & acoustics laboratory featuring pure Python 3D vector visualization, wiring schematics, and precision cut sheets.",
            tech: ["Python", "3D Vector Graphics", "Acoustics CAD"],
            githubUrl: "https://github.com/odinj2010/RuneBox",
            guideUrl: "#/tutorials/software/desktop/enclosure-tuning"
          },
          {
            id: "digit-ai",
            title: "digit.ai",
            game: "General",
            status: "Active",
            description: "Desktop companion application and local assistant interface built for desktop productivity.",
            tech: ["Python", "Desktop App"],
            githubUrl: "https://github.com/odinj2010/digit.ai"
          }
        ]
      },
      {
        id: "hardware",
        title: "Hardware & SBC",
        description: "Embedded Linux scripts, Raspberry Pi daemons, and physical interfaces.",
        projects: [
          {
            id: "sbc-core",
            title: "SBC-Core",
            game: "Raspberry Pi 5",
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
    id: "ai",
    title: "AI",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    description: "Hierarchical reinforcement learning algorithms and autonomous game-playing agents.",
    subcategories: [
      {
        id: "rl",
        title: "Reinforcement Learning",
        description: "Emulation hooks and agent training algorithms.",
        projects: [
          {
            id: "pokemon-yellow-ai",
            title: "PokemonYellow-HRL-AI",
            game: "Pokemon Yellow",
            status: "Completed",
            description: "Hierarchical Reinforcement Learning (HRL) framework training an intelligent autonomous agent to navigate, battle, and beat Pokémon Yellow via Game Boy emulation hooks.",
            tech: ["Python", "Reinforcement Learning", "Gym / Emulation API"],
            githubUrl: "https://github.com/odinj2010/PokemonYellow-HRL-AI",
            guideUrl: "#/tutorials/ai/rl/hrl-environment-setup"
          }
        ]
      }
    ]
  }
];

/**
 * Tutorials data aligned with the project tree
 */
export const tutorialTree = [
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
            game: "Final Fantasy VII",
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
            game: "Minecraft",
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
            game: "Final Fantasy VII",
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
            game: "Final Fantasy X",
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
            game: "Audio CAD",
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
            game: "Pokemon Yellow",
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
  }
];
