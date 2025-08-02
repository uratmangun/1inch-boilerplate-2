# 1inch-boilerplate

A comprehensive React + TypeScript boilerplate for building DeFi applications with 1inch protocol integration. This template provides a modern development stack with Cloudflare deployment, Deno serverless functions, and pre-built components for token balance checking and DeFi interactions.

## Features

- 🚀 **1inch Protocol Integration** - Pre-built components for DEX aggregation
- 🔐 **Privy Authentication** - Secure wallet connection and user management
- ⚡ **Cloudflare + Deno** - Serverless functions with edge deployment
- 🎨 **Modern UI Stack** - React 19, TypeScript, Tailwind CSS, shadcn/ui
- 🌙 **Dark Mode Support** - Built-in theme switching
- 📱 **Responsive Design** - Mobile-first approach
- 🔧 **Developer Experience** - ESLint, Prettier, Husky pre-commit hooks
- 🧪 **API Explorer** - Interactive interface for testing 1inch APIs

## Tech Stack

### Frontend

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend

- **Deno** - Modern JavaScript runtime
- **Cloudflare Workers** - Edge computing platform
- **1inch API** - DEX aggregation and DeFi data

### Authentication & Web3

- **Privy** - Web3 authentication and wallet management
- **Stagewise** - Development tooling and debugging

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting
- **pnpm** - Fast package manager

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or yarn
- Deno 1.40+

### Installation

1. **Create from template:**

   ```bash
   # Public repository
   gh repo create my-1inch-project --template uratmangun/1inch-boilerplate-2 --public --clone

   # Private repository
   gh repo create my-1inch-project --template uratmangun/1inch-boilerplate-2 --private --clone
   ```

2. **Install dependencies:**

   ```bash
   cd my-1inch-project
   pnpm install
   ```

3. **Environment setup:**

   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start development:**
   ```bash
   pnpm dev
   ```

This runs both the Vite dev server (frontend) and Deno server (backend functions) concurrently.

## Project Structure

```
├── src/                    # React frontend source
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── HomePage.tsx   # Landing page
│   │   ├── BalancePage.tsx # Token balance checker
│   │   └── ApiExplorerPage.tsx # API testing interface
│   ├── contexts/          # React contexts (Theme, Privy)
│   └── lib/               # Utilities and constants
├── functions/             # Deno serverless functions
│   ├── balance.ts         # 1inch Balance API integration
│   ├── portfolio.ts       # Portfolio data fetching
│   ├── history.ts         # Transaction history
│   └── spot-price.ts      # Token price data
├── guides/                # 1inch API documentation
├── .kiro/                 # Kiro AI development specs
│   ├── specs/             # Feature specifications
│   ├── hooks/             # Automation hooks
│   └── steering/          # Development guidelines
└── public/                # Static assets
```

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# 1inch API (optional - public endpoints available)
ONEINCH_API_KEY=your_api_key_here

# Privy Authentication
VITE_PRIVY_APP_ID=your_privy_app_id

# Cloudflare (for deployment)
CLOUDFLARE_API_TOKEN=your_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

### 1inch API Setup

The boilerplate works with public 1inch endpoints, but for production use:

1. Get API key from [1inch Developer Portal](https://portal.1inch.dev/)
2. Add to `.env` file
3. Supports all 1inch APIs: Balance, Portfolio, History, Spot Price, Swap

## Available Scripts

```bash
# Development
pnpm dev          # Start both frontend and backend
pnpm dev:vite     # Frontend only
pnpm dev:deno     # Backend only

# Building
pnpm build        # Build for production
pnpm preview      # Preview production build

# Code Quality
pnpm lint         # Run ESLint
pnpm prepare      # Setup Husky hooks
```

## API Endpoints

The Deno backend provides these endpoints:

- `GET /api/balance?address=0x...` - Token balances (Base chain)
- `GET /api/portfolio?address=0x...` - Portfolio overview
- `GET /api/history?address=0x...` - Transaction history
- `GET /api/spot-price?tokens=...` - Current token prices

## Deployment

### Cloudflare Pages + Workers

1. **Connect repository** to Cloudflare Pages
2. **Build settings:**
   - Build command: `pnpm build`
   - Output directory: `dist`
3. **Deploy functions** to Cloudflare Workers
4. **Set environment variables** in Cloudflare dashboard

### Alternative Deployments

- **Vercel** - Frontend deployment with serverless functions
- **Netlify** - Static site with edge functions
- **Railway** - Full-stack deployment

## Development Methodology

This project uses **Kiro AI-driven development** with:

- **Specifications** - Structured feature planning in `.kiro/specs/`
- **Hooks** - Automated workflows for documentation and deployment
- **Steering Rules** - Development guidelines and best practices

Key specifications implemented:

- Landing page with 1inch branding
- Balance checker with real-time data
- API explorer for testing endpoints
- Cloudflare deployment integration

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use pnpm for package management
- Run `pnpm lint` before committing
- Write meaningful commit messages
- Update documentation for new features

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📖 [1inch API Documentation](https://docs.1inch.io/)
- 🐛 [Report Issues](https://github.com/uratmangun/1inch-boilerplate-2/issues)
- 💬 [Discussions](https://github.com/uratmangun/1inch-boilerplate-2/discussions)

---

Built with ❤️ using Kiro AI-driven development
