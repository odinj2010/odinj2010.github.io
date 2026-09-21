/* ==========================================================================
   AUTHENTIC DATA STORE (js/tutorials-data.js)
   --------------------------------------------------------------------------
   Structured hierarchical data for Jonathan Roberts (NfgOdin / NFG):
   1. Projects grouped into Dedicated Categories & Subcategories
   2. Tutorials with 3+ level nested drilldown
   ========================================================================== */

/**
 * Categorized Projects Hierarchy for dedicated screens
 */
export const projectCategories = [
  {
    id: "software",
    title: "Software",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
    description: "Desktop software, standalone mod managers, CAD acoustics tools, and Raspberry Pi software.",
    projects: [
      {
        id: "ffx-mod-manager",
        title: "FFX-Mod-Manager",
        status: "Released",
        description: "A clean, fast, and secure standalone desktop mod manager for Final Fantasy X / X-2 HD Remaster on Steam. Handles automated mod injection and profile switching.",
        tech: ["Python", "GUI Tooling", "Steam Modding"],
        githubUrl: "https://github.com/odinj2010/FFX-Mod-Manager"
      },
      {
        id: "runebox",
        title: "RuneBox - Audio CAD & Acoustics Lab",
        status: "Active",
        description: "Commercial-grade car audio subwoofer enclosure CAD & acoustics laboratory featuring pure Python 3D vector visualization, wiring schematics, and precision cut sheets.",
        tech: ["Python", "3D Vector Graphics", "Acoustics CAD"],
        githubUrl: "https://github.com/odinj2010/RuneBox",
        guideUrl: "#/tutorials/audio-engineering/runebox-cad/enclosure-tuning"
      },
      {
        id: "sbc-core",
        title: "SBC-Core",
        status: "Active",
        description: "Core utility suite, daemon controller, and hardware interface system built specifically for Raspberry Pi 5 single-board computer environments.",
        tech: ["Python", "Raspberry Pi 5", "Linux / Hardware"],
        githubUrl: "https://github.com/odinj2010/SBC-Core"
      },
      {
        id: "digit-ai",
        title: "digit.ai",
        status: "Active",
        description: "Desktop companion application and local assistant interface built for desktop productivity.",
        tech: ["Python", "Desktop App"],
        githubUrl: "https://github.com/odinj2010/digit.ai"
      }
    ]
  },
  {
    id: "loaders",
    title: "Loaders",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    description: "Native C++ memory hook engines and executable patchers for classic PC titles.",
    projects: [
      {
        id: "ffviise-mod-loader",
        title: "FFVIISE Mod Loader",
        status: "Released",
        description: "A lightweight, portable, and high-performance native mod loader for the Final Fantasy VII Steam Edition re-release, bypassing third-party overhead.",
        tech: ["C++", "Win32 API", "Game Hooks"],
        githubUrl: "https://github.com/odinj2010/FFVIISE_Mod_Loader",
        guideUrl: "#/tutorials/game-modding/ffvii-steam/ffviise-loader"
      }
    ]
  },
  {
    id: "mods",
    title: "Mods",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 2 18 2 18 6 6 6 6 2"/><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="6" x2="6.01" y1="13" y2="13"/><line x1="10" x2="10.01" y1="13" y2="13"/><line x1="15" x2="19" y1="12" y2="12"/><line x1="17" x2="17" y1="10" y2="14"/></svg>`,
    description: "In-game gameplay modifications, new dimensions, and resource systems.",
    projects: [
      {
        id: "riftlink",
        title: "RiftLink (Minecraft 1.21.1)",
        status: "Active",
        description: "A modern gameplay, dimensional mechanics, and custom utility mod developed for Minecraft 1.21.1 on the NeoForge mod loader platform.",
        tech: ["Java", "NeoForge", "Minecraft 1.21.1"],
        githubUrl: "https://github.com/odinj2010/RiftLink"
      },
      {
        id: "sticky-resources",
        title: "StickyResources",
        status: "Active",
        description: "Custom Java-based gameplay enhancement and resource management mod for Minecraft.",
        tech: ["Java", "Game Modding"],
        githubUrl: "https://github.com/odinj2010/StickyResources"
      }
    ]
  },
  {
    id: "tools",
    title: "Tools",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    description: "Asset converters, 3D glTF extractors, archive unpackers, and binary disassembly tools.",
    projects: [
      {
        id: "7th-heaven-converter",
        title: "7thHeavenToFFVIIModLoader",
        status: "Released",
        description: "Archive extraction and manifest conversion utility translating legacy .iro files from 7th Heaven into native directory trees ready for FFVII Mod Loader.",
        tech: ["Python", "IRO Archives", "Data Extraction"],
        githubUrl: "https://github.com/odinj2010/7thHeavenToFFVIIModLoader",
        guideUrl: "#/tutorials/game-modding/ffvii-steam/7thheaven-migration"
      },
      {
        id: "ffx-phyre-tool",
        title: "FFX-Phyre-Tool",
        status: "Released",
        description: "A modern utility to seamlessly extract and repack 3D models and textures for Final Fantasy X/X-2 HD Remaster using the modern glTF 2.0 open standard.",
        tech: ["Python", "glTF 2.0", "PhyreEngine 3D"],
        githubUrl: "https://github.com/odinj2010/FFX-Phyre-Tool",
        guideUrl: "#/tutorials/game-modding/ffx-modding/phyre-gltf-export"
      },
      {
        id: "ffviise-modding-tool",
        title: "FFVIISE Modding Tool",
        status: "Released",
        description: "Dedicated authoring and packing tool for configuring mods targeting the 2026 Steam edition of Final Fantasy VII.",
        tech: ["Python", "Asset Packing", "Steam Edition"],
        githubUrl: "https://github.com/odinj2010/FFVIISE_Modding_Tool"
      },
      {
        id: "ffx-audio-tool",
        title: "FFX_Audio_Tool",
        status: "Completed",
        description: "Stream extraction and conversion tool for proprietary audio banks inside Final Fantasy X / X-2 HD Remaster.",
        tech: ["Python", "Audio Extraction", "Binary Parsing"],
        githubUrl: "https://github.com/odinj2010/FFX_Audio_Tool"
      },
      {
        id: "ffx-shop-tool",
        title: "FFX_Shop_Tool",
        status: "Completed",
        description: "Binary data parser and editor for merchant inventories and shop tables in Final Fantasy X.",
        tech: ["Python", "Game Data Tables"],
        githubUrl: "https://github.com/odinj2010/FFX_Shop_Tool"
      },
      {
        id: "ffx-sphere-grid-tool",
        title: "FFX_Sphere_Grid_Tool",
        status: "Completed",
        description: "Parser and custom editor for the iconic Final Fantasy X Sphere Grid layout and character progression nodes.",
        tech: ["Python", "Binary Editor"],
        githubUrl: "https://github.com/odinj2010/FFX_Sphere_Grid_Tool"
      },
      {
        id: "ffx-ai-tool",
        title: "FFX_AI_Tool",
        status: "Completed",
        description: "Script decompiler and behavior inspector for enemy battle AI routines in Final Fantasy X.",
        tech: ["Python", "Bytecode Decompilation"],
        githubUrl: "https://github.com/odinj2010/FFX_AI_Tool"
      }
    ]
  },
  {
    id: "ai",
    title: "AI",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    description: "Hierarchical reinforcement learning algorithms and autonomous game playing agents.",
    projects: [
      {
        id: "pokemon-yellow-ai",
        title: "PokemonYellow-HRL-AI",
        status: "Completed",
        description: "Hierarchical Reinforcement Learning (HRL) framework training an intelligent autonomous agent to navigate, battle, and beat Pokémon Yellow via Game Boy emulation hooks.",
        tech: ["Python", "Reinforcement Learning", "Gym / Emulation API"],
        githubUrl: "https://github.com/odinj2010/PokemonYellow-HRL-AI"
      }
    ]
  }
];

