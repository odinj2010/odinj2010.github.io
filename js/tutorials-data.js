/* ==========================================================================
   TUTORIALS & PROJECTS DATA STORE (js/tutorials-data.js)
   --------------------------------------------------------------------------
   Universal structured data hierarchy powering:
   1. Portfolio Projects & Achievements showcase
   2. 3+ Level Deep Hierarchical Tutorial Engine:
      - Level 1: Main Category
      - Level 2: Sub-Category
      - Level 3: Child Topic / Step-by-Step Guide
   ========================================================================== */

/**
 * Projects showcase data
 * @type {Array<{id: string, title: string, category: string, status: 'Alpha'|'Beta'|'Released'|'In Development', description: string, tech: string[], githubUrl?: string, liveUrl?: string}>}
 */
export const projectsData = [
  {
    id: "ffvii-mod-loader",
    title: "FFVIISE Mod Loader & Hooking Engine",
    category: "Game Modding",
    status: "Released",
    description: "Next-gen memory patcher and dynamic native asset injection engine built specifically for modern FFVII Steam editions. Features real-time memory debugging and hot-reloading asset archives.",
    tech: ["C++20", "Assembly (x86)", "DirectX 9/11 Hooks", "Win32 API"],
    githubUrl: "https://github.com/odinj2010",
    liveUrl: "#tutorials/game-modding/ffvii-steam/installing-mod-loader"
  },
  {
    id: "7th-heaven-converter",
    title: "7thHeaven to FFVIISE Migration Toolkit",
    category: "Tools",
    status: "Beta",
    description: "Automated batch transpiler and manifest converter migrating classic 7th Heaven mod structures (.iro archives, texture packs, and LGP patches) into native FFVIISE mod loader packs.",
    tech: ["Rust", "Python", "CLI Tooling", "LZ4 Compression"],
    githubUrl: "https://github.com/odinj2010",
    liveUrl: "#tutorials/game-modding/ffvii-steam/7thheaven-migration"
  },
  {
    id: "audio-dsp-synth",
    title: "Polyphonic DSP Audio Synthesizer",
    category: "Audio / Hardware",
    status: "Active Projects",
    description: "Custom embedded audio synthesizer workstation running on STM32 microcontrollers with I2S audio codecs. Features dual wavetable oscillators, analog-modeled ladder filters, and MIDI over USB.",
    tech: ["Embedded C", "STM32 HAL", "DSP Algorithms", "KiCAD PCB"],
    githubUrl: "https://github.com/odinj2010"
  },
  {
    id: "midi-hardware-bridge",
    title: "Low-Latency MIDI-to-CV Control Bridge",
    category: "Audio / Hardware",
    status: "Completed",
    description: "Hardware Eurorack module providing sub-millisecond USB MIDI to 1V/Oct analog Control Voltage generation with 16-bit DAC precision and high-speed optocoupled DIN-5 inputs.",
    tech: ["KiCAD", "AVR C", "Hardware Prototyping", "Analog Design"],
    githubUrl: "https://github.com/odinj2010"
  },
  {
    id: "antigravity-hub",
    title: "Unified Web Ecosystem & Knowledge Platform",
    category: "Active Projects",
    status: "Released",
    description: "High-performance, zero-dependency static hub hosting portfolios, technical architectures, and multi-tier tutorial engines with client-side deep routing and instant search.",
    tech: ["HTML5", "CSS3 Glassmorphism", "Modern ES6+", "GitHub Pages"],
    githubUrl: "https://github.com/odinj2010/.github.io",
    liveUrl: "#"
  },
  {
    id: "rom-disassembly-toolkit",
    title: "Retro Console Reverse Engineering Toolkit",
    category: "Game Modding",
    status: "In Development",
    description: "Specialized static binary analysis suite targeting legacy PlayStation 1 (MIPS R3000A) and SNES (65c816) architectures with automated symbol extraction and control-flow graphing.",
    tech: ["Python 3", "Ghidra API", "MIPS Assembly", "Reverse Engineering"],
    githubUrl: "https://github.com/odinj2010"
  }
];

/**
 * Filter tags available in the projects section
 */
export const projectFilterTags = [
  "All",
  "Active Projects",
  "Completed",
  "Game Modding",
  "Audio / Hardware",
  "Tools"
];

/**
 * Hierarchical Tutorial Engine Data Tree
 * Structure:
 * Level 1: Category (id, title, icon, summary, subcategories)
 *   Level 2: Sub-Category (id, title, description, guides)
 *     Level 3: Guide (id, title, readingTime, difficulty, summary, steps)
 */
