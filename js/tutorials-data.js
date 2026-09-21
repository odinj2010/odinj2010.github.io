/* ==========================================================================
   AUTHENTIC DATA STORE (js/tutorials-data.js)
   --------------------------------------------------------------------------
   Real projects, genuine biography, and authentic technical guides for:
   Jonathan Roberts (NfgOdin / NFG)
   ========================================================================== */

/**
 * Real Projects Showcase Data directly from Jonathan's actual repositories
 */
export const projectsData = [
  {
    id: "ffviise-mod-loader",
    title: "FFVIISE Mod Loader",
    category: "Game Modding",
    status: "Released",
    description: "A lightweight, portable, and high-performance native mod loader for the Final Fantasy VII Steam Edition re-release.",
    tech: ["C++", "Win32", "Game Modding"],
    githubUrl: "https://github.com/odinj2010/FFVIISE_Mod_Loader",
    liveUrl: "#tutorials/game-modding/ffvii-steam/ffviise-loader"
  },
  {
    id: "7th-heaven-converter",
    title: "7thHeavenToFFVIIModLoader",
    category: "Game Modding",
    status: "Released",
    description: "Specialized conversion tool that converts legacy IRO mod packages from 7th Heaven into unpacked formats compatible with the FFVII Mod Loader.",
    tech: ["Python", "Archive Extraction", "File IO"],
    githubUrl: "https://github.com/odinj2010/7thHeavenToFFVIIModLoader",
    liveUrl: "#tutorials/game-modding/ffvii-steam/7thheaven-migration"
  },
  {
    id: "ffx-mod-manager",
    title: "FFX-Mod-Manager",
    category: "Game Modding",
    status: "Released",
    description: "A clean, fast, and secure standalone mod manager specifically built for Final Fantasy X / X-2 HD Remaster on Steam.",
    tech: ["Python", "GUI Tooling", "Steam Modding"],
    githubUrl: "https://github.com/odinj2010/FFX-Mod-Manager"
  },
  {
    id: "ffx-phyre-tool",
    title: "FFX-Phyre-Tool",
    category: "Game Modding",
    status: "Released",
    description: "A modern utility to seamlessly extract and repack 3D models and textures for Final Fantasy X/X-2 HD Remaster using the modern glTF 2.0 open standard.",
    tech: ["Python", "glTF 2.0", "3D Models & Textures"],
    githubUrl: "https://github.com/odinj2010/FFX-Phyre-Tool"
  },
  {
    id: "runebox",
    title: "RuneBox - Audio CAD & Acoustics Lab",
    category: "Audio & Hardware",
    status: "Active Projects",
    description: "Commercial-grade car audio subwoofer enclosure CAD and acoustics simulation suite featuring 3D vector visualization, multi-subwoofer wiring schematics, and precision fabrication cut sheets.",
    tech: ["Python", "3D Acoustics & CAD", "Audio Engineering"],
    githubUrl: "https://github.com/odinj2010/RuneBox"
  },
  {
    id: "riftlink",
    title: "RiftLink (Minecraft Mod)",
    category: "Game Modding",
    status: "Active Projects",
    description: "A modern gameplay and dimension mechanics mod developed for Minecraft 1.21.1 running on the NeoForge mod loader.",
    tech: ["Java", "NeoForge", "Minecraft 1.21.1"],
    githubUrl: "https://github.com/odinj2010/RiftLink"
  },
  {
    id: "pokemon-yellow-ai",
    title: "PokemonYellow-HRL-AI",
    category: "Machine Learning & AI",
    status: "Completed",
    description: "Hierarchical Reinforcement Learning (HRL) framework training an intelligent autonomous agent to navigate, battle, and beat Pokémon Yellow on Game Boy emulation.",
    tech: ["Python", "Reinforcement Learning", "Emulation API"],
    githubUrl: "https://github.com/odinj2010/PokemonYellow-HRL-AI"
  },
  {
    id: "sbc-core",
    title: "SBC-Core (Raspberry Pi 5)",
    category: "Audio & Hardware",
    status: "Active Projects",
    description: "Core utility suite and hardware interface system purpose-built for Raspberry Pi 5 single-board computer environments.",
    tech: ["Python", "Raspberry Pi 5", "Linux / Hardware"],
    githubUrl: "https://github.com/odinj2010/SBC-Core"
  },
  {
    id: "ffx-suite",
    title: "FFX Reverse Engineering Suite (Audio, Shop, AI)",
    category: "Game Modding",
    status: "Completed",
    description: "Comprehensive modular reverse engineering toolchain for Final Fantasy X covering sound extraction (FFX_Audio_Tool), sphere grid data (FFX_Sphere_Grid_Tool), merchant inventories (FFX_Shop_Tool), and enemy AI behavior (FFX_AI_Tool).",
    tech: ["Python", "Binary Parsing", "Data Extraction"],
    githubUrl: "https://github.com/odinj2010/FFX_Audio_Tool"
  }
];

/**
 * Filter tags matching Jonathan's genuine projects
 */
export const projectFilterTags = [
  "All",
  "Game Modding",
  "Audio & Hardware",
  "Machine Learning & AI",
  "Active Projects",
  "Completed"
];

/**
 * Real Hierarchical Tutorial Engine Data Tree
 */
export const tutorialCategories = [
  {
    id: "game-modding",
    title: "Final Fantasy Modding & Tools",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 2 18 2 18 6 6 6 6 2"/><rect width="20" height="14" x="2" y="6" rx="2"/><line x1="6" x2="6.01" y1="13" y2="13"/><line x1="10" x2="10.01" y1="13" y2="13"/><line x1="15" x2="19" y1="12" y2="12"/><line x1="17" x2="17" y1="10" y2="14"/></svg>`,
    summary: "Practical guides and technical documentation for FFVIISE Mod Loader, FFX Phyre 3D models, and 7th Heaven conversions.",
    subcategories: [
      {
        id: "ffvii-steam",
        title: "Final Fantasy VII Steam Edition",
        description: "Official guides for deploying the native C++ FFVIISE mod loader and converting legacy IRO packages.",
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
          },
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
                  title: "Mod Order",
                  content: "Be sure to extract texture and audio mods into distinct folders inside your /mods folder for clear separation."
                }
              }
            ]
          }
        ]
      },
      {
        id: "ffx-modding",
        title: "Final Fantasy X / X-2 HD Remaster",
        description: "Tools for extracting, managing, and exporting 3D assets to glTF 2.0.",
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
    id: "audio-engineering",
    title: "Audio Engineering & Hardware CAD",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    summary: "Acoustics modeling, subwoofer enclosure CAD design, and hardware interfacing.",
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
            summary: "Learn how RuneBox calculates acoustic compliance, port resonant frequencies, and generate fabrication cut sheets.",
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
  }
];