/**
 * Hierarchical Tutorial Engine Data Tree
 */
export const tutorialCategories = [
  {
    id: "software",
    title: "Software",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
    summary: "Guides for desktop software, acoustics CAD, and Raspberry Pi system setup.",
    subcategories: [
      {
        id: "runebox-cad",
        title: "RuneBox Acoustics Lab",
        description: "Designing high-precision subwoofer enclosures, port tuning, and wiring configurations.",
        guides: [
          {
            id: "enclosure-tuning",
            title: "Simulating Port Velocity & Box Volume in RuneBox",
            readingTime: "8 min read",
            difficulty: "Intermediate",
            summary: "Learn how RuneBox calculates acoustic compliance, port resonant frequencies, and generates fabrication cut sheets.",
            steps: [
              {
                title: "1. The Mathematics of Enclosure Tuning",
                description: "Subwoofer box design requires balancing net internal volume, driver displacement, and port resonance to avoid turbulence and achieve optimal frequency response curves.",
                callout: {
                  type: "tip",
                  title: "Acoustic Modeling",
                  content: "RuneBox computes pure 3D vector visualizations alongside Thiele/Small parameter response curves."
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "loaders",
    title: "Loaders",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    summary: "Walkthroughs for native memory hook loaders and executable patchers.",
    subcategories: [
      {
        id: "ffvii-steam",
        title: "FFVIISE Mod Loader",
        description: "Official guides for deploying the native C++ FFVIISE mod loader in Final Fantasy VII Steam Edition.",
        guides: [
          {
            id: "ffviise-loader",
            title: "Setting Up FFVIISE Mod Loader",
            readingTime: "5 min read",
            difficulty: "Beginner",
            summary: "How to install the native FFVIISE mod loader directly into your Steam Final Fantasy VII installation.",
            steps: [
              {
                title: "1. Overview & Requirements",
                description: "FFVIISE Mod Loader is a lightweight native loader for the Final Fantasy VII Steam edition, designed for fast load times and straightforward mod deployment without third-party bloat.",
                callout: {
                  type: "note",
                  title: "Steam Clean Install",
                  content: "It is always recommended to start with a fresh, verified installation of FFVII from your Steam library before installing mod hooks."
                }
              },
              {
                title: "2. Installation",
                description: "Grab the latest release from the repository and place the mod loader files directly into your game installation directory alongside the main executable.",
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
                description: "Drop your extracted mod folders into the newly created <code>mods</code> directory. You can use 7thHeavenToFFVIIModLoader to convert existing .iro archives."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "mods",
    title: "Mods",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 2 18 2 18 6 6 6 6 2"/><rect width="20" height="14" x="2" y="6" rx="2"/><line x1="6" x2="6.01" y1="13" y2="13"/><line x1="10" x2="10.01" y1="13" y2="13"/><line x1="15" x2="19" y1="12" y2="12"/><line x1="17" x2="17" y1="10" y2="14"/></svg>`,
    summary: "Installation and configuration guides for gameplay mods and sandbox mechanics.",
    subcategories: [
      {
        id: "riftlink-setup",
        title: "RiftLink Mod Setup",
        description: "Configuring NeoForge 1.21.1 and installing RiftLink dimensional mechanics.",
        guides: [
          {
            id: "installing-riftlink",
            title: "Installing RiftLink on NeoForge",
            readingTime: "4 min read",
            difficulty: "Beginner",
            summary: "Quick guide to adding RiftLink to your NeoForge Minecraft profile.",
            steps: [
              {
                title: "1. Prerequisites",
                description: "Ensure you have Minecraft 1.21.1 and the compatible NeoForge loader installed in your launcher."
              },
              {
                title: "2. Placing the Mod",
                description: "Drop the downloaded RiftLink `.jar` file directly into your `.minecraft/mods` directory."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tools",
    title: "Tools",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    summary: "Step-by-step guides for asset extractors, 3D glTF converters, and archive tools.",
    subcategories: [
      {
        id: "7th-heaven-conversion",
        title: "7thHeavenToFFVIIModLoader",
        description: "Converting classic 7th Heaven .iro packages into unpacked folder structures.",
        guides: [
          {
            id: "7thheaven-migration",
            title: "Converting IRO Mods with 7thHeavenToFFVIIModLoader",
            readingTime: "6 min read",
            difficulty: "Intermediate",
            summary: "Convert classic 7th Heaven .iro packages into folder structures ready for the native mod loader.",
            steps: [
              {
                title: "1. The Need for Conversion",
                description: "Many legacy mods for FFVII are distributed in proprietary .iro archive files. The 7thHeavenToFFVIIModLoader Python utility extracts and reorganizes these files so they load natively.",
                codeBlock: {
                  language: "bash",
                  filename: "Usage",
                  code: `# Clone the converter
git clone https://github.com/odinj2010/7thHeavenToFFVIIModLoader.git
cd 7thHeavenToFFVIIModLoader

# Run the extraction tool on your .iro files
python convert.py --input "path/to/mod.iro" --output "path/to/mods/ExtractedMod"`
                },
                callout: {
                  type: "tip",
                  title: "Mod Separation",
                  content: "Be sure to extract texture and audio mods into distinct folders inside your /mods folder for clean organization."
                }
              }
            ]
          }
        ]
      },
      {
        id: "ffx-modding",
        title: "FFX-Phyre-Tool",
        description: "Extracting, managing, and exporting 3D models and textures to glTF 2.0.",
        guides: [
          {
            id: "phyre-gltf-export",
            title: "Exporting 3D Models to glTF with FFX-Phyre-Tool",
            readingTime: "7 min read",
            difficulty: "Intermediate",
            summary: "Extract 3D models and textures from Final Fantasy X/X-2 HD Remaster for use in Blender or modern 3D engines.",
            steps: [
              {
                title: "1. Standardized 3D Asset Pipeline",
                description: "FFX-Phyre-Tool bridges legacy PhyreEngine assets with modern 3D workflows by translating proprietary mesh and texture blocks directly into glTF 2.0 files.",
                codeBlock: {
                  language: "bash",
                  filename: "Clone and Run",
                  code: `git clone https://github.com/odinj2010/FFX-Phyre-Tool.git
cd FFX-Phyre-Tool
python phyre_tool.py --extract "model.phyre" --out "exported_model.gltf"`
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
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    summary: "Reinforcement learning workflows, local model execution, and AI tooling guides.",
    subcategories: [
      {
        id: "rl-gameboy",
        title: "Pokemon Yellow HRL Framework",
        description: "Training autonomous reinforcement learning agents in Game Boy emulated environments.",
        guides: [
          {
            id: "hrl-environment-setup",
            title: "Setting Up the Pokemon Yellow Gym Environment",
            readingTime: "7 min read",
            difficulty: "Intermediate",
            summary: "Configuring the emulator interface and reward functions for hierarchical RL training.",
            steps: [
              {
                title: "1. Emulation Bridge",
                description: "The agent interfaces with the Game Boy memory bus using Python hooks to read game state, battle status, and player coordinates directly."
              }
            ]
          }
        ]
      }
    ]
  }
];