export const tutorialCategories = [
  {
    id: "game-modding",
    title: "Game Modding & Reverse Engineering",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 2 18 2 18 6 6 6 6 2"/><rect width="20" height="14" x="2" y="6" rx="2"/><line x1="6" x2="6.01" y1="13" y2="13"/><line x1="10" x2="10.01" y1="13" y2="13"/><line x1="15" x2="19" y1="12" y2="12"/><line x1="17" x2="17" y1="10" y2="14"/></svg>`,
    summary: "Deep-dive binary instrumentation, asset injection, memory hooks, and modding frameworks for retro & modern PC releases.",
    subcategories: [
      {
        id: "ffvii-steam",
        title: "Final Fantasy VII 2026 Steam Edition",
        description: "Official guide series for configuring native mod loaders, bypassing legacy engine bottlenecks, and porting classic 7th Heaven modifications to current releases.",
        guides: [
          {
            id: "installing-mod-loader",
            title: "Installing the FFVIISE Native Mod Loader",
            readingTime: "6 min read",
            difficulty: "Beginner to Intermediate",
            summary: "Step-by-step instructions for deploying FFVIISE Mod Loader, verifying game DLL hooks, and organizing your /mods directory structure.",
            steps: [
              {
                title: "1. Prerequisites & Clean Install Verification",
                description: "Before applying custom memory hooks or external DLL wrappers, ensure your Steam installation of Final Fantasy VII is completely stock and verified through Steam client integrity checks.",
                callout: {
                  type: "warning",
                  title: "Important Steam Verification",
                  content: "Disable Steam Cloud synchronization temporarily during initial mod loader testing to prevent save file metadata conflicts."
                }
              },
              {
                title: "2. Download and Place Mod Loader Binaries",
                description: "Extract the native mod loader archive directly into your main game directory (where <code>ff7_en.exe</code> resides). Do not extract it to subfolders.",
                codeBlock: {
                  language: "bash",
                  filename: "Directory Structure Placement",
                  code: `steamapps/common/FINAL FANTASY VII/
├── ff7_en.exe
├── dinput8.dll              <-- [NEW] Injected Mod Loader Wrapper
├── ffviise_config.json      <-- [NEW] Core Engine Configuration
├── mods/                    <-- [NEW] Root Folder for all mods
│   ├── HD_Textures/
│   ├── Remastered_OST/
│   └── Gameplay_Overhaul/
└── ff7.exe`
                }
              },
              {
                title: "3. Configure ffviise_config.json",
                description: "Customize memory allocation, refresh rate unlocking (up to 144Hz/240Hz for UI menus), and enable console debugging output.",
                codeBlock: {
                  language: "json",
                  filename: "ffviise_config.json",
                  code: `{
  "engine": {
    "enableDirectXHook": true,
    "enableDebugConsole": true,
    "targetFramerateMenu": 144,
    "targetFramerateBattle": 60,
    "targetFramerateWorld": 60
  },
  "assetLoader": {
    "modsDirectory": "./mods",
    "enableHotReload": true,
    "logMissingAssets": true
  }
}`
                },
                callout: {
                  type: "tip",
                  title: "Performance Optimization",
                  content: "Setting <code>enableHotReload: true</code> allows texture and sound replacement in real-time without restarting the game client."
                }
              },
              {
                title: "4. Verification & Launch",
                description: "Launch the game via Steam. If installed correctly, a transparent overlay or companion debug console window will appear confirming <code>[FFVIISE Loader] Hook established successfully!</code>."
              }
            ]
          },
          {
            id: "7thheaven-migration",
            title: "7th Heaven to FFVIISE Mod Loader Migration",
            readingTime: "10 min read",
            difficulty: "Advanced",
            summary: "Comprehensive tutorial on converting legacy .iro archives and LGP patches into clean folder hierarchies compatible with the native loader.",
            steps: [
              {
                title: "1. Understanding .iro Archive Architecture",
                description: "Legacy 7th Heaven mods bundle textures, sound files, and logic into packed <code>.iro</code> archives. The FFVIISE mod loader supports uncompressed, highly-organized direct file paths with faster disk-to-memory throughput.",
                callout: {
                  type: "note",
                  title: "Why Migrate?",
                  content: "Native loading eliminates legacy virtual disk drivers, reduces startup times by over 70%, and provides direct compatibility with modern Windows 11 memory safeguards."
                }
              },
              {
                title: "2. Running the Automated Transpiler CLI",
                description: "Use our CLI toolkit to unpack and generate compatible <code>mod.json</code> manifest descriptors automatically.",
                codeBlock: {
                  language: "bash",
                  filename: "Terminal / PowerShell Execution",
                  code: `# Download or build the 7th-to-ffviise toolkit
cargo install ffviise-tools

# Run automated batch migration on your 7th Heaven mods folder
ffviise-tools unpack --input "C:/7thHeaven/mods" --output "FINAL FANTASY VII/mods" --generate-manifests`
                }
              },
              {
                title: "3. Inspecting the Generated Manifest",
                description: "Each unpacked mod folder will contain an updated <code>mod.json</code> defining load order priority and asset overrides.",
                codeBlock: {
                  language: "json",
                  filename: "mods/Gameplay_Overhaul/mod.json",
                  code: `{
  "name": "Gameplay Overhaul 2026",
  "version": "2.4.0",
  "author": "OdinJ",
  "priority": 100,
  "overrides": {
    "battle_kernel": "./kernel/scene.bin",
    "text_dialogue": "./kernel/kernel.bin"
  }
}`
                }
              }
            ]
          }
        ]
      },
      {
        id: "playstation-reverse-engineering",
        title: "Retro Console Disassembly & Memory Hooking",
        description: "Static analysis, MIPS assembly decompilation, and dynamic memory tracing for classic 32-bit console binaries.",
        guides: [
          {
            id: "ps1-mips-ghidra-setup",
            title: "Setting up Ghidra for PSX MIPS R3000A Binaries",
            readingTime: "8 min read",
            difficulty: "Intermediate",
            summary: "Configuring memory map boundaries, BIOS vector tables, and symbol definitions for PlayStation 1 executable analysis.",
            steps: [
              {
                title: "1. Ghidra Memory Map Setup",
                description: "PS1 RAM is mirrored across KUSEG, KSEG0, and KSEG1 address spaces. Define base address <code>0x80000000</code> with length <code>0x200000</code> (2MB RAM).",
                codeBlock: {
                  language: "text",
                  filename: "Ghidra Memory Configuration",
                  code: `Block Name: RAM_MAIN
Start Address: 0x80000000
Length: 0x00200000 (2097152 bytes)
Read/Write/Execute: [X] Read [X] Write [X] Execute`
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "audio-hardware",
    title: "Audio & Hardware Engineering",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    summary: "Digital signal processing (DSP), analog audio circuitry, microcontrollers, and hardware synthesizer design.",
    subcategories: [
      {
        id: "dsp-synthesis",
        title: "Real-Time Embedded Audio DSP",
        description: "Low-latency digital audio algorithms, fixed-point math optimization, and STM32 I2S DMA pipeline architecture.",
        guides: [
          {
            id: "stm32-i2s-dma-audio",
            title: "Building an I2S Double-Buffered Audio Engine on STM32",
            readingTime: "12 min read",
            difficulty: "Advanced",
            summary: "Implement zero-dropout audio processing via circular DMA buffers, handling half-transfer and full-transfer hardware interrupts.",
            steps: [
              {
                title: "1. Ping-Pong Buffer Architecture",
                description: "Allocate a stereo 32-bit sample buffer. The DMA hardware streams the first half while the CPU computes the second half.",
                codeBlock: {
                  language: "c",
                  filename: "audio_pipeline.c",
                  code: `#define BUFFER_SAMPLES 256
int32_t audio_dma_buffer[BUFFER_SAMPLES * 2]; // Stereo ping-pong

void HAL_I2S_TxHalfCpltCallback(I2S_HandleTypeDef *hi2s) {
    // Process first half of audio buffer (samples 0 to BUFFER_SAMPLES/2 - 1)
    render_audio_block(&audio_dma_buffer[0], BUFFER_SAMPLES / 2);
}

void HAL_I2S_TxCpltCallback(I2S_HandleTypeDef *hi2s) {
    // Process second half of audio buffer
    render_audio_block(&audio_dma_buffer[BUFFER_SAMPLES / 2], BUFFER_SAMPLES / 2);
}`
                },
                callout: {
                  type: "tip",
                  title: "Interrupt Priority Reminder",
                  content: "Ensure your I2S DMA interrupt priority is higher than SysTick or USB to prevent buffer underruns during heavy system events."
                }
              }
            ]
          }
        ]
      },
      {
        id: "eurorack-analog",
        title: "Eurorack & Analog Synthesis Circuitry",
        description: "Op-amp filter topologies, precision CV generation, and low-noise power distribution design.",
        guides: [
          {
            id: "precision-dac-1v-oct",
            title: "Designing 1V/Octave Calibration for 16-Bit DACs",
            readingTime: "7 min read",
            difficulty: "Intermediate",
            summary: "Calibrating pitch CV output across 8 octaves using precision voltage references and polynomial temperature compensation.",
            steps: [
              {
                title: "1. Voltage Reference Selection",
                description: "Select an ultra-low drift voltage reference (e.g. ADR4540 or REF5040) with < 3ppm/°C thermal coefficient to maintain exact semitone intervals across thermal variations."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "developer-tooling",
    title: "Developer Tools & DevOps Systems",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    summary: "Modern build scripts, automated workflows, GitHub Pages CI/CD, and lightweight developer utilities.",
    subcategories: [
      {
        id: "github-pages-hosting",
        title: "GitHub Pages & Custom Domain Deployments",
        description: "Zero-friction static deployments, client-side routing fallback strategies, and automated Git synchronization.",
        guides: [
          {
            id: "deploying-static-portfolio",
            title: "Configuring Apex Domain & GitHub Pages",
            readingTime: "5 min read",
            difficulty: "Beginner",
            summary: "Guide to deploying your personal top-level ecosystem to GitHub Pages with automated HTTPS certification.",
            steps: [
              {
                title: "1. Branch & Directory Targeting",
                description: "In your GitHub repository settings under Pages, set the Source to <code>Deploy from a branch</code>, select branch <code>main</code>, and choose folder <code>/ (root)</code>."
              },
              {
                title: "2. Optional CNAME Configuration",
                description: "If mapping a custom top-level apex domain, create a <code>CNAME</code> file in the repository root containing your custom domain.",
                codeBlock: {
                  language: "text",
                  filename: "CNAME",
                  code: `example.com`
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
