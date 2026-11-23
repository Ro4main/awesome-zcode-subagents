<div align="center">

# Awesome Subagents (ZCode & OpenCode)

**The awesome collection of 170+ subagents across 11 categories for ZCode and OpenCode.**

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
![Subagent Count](https://img.shields.io/badge/subagents-170-blue?style=classic)
![Platform](https://img.shields.io/badge/platform-ZCode%20%7C%20OpenCode-blueviolet?style=classic)

</div>

This repository serves as the definitive collection of subagents for **ZCode** and **OpenCode**, specialized AI assistants designed for specific development tasks.

> **Credits:** This collection is an adaptation of [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) supporting both **ZCode** and **OpenCode** — agent definitions feature dual compatibility (`mode: subagent`, inherit-by-default models, and platform-specific tool/permission mapping), and plugin manifests in `.zcode-plugin/`. All credit for the original 166 agent definitions goes to the VoltAgent community.

## Installation

### Option 1: NPX Zero-Install (Recommended for Windows, macOS, Linux)

No git clone, curl, or bash required — run directly via `npx` in any terminal (**PowerShell**, **Command Prompt**, **Windows Terminal**, **macOS Terminal**, or **Linux**):

```bash
# Launch interactive installer menu (supports ZCode & OpenCode)
npx github:a2mus/awesome-zcode-subagents
```

#### OpenCode Commands:
```bash
# Install recommended Starter Pack for OpenCode (global: ~/.config/opencode/agents/)
npx github:a2mus/awesome-zcode-subagents --opencode --starter

# Install into current project for OpenCode (.opencode/agents/)
npx github:a2mus/awesome-zcode-subagents --opencode --project --starter
npx github:a2mus/awesome-zcode-subagents --opencode --project --all

# Install specific agent(s) for OpenCode
npx github:a2mus/awesome-zcode-subagents --opencode --agent code-reviewer,debugger

# List installed OpenCode subagents
npx github:a2mus/awesome-zcode-subagents --opencode --installed
```

#### ZCode Commands:
```bash
# Install recommended Starter Pack for ZCode (default: ~/.zcode/agents/)
npx github:a2mus/awesome-zcode-subagents --starter

# Install a specific category for ZCode
npx github:a2mus/awesome-zcode-subagents -c 01-core-development
npx github:a2mus/awesome-zcode-subagents -c 02-language-specialists

# Install all 170+ agents for ZCode
npx github:a2mus/awesome-zcode-subagents --all

# List installed agents in your ZCode directory
npx github:a2mus/awesome-zcode-subagents --installed
```

#### Both Assistants Simultaneously:
```bash
# Install starter pack into BOTH ZCode and OpenCode
npx github:a2mus/awesome-zcode-subagents --both --starter

# Install all 170+ agents into BOTH ZCode and OpenCode
npx github:a2mus/awesome-zcode-subagents --both --all
```

---

### Option 2: As a ZCode Plugin (In-App Marketplace)

ZCode can install these agents as plugins from its marketplace:

1. Open ZCode **Settings → Plugin Management → Discover**
2. Click **`+`** to add a marketplace and point it at this repository (`https://github.com/a2mus/awesome-zcode-subagents`)
3. Install the category plugins you want, e.g. `zcode-lang` (language specialists) or `zcode-infra` (infrastructure & DevOps)

See [Categories](#-categories) below for all available plugins.

---

### Option 3: Manual Installation (Windows, macOS, Linux)

#### For OpenCode:
```bash
# Global scope (all projects):
mkdir -p ~/.config/opencode/agents
cp categories/02-language-specialists/agents/python-pro.md ~/.config/opencode/agents/

# Local scope (current project):
mkdir -p .opencode/agents
cp categories/02-language-specialists/agents/python-pro.md .opencode/agents/
```

#### For ZCode:
- **Windows (PowerShell):**
  ```powershell
  New-Item -ItemType Directory -Force -Path "$HOME\.zcode\agents"
  Copy-Item -Path "categories\02-language-specialists\python-pro.md" -Destination "$HOME\.zcode\agents\"
  ```
- **macOS / Linux:**
  ```bash
  mkdir -p ~/.zcode/agents
  cp categories/02-language-specialists/agents/python-pro.md ~/.zcode/agents/
  ```

---

### Option 4: Interactive Bash Script
```bash
git clone https://github.com/a2mus/awesome-zcode-subagents.git
cd awesome-zcode-subagents

# Interactive menu (choose ZCode or OpenCode)
./install-agents.sh

# Target OpenCode directly
./install-agents.sh --opencode
```

---

### Option 5: Standalone Curl Installer (no clone required)
```bash
curl -sO https://raw.githubusercontent.com/a2mus/awesome-zcode-subagents/main/install-agents.sh
chmod +x install-agents.sh
./install-agents.sh --opencode
```

---

### Option 6: Agent Installer (in-agent installation)
Install the `agent-installer` subagent directly into your assistant:
- For OpenCode: save to `~/.config/opencode/agents/agent-installer.md`
- For ZCode: save to `~/.zcode/agents/agent-installer.md`

Then ask: *"Use the agent-installer to find out which Python agents are available"* or *"Install code-reviewer"*.

## 📚 Categories

### [01. Core Development](categories/01-core-development/)
**Plugin:** `zcode-core-dev`

Essential development subagents for everyday coding tasks.

- [**api-designer**](categories/01-core-development/agents/api-designer.md) - REST and GraphQL API architect
- [**auth-integration-engineer**](categories/01-core-development/agents/auth-integration-engineer.md) - Authentication and authorization specialist
- [**backend-developer**](categories/01-core-development/agents/backend-developer.md) - Server-side expert for scalable APIs
- [**design-bridge**](categories/01-core-development/agents/design-bridge.md) - Design-to-agent translator
- [**electron-pro**](categories/01-core-development/agents/electron-pro.md) - Desktop application expert
- [**frontend-developer**](categories/01-core-development/agents/frontend-developer.md) - UI/UX specialist for React, Vue, and Angular
- [**fullstack-developer**](categories/01-core-development/agents/fullstack-developer.md) - End-to-end feature development
- [**graphql-architect**](categories/01-core-development/agents/graphql-architect.md) - GraphQL schema and federation expert
- [**microservices-architect**](categories/01-core-development/agents/microservices-architect.md) - Distributed systems designer
- [**mobile-developer**](categories/01-core-development/agents/mobile-developer.md) - Cross-platform mobile specialist
- [**ui-designer**](categories/01-core-development/agents/ui-designer.md) - Visual design and interaction specialist
- [**webhook-engineer**](categories/01-core-development/agents/webhook-engineer.md) - Webhook delivery and consumption specialist
- [**websocket-engineer**](categories/01-core-development/agents/websocket-engineer.md) - Real-time communication specialist


### [02. Language Specialists](categories/02-language-specialists/)
**Plugin:** `zcode-lang`

Language-specific experts with deep framework knowledge.
- [**typescript-pro**](categories/02-language-specialists/agents/typescript-pro.md) - TypeScript specialist
- [**sql-pro**](categories/02-language-specialists/agents/sql-pro.md) - Database query expert
- [**swift-expert**](categories/02-language-specialists/agents/swift-expert.md) - iOS and macOS specialist
- [**vue-expert**](categories/02-language-specialists/agents/vue-expert.md) - Vue 3 Composition API expert
- [**angular-architect**](categories/02-language-specialists/agents/angular-architect.md) - Angular 15+ enterprise patterns expert
- [**cpp-pro**](categories/02-language-specialists/agents/cpp-pro.md) - C++ performance expert
- [**csharp-developer**](categories/02-language-specialists/agents/csharp-developer.md) - .NET ecosystem specialist
- [**django-developer**](categories/02-language-specialists/agents/django-developer.md) - Django 4+ web development expert
- [**dotnet-core-expert**](categories/02-language-specialists/agents/dotnet-core-expert.md) - .NET 8 cross-platform specialist
- [**dotnet-framework-4.8-expert**](categories/02-language-specialists/agents/dotnet-framework-4.8-expert.md) - .NET Framework legacy enterprise specialist
- [**elixir-expert**](categories/02-language-specialists/agents/elixir-expert.md) - Elixir and OTP fault-tolerant systems expert
- [**expo-react-native-expert**](categories/02-language-specialists/agents/expo-react-native-expert.md) - Expo and React Native mobile development expert
- [**fastapi-developer**](categories/02-language-specialists/agents/fastapi-developer.md) - Modern async Python API framework expert
- [**flutter-expert**](categories/02-language-specialists/agents/flutter-expert.md) - Flutter 3+ cross-platform mobile expert
- [**golang-pro**](categories/02-language-specialists/agents/golang-pro.md) - Go concurrency specialist
- [**java-architect**](categories/02-language-specialists/agents/java-architect.md) - Enterprise Java expert
- [**javascript-pro**](categories/02-language-specialists/agents/javascript-pro.md) - JavaScript development expert
- [**powershell-5.1-expert**](categories/02-language-specialists/agents/powershell-5.1-expert.md) - Windows PowerShell 5.1 and full .NET Framework automation specialist
- [**powershell-7-expert**](categories/02-language-specialists/agents/powershell-7-expert.md) - Cross-platform PowerShell 7+ automation and modern .NET specialist
- [**kotlin-specialist**](categories/02-language-specialists/agents/kotlin-specialist.md) - Modern JVM language expert
- [**laravel-specialist**](categories/02-language-specialists/agents/laravel-specialist.md) - Laravel 10+ PHP framework expert
- [**nextjs-developer**](categories/02-language-specialists/agents/nextjs-developer.md) - Next.js 14+ full-stack specialist
- [**node-specialist**](categories/02-language-specialists/agents/node-specialist.md) - Node.js specialist
- [**php-pro**](categories/02-language-specialists/agents/php-pro.md) - PHP web development expert
- [**python-pro**](categories/02-language-specialists/agents/python-pro.md) - Python ecosystem master
- [**rails-expert**](categories/02-language-specialists/agents/rails-expert.md) - Rails 8.1 rapid development expert
- [**react-specialist**](categories/02-language-specialists/agents/react-specialist.md) - React 18+ modern patterns expert
- [**rust-engineer**](categories/02-language-specialists/agents/rust-engineer.md) - Systems programming expert
- [**spring-boot-engineer**](categories/02-language-specialists/agents/spring-boot-engineer.md) - Spring Boot 3+ microservices expert
- [**symfony-specialist**](categories/02-language-specialists/agents/symfony-specialist.md) - Symfony 6+/7+/8+ PHP framework and Doctrine ORM expert


### [03. Infrastructure](categories/03-infrastructure/)
**Plugin:** `zcode-infra`

DevOps, cloud, and deployment specialists.

- [**azure-infra-engineer**](categories/03-infrastructure/agents/azure-infra-engineer.md) - Azure infrastructure and Az PowerShell automation expert
- [**cloud-architect**](categories/03-infrastructure/agents/cloud-architect.md) - AWS/GCP/Azure specialist
- [**database-administrator**](categories/03-infrastructure/agents/database-administrator.md) - Database management expert
- [**docker-expert**](categories/03-infrastructure/agents/docker-expert.md) - Docker containerization and optimization expert
- [**deployment-engineer**](categories/03-infrastructure/agents/deployment-engineer.md) - Deployment automation specialist
- [**devops-engineer**](categories/03-infrastructure/agents/devops-engineer.md) - CI/CD and automation expert
- [**devops-incident-responder**](categories/03-infrastructure/agents/devops-incident-responder.md) - DevOps incident management
- [**incident-responder**](categories/03-infrastructure/agents/incident-responder.md) - System incident response expert
- [**kubernetes-specialist**](categories/03-infrastructure/agents/kubernetes-specialist.md) - Container orchestration master
- [**network-engineer**](categories/03-infrastructure/agents/network-engineer.md) - Network infrastructure specialist
- [**platform-engineer**](categories/03-infrastructure/agents/platform-engineer.md) - Platform architecture expert
- [**security-engineer**](categories/03-infrastructure/agents/security-engineer.md) - Infrastructure security specialist
- [**sre-engineer**](categories/03-infrastructure/agents/sre-engineer.md) - Site reliability engineering expert
- [**terraform-engineer**](categories/03-infrastructure/agents/terraform-engineer.md) - Infrastructure as Code expert
- [**terragrunt-expert**](categories/03-infrastructure/agents/terragrunt-expert.md) - Terragrunt orchestration and DRY IaC specialist
- [**windows-infra-admin**](categories/03-infrastructure/agents/windows-infra-admin.md) - Active Directory, DNS, DHCP, and GPO automation specialist

### [04. Quality & Security](categories/04-quality-security/)
**Plugin:** `zcode-qa-sec`

Testing, security, and code quality experts.

- [**accessibility-tester**](categories/04-quality-security/agents/accessibility-tester.md) - A11y compliance expert
- [**ad-security-reviewer**](categories/04-quality-security/agents/ad-security-reviewer.md) - Active Directory security and GPO audit specialist
- [**ai-writing-auditor**](categories/04-quality-security/agents/ai-writing-auditor.md) - AI writing pattern detector and rewriter
- [**architect-reviewer**](categories/04-quality-security/agents/architect-reviewer.md) - Architecture review specialist
- [**chaos-engineer**](categories/04-quality-security/agents/chaos-engineer.md) - System resilience testing expert
- [**code-reviewer**](categories/04-quality-security/agents/code-reviewer.md) - Code quality guardian
- [**compliance-auditor**](categories/04-quality-security/agents/compliance-auditor.md) - Regulatory compliance expert
- [**debugger**](categories/04-quality-security/agents/debugger.md) - Advanced debugging specialist
- [**gdpr-ccpa-compliance**](categories/04-quality-security/agents/gdpr-ccpa-compliance.md) - GDPR and CCPA privacy compliance specialist
- [**error-detective**](categories/04-quality-security/agents/error-detective.md) - Error analysis and resolution expert
- [**penetration-tester**](categories/04-quality-security/agents/penetration-tester.md) - Ethical hacking specialist
- [**performance-engineer**](categories/04-quality-security/agents/performance-engineer.md) - Performance optimization expert
- [**ponder-auditor**](categories/04-quality-security/agents/ponder-auditor.md) - Convergent multi-pass codebase, UI, and security deliberation specialist with 100% coverage gate and epistemic silence
- [**powershell-security-hardening**](categories/04-quality-security/agents/powershell-security-hardening.md) - PowerShell security hardening and compliance specialist
- [**qa-expert**](categories/04-quality-security/agents/qa-expert.md) - Test automation specialist
- [**security-auditor**](categories/04-quality-security/agents/security-auditor.md) - Security vulnerability expert
- [**surgeon-reviewer**](categories/04-quality-security/agents/surgeon-reviewer.md) - Zero-noise code review with severity tiers and ship/no-ship verdict
- [**test-automator**](categories/04-quality-security/agents/test-automator.md) - Test automation framework expert
- [**ui-ux-tester**](categories/04-quality-security/agents/ui-ux-tester.md) - Exhaustive documented-flow UI tester

### [05. Data & AI](categories/05-data-ai/)
**Plugin:** `zcode-data-ai`

Data engineering, ML, and AI specialists.

- [**ai-engineer**](categories/05-data-ai/agents/ai-engineer.md) - AI system design and deployment expert
- [**data-analyst**](categories/05-data-ai/agents/data-analyst.md) - Data insights and visualization specialist
- [**data-engineer**](categories/05-data-ai/agents/data-engineer.md) - Data pipeline architect
- [**data-scientist**](categories/05-data-ai/agents/data-scientist.md) - Analytics and insights expert
- [**database-optimizer**](categories/05-data-ai/agents/database-optimizer.md) - Database performance specialist
- [**llm-architect**](categories/05-data-ai/agents/llm-architect.md) - Large language model architect
- [**machine-learning-engineer**](categories/05-data-ai/agents/machine-learning-engineer.md) - Machine learning systems expert
- [**ml-engineer**](categories/05-data-ai/agents/ml-engineer.md) - Machine learning specialist
- [**mlops-engineer**](categories/05-data-ai/agents/mlops-engineer.md) - MLOps and model deployment expert
- [**nlp-engineer**](categories/05-data-ai/agents/nlp-engineer.md) - Natural language processing expert
- [**postgres-pro**](categories/05-data-ai/agents/postgres-pro.md) - PostgreSQL database expert
- [**prompt-engineer**](categories/05-data-ai/agents/prompt-engineer.md) - Prompt optimization specialist
- [**reinforcement-learning-engineer**](categories/05-data-ai/agents/reinforcement-learning-engineer.md) - Reinforcement learning and agent training expert

### [06. Developer Experience](categories/06-developer-experience/)
**Plugin:** `zcode-dev-exp`

Tooling and developer productivity experts.

- [**build-engineer**](categories/06-developer-experience/agents/build-engineer.md) - Build system specialist
- [**cli-developer**](categories/06-developer-experience/agents/cli-developer.md) - Command-line tool creator
- [**dependency-manager**](categories/06-developer-experience/agents/dependency-manager.md) - Package and dependency specialist
- [**docs-drift-editor**](categories/06-developer-experience/agents/docs-drift-editor.md) - Documentation-drift editor for isolated-worktree fixes
- [**documentation-engineer**](categories/06-developer-experience/agents/documentation-engineer.md) - Technical documentation expert
- [**dx-optimizer**](categories/06-developer-experience/agents/dx-optimizer.md) - Developer experience optimization specialist
- [**git-workflow-manager**](categories/06-developer-experience/agents/git-workflow-manager.md) - Git workflow and branching expert
- [**legacy-modernizer**](categories/06-developer-experience/agents/legacy-modernizer.md) - Legacy code modernization specialist
- [**mcp-developer**](categories/06-developer-experience/agents/mcp-developer.md) - Model Context Protocol specialist
- [**powershell-ui-architect**](categories/06-developer-experience/agents/powershell-ui-architect.md) - PowerShell UI/UX specialist for WinForms, WPF, Metro frameworks, and TUIs
- [**powershell-module-architect**](categories/06-developer-experience/agents/powershell-module-architect.md) - PowerShell module and profile architecture specialist
- [**readme-generator**](categories/06-developer-experience/agents/readme-generator.md) - Repository README generation specialist
- [**refactoring-specialist**](categories/06-developer-experience/agents/refactoring-specialist.md) - Code refactoring expert
- [**slack-expert**](categories/06-developer-experience/agents/slack-expert.md) - Slack platform and @slack/bolt specialist
- [**tooling-engineer**](categories/06-developer-experience/agents/tooling-engineer.md) - Developer tooling specialist
- [**visual-asset-generator**](categories/06-developer-experience/agents/visual-asset-generator.md) - Visual asset generation specialist using prompt-to-asset MCP across 30+ image models

### [07. Specialized Domains](categories/07-specialized-domains/)
**Plugin:** `zcode-domains`

Domain-specific technology experts.

- [**api-documenter**](categories/07-specialized-domains/agents/api-documenter.md) - API documentation specialist
- [**blockchain-developer**](categories/07-specialized-domains/agents/blockchain-developer.md) - Web3 and crypto specialist
- [**email-deliverability-engineer**](categories/07-specialized-domains/agents/email-deliverability-engineer.md) - Email deliverability specialist
- [**embedded-systems**](categories/07-specialized-domains/agents/embedded-systems.md) - Embedded and real-time systems expert
- [**fintech-engineer**](categories/07-specialized-domains/agents/fintech-engineer.md) - Financial technology specialist
- [**game-developer**](categories/07-specialized-domains/agents/game-developer.md) - Game development expert
- [**healthcare-admin**](categories/07-specialized-domains/agents/healthcare-admin.md) - Healthcare administration specialist with 51 sub-agents covering revenue cycle, compliance, quality, clinical ops, health IT, and payer relations
- [**hipaa-compliance**](categories/07-specialized-domains/agents/hipaa-compliance.md) - HIPAA compliance specialist for healthcare SaaS vendors
- [**iot-engineer**](categories/07-specialized-domains/agents/iot-engineer.md) - IoT systems developer
- [**m365-admin**](categories/07-specialized-domains/agents/m365-admin.md) - Microsoft 365, Exchange Online, Teams, and SharePoint administration specialist
- [**mobile-app-developer**](categories/07-specialized-domains/agents/mobile-app-developer.md) - Mobile application specialist
- [**motion-director**](categories/07-specialized-domains/agents/motion-director.md) - Motion graphics and deterministic video rendering specialist
- [**payment-integration**](categories/07-specialized-domains/agents/payment-integration.md) - Payment systems expert
- [**quant-analyst**](categories/07-specialized-domains/agents/quant-analyst.md) - Quantitative analysis specialist
- [**risk-manager**](categories/07-specialized-domains/agents/risk-manager.md) - Risk assessment and management expert
- [**seo-specialist**](categories/07-specialized-domains/agents/seo-specialist.md) - Search engine optimization expert
- [**x-api-integration**](categories/07-specialized-domains/agents/x-api-integration.md) - X/Twitter API integration specialist

### [08. Business & Product](categories/08-business-product/)
**Plugin:** `zcode-biz`

Product management and business analysis.

- [**assumption-mapping**](categories/08-business-product/agents/assumption-mapping.md) - Product assumption risk and validation specialist
- [**backlog-grooming**](categories/08-business-product/agents/backlog-grooming.md) - Agile backlog refinement specialist
- [**business-analyst**](categories/08-business-product/agents/business-analyst.md) - Requirements specialist
- [**content-marketer**](categories/08-business-product/agents/content-marketer.md) - Content marketing specialist
- [**customer-success-manager**](categories/08-business-product/agents/customer-success-manager.md) - Customer success expert
- [**growth-loops**](categories/08-business-product/agents/growth-loops.md) - Growth loop and PLG mechanics specialist
- [**landing-page-copywriter**](categories/08-business-product/agents/landing-page-copywriter.md) - Conversion copywriting specialist
- [**legal-advisor**](categories/08-business-product/agents/legal-advisor.md) - Legal and compliance specialist
- [**license-engineer**](categories/08-business-product/agents/license-engineer.md) - Software licensing and compliance systems specialist
- [**product-manager**](categories/08-business-product/agents/product-manager.md) - Product strategy expert
- [**project-manager**](categories/08-business-product/agents/project-manager.md) - Project management specialist
- [**sales-engineer**](categories/08-business-product/agents/sales-engineer.md) - Technical sales expert
- [**scrum-master**](categories/08-business-product/agents/scrum-master.md) - Agile methodology expert
- [**technical-writer**](categories/08-business-product/agents/technical-writer.md) - Technical documentation specialist
- [**telegram-ads-analyst**](categories/08-business-product/agents/telegram-ads-analyst.md) - Telegram channel ad vetting and pricing specialist
- [**ux-microcopy-reviewer**](categories/08-business-product/agents/ux-microcopy-reviewer.md) - UI microcopy review specialist
- [**ux-researcher**](categories/08-business-product/agents/ux-researcher.md) - User research expert
- [**wordpress-master**](categories/08-business-product/agents/wordpress-master.md) - WordPress development and optimization expert
- [**content-quality-editor**](categories/08-business-product/agents/content-quality-editor.md) - AI content quality specialist using unslop to strip AI writing patterns before publishing

### [09. Meta & Orchestration](categories/09-meta-orchestration/)
**Plugin:** `zcode-meta`

Agent coordination and meta-programming.

- [**airis-mcp-gateway**](https://github.com/agiletec-inc/airis-mcp-gateway) - Docker-based MCP multiplexer that aggregates 60+ tools behind 7 meta-tools, reducing context token usage by 97%. One command to start, auto-enables servers on demand
- [**moai-adk**](https://github.com/modu-ai/moai-adk) - SPEC-first Agentic Development Kit orchestrating 24 specialized agents with enforced Plan→Run→Sync workflow, TRUST 5 quality gates, 52 domain-specific skills, and 16-language project support
- [**agent-installer**](categories/09-meta-orchestration/agents/agent-installer.md) - Browse and install agents from this repository via GitHub
- [**agent-organizer**](categories/09-meta-orchestration/agents/agent-organizer.md) - Multi-agent coordinator
- [**codebase-orchestrator**](categories/09-meta-orchestration/agents/codebase-orchestrator.md) - Safe refactor governance orchestrator
- [**context-manager**](categories/09-meta-orchestration/agents/context-manager.md) - Context optimization expert
- [**error-coordinator**](categories/09-meta-orchestration/agents/error-coordinator.md) - Error handling and recovery specialist
- [**it-ops-orchestrator**](categories/09-meta-orchestration/agents/it-ops-orchestrator.md) - IT operations workflow orchestration specialist
- [**knowledge-synthesizer**](categories/09-meta-orchestration/agents/knowledge-synthesizer.md) - Knowledge aggregation expert
- [**memory-curator**](categories/09-meta-orchestration/agents/memory-curator.md) - Long-term memory discipline across sessions
- [**multi-agent-coordinator**](categories/09-meta-orchestration/agents/multi-agent-coordinator.md) - Advanced multi-agent orchestration
- [**performance-monitor**](categories/09-meta-orchestration/agents/performance-monitor.md) - Agent performance optimization
- [**pied-piper**](https://github.com/sathish316/pied-piper/) - Orchestrate Team of AI Subagents for repetitive SDLC workflows
- [**task-distributor**](categories/09-meta-orchestration/agents/task-distributor.md) - Task allocation specialist
- [**taskade**](https://github.com/taskade/mcp) - AI-powered workspace with autonomous agents, real-time collaboration, and workflow automation with MCP integration
- [**workflow-orchestrator**](categories/09-meta-orchestration/agents/workflow-orchestrator.md) - Complex workflow automation

### [10. Research & Analysis](categories/10-research-analysis/)
**Plugin:** `zcode-research`

Research, search, and analysis specialists.

- [**ab-test-analysis**](categories/10-research-analysis/agents/ab-test-analysis.md) - A/B test analysis and ship/no-ship decision specialist
- [**cohort-analysis**](categories/10-research-analysis/agents/cohort-analysis.md) - User cohort retention and behavioral analysis specialist
- [**first-principles-thinking**](categories/10-research-analysis/agents/first-principles-thinking.md) - First principles problem-solving specialist
- [**research-analyst**](categories/10-research-analysis/agents/research-analyst.md) - Comprehensive research specialist
- [**search-specialist**](categories/10-research-analysis/agents/search-specialist.md) - Advanced information retrieval expert
- [**trend-analyst**](categories/10-research-analysis/agents/trend-analyst.md) - Emerging trends and forecasting expert
- [**competitive-analyst**](categories/10-research-analysis/agents/competitive-analyst.md) - Competitive intelligence specialist
- [**market-researcher**](categories/10-research-analysis/agents/market-researcher.md) - Market analysis and consumer insights
- [**project-idea-validator**](categories/10-research-analysis/agents/project-idea-validator.md) - Brutal go/no-go product idea validator
- [**data-researcher**](categories/10-research-analysis/agents/data-researcher.md) - Data discovery and analysis expert
- [**scientific-literature-researcher**](categories/10-research-analysis/agents/scientific-literature-researcher.md) - Scientific paper search and evidence synthesis via [BGPT MCP](https://github.com/connerlambden/bgpt-mcp)

### [11. Performance Engineering](categories/11-performance-engineering/)
**Plugin:** `zcode-performance-engineering`

Evidence-driven GPU kernel optimization with shared execution roles and bundled performance skills. Use the ZCode plugin marketplace installation for this category so its skills are installed together with the agents.

- [**gpu-kernel-expert**](categories/11-performance-engineering/agents/gpu-kernel-expert.md) - CUDA/Triton/HIP kernel design and evidence-based optimization specialist
- [**bench-runner**](categories/11-performance-engineering/agents/bench-runner.md) - Shared correctness and benchmark execution role
- [**profile-analyst**](categories/11-performance-engineering/agents/profile-analyst.md) - Nsight Compute/Systems evidence analysis specialist
- [**perf-verifier**](categories/11-performance-engineering/agents/perf-verifier.md) - Independent benchmark, lineage and integrity verifier

## 🤖 Understanding Subagents

Subagents are specialized AI assistants that enhance ZCode's capabilities by providing task-specific expertise. They act as dedicated helpers that ZCode can call upon when encountering particular types of work.

### What Makes Subagents Special?

**Independent Context Windows**  
Every subagent operates within its own isolated context space, preventing cross-contamination between different tasks and maintaining clarity in the primary conversation thread.

**Domain-Specific Intelligence**  
Subagents come equipped with carefully crafted instructions tailored to their area of expertise, resulting in superior performance on specialized tasks.

**Shared Across Projects**  
After creating a subagent, you can utilize it throughout various projects and distribute it among team members to ensure consistent development practices.

**Granular Tool Permissions**  
You can configure each subagent with specific tool access rights, enabling fine-grained control over which capabilities are available for different task types.

### Core Advantages

- **Memory Efficiency**: Isolated contexts prevent the main conversation from becoming cluttered with task-specific details
- **Enhanced Accuracy**: Specialized prompts and configurations lead to better results in specific domains
- **Workflow Consistency**: Team-wide subagent sharing ensures uniform approaches to common tasks
- **Security Control**: Tool access can be restricted based on subagent type and purpose

### Getting Started with Subagents

#### In ZCode:
1. Drop agent `.md` files into `~/.zcode/agents/` (or use `npx github:a2mus/awesome-zcode-subagents --starter`).
2. Restart your ZCode session.
3. Subagents trigger automatically based on task descriptions, or invoke directly with `@<agent-name>`:
   ```
   > Have @code-reviewer analyze my latest commits
   ```

#### In OpenCode:
1. Install agents to `~/.config/opencode/agents/` (global) or `.opencode/agents/` (current project) using:
   ```bash
   npx github:a2mus/awesome-zcode-subagents --opencode --starter
   ```
2. Start OpenCode in your project terminal: `opencode`.
3. OpenCode automatically discovers custom subagents with `mode: subagent`.
4. Invoke any subagent using `@` mention:
   ```
   > @python-pro refactor the data pipeline to use async iterators
   ```
5. Primary agents (`build`, `plan`) can also autonomously delegate subtasks to these agents!

### Subagent Storage Locations

| Assistant | Scope | Path | Availability |
|-----------|-------|------|--------------|
| **OpenCode** | User (global) | `~/.config/opencode/agents/` | Available across all projects |
| **OpenCode** | Project (local)| `.opencode/agents/` | Current repository only |
| **ZCode** | User (global) | `~/.zcode/agents/` | Available across all projects |
| **ZCode** | Project (local)| `.zcode/agents/` | Current repository only |

## 📖 Subagent Structure

Each subagent follows a dual-compatible template:

```yaml
---
name: subagent-name
description: When this agent should be invoked
mode: subagent
tools: Read, Write, Edit, Bash, Glob, Grep
---

You are a [role description and expertise areas]...

[Agent-specific checklists, patterns, and guidelines]...

## Communication Protocol
Inter-agent communication specifications...

## Development Workflow
Structured implementation phases...
```

### Model Selection

By default, subagents omit the `model` field and inherit whatever model your primary ZCode agent is currently using. You can pin a specific model id or tune reasoning per agent by editing its frontmatter:

| Frontmatter field | Effect | Good for |
|-------------------|--------|----------|
| *(omitted)* / `model: inherit` | Follows the primary agent's current model | Most agents — one model switch updates everything |
| `model: <model-id>` | Pins the subagent to a specific model | Cost-sensitive or heavyweight agents |
| `thoughtLevel: high` | Deeper reasoning (only with a pinned model) | Architecture reviews, security audits |

### Tool Assignment Philosophy

Each subagent's `tools` field specifies ZCode built-in tools, optimized for their role:
- **Read-only agents** (reviewers, auditors): `Read, Grep, Glob` - analyze without modifying
- **Research agents** (analysts, researchers): `Read, Grep, Glob, WebFetch, WebSearch` - gather information
- **Code writers** (developers, engineers): `Read, Write, Edit, Bash, Glob, Grep` - create and execute
- **Documentation agents** (writers, documenters): `Read, Write, Edit, Glob, Grep, WebFetch, WebSearch` - document with research

Each agent has minimal necessary permissions. You can extend agents by adding MCP servers or external tools to the `tools` field.

## 🧰 Tools

### [subagent-catalog](tools/subagent-catalog/)
ZCode skill for browsing and fetching subagents from this catalog.

| Command | Description |
|---------|-------------|
| `/subagent-catalog:search <query>` | Find agents by name, description, or category |
| `/subagent-catalog:fetch <name>` | Get full agent definition |
| `/subagent-catalog:list` | Browse all categories |
| `/subagent-catalog:invalidate` | Refresh cache |

**Installation:**
```bash
cp -r tools/subagent-catalog ~/.zcode/commands/
```



## Development

Validate all plugin manifests, agent definitions, names, versions and documentation links:

```bash
npm run validate
```

Compare with a local `awesome-claude-code-subagents` checkout:

```bash
npm run sync:claude -- --source /path/to/awesome-claude-code-subagents
```

Add `--apply` to import only new agents. Existing local agents are never overwritten or deleted; review reported differences before merging upstream changes manually.

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

- Submit new subagents via PR
- Improve existing definitions
- Report issues and bugs

## Contributor ♥️ Thanks

Thanks to everyone who has contributed subagents — originally the [VoltAgent community](https://github.com/VoltAgent/awesome-claude-code-subagents), and now ZCode users improving the definitions further.


## 📄 License

MIT License - see [LICENSE](LICENSE)

This repository is a curated collection of subagent definitions contributed by both the maintainers and the community. All subagents are provided "as is" without warranty. We do not audit or guarantee the security or correctness of any subagent. Review before use, the maintainers accept no liability for any issues arising from their use.

If you find an issue with a listed subagent or want your contribution removed, please [open an issue](https://github.com/a2mus/awesome-zcode-subagents/issues) and we'll address it promptly.


