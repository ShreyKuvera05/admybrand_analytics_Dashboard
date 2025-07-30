# 🚀 Modern Analytics Dashboard

A comprehensive, interactive analytics dashboard built with **Next.js 14**, **React**, **TypeScript**, and **Tailwind CSS**. Features real-time data visualization, interactive charts, global mapping, and a beautiful dark/light theme system.



## ✨ Features

### 📊 **Analytics & Visualization**
- **Interactive Charts** - Line, bar, pie, area, and bubble charts with hover effects
- **Real-time Data** - Live updates with animated transitions
- **Advanced Filtering** - Date range filters and export functionality
- **Data Tables** - Sortable, filterable tables with pagination
- **KPI Cards** - Beautiful metric cards with trend indicators

### 🌍 **Global Mapping**
- **Interactive World Map** - Custom SVG-based world map with hover effects
- **Data Visualization** - Color-coded regions based on analytics data
- **Responsive Design** - Works perfectly on all screen sizes
- **Tooltip Information** - Detailed country/region data on hover

### 📈 **Report Generation**
- **Dynamic Reports** - Generate PDF, CSV, and JSON reports
- **Automatic Downloads** - One-click report generation and download
- **Report History** - Track and manage generated reports
- **Custom Data** - Realistic mock data for demonstrations

### 🎨 **Modern UI/UX**
- **Dark/Light Themes** - Beautiful theme switching with smooth transitions
- **Responsive Design** - Mobile-first approach with perfect mobile experience
- **Loading Skeletons** - Beautiful shimmer loading states
- **Smooth Animations** - Micro-interactions and hover effects
- **Professional Typography** - Clean, readable font hierarchy

### 🔔 **Notification System**
- **Real-time Notifications** - Interactive notification dropdown
- **Smart Categorization** - Different notification types with color coding
- **Mark as Read** - Individual and bulk notification management
- **Beautiful UI** - High z-index overlay with backdrop blur

### 📱 **Navigation & Layout**
- **Collapsible Sidebar** - Mobile-responsive navigation
- **Breadcrumb Navigation** - Clear page hierarchy
- **Search Functionality** - Global search across dashboard
- **Keyboard Shortcuts** - Efficient navigation controls

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **React 18** - Latest React with hooks and concurrent features
- **TypeScript** - Full type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### **UI Components**
- **shadcn/ui** - Modern, accessible component library
- **Lucide React** - Beautiful icon library
- **Recharts** - Powerful charting library
- **React Hook Form** - Form handling and validation

### **Development Tools**
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0 or later
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/analytics-dashboard.git
cd analytics-dashboard
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the dashboard.

## 📁 Project Structure

```
analytics-dashboard/
├── app/                    # Next.js App Router pages
│   ├── analytics/         # Analytics page with filters
│   ├── audience/          # Audience analytics
│   ├── campaigns/         # Campaign management
│   ├── global/            # Global map view
│   ├── overview/          # Dashboard overview
│   ├── performance/       # Performance metrics
│   ├── realtime/          # Real-time analytics
│   ├── reports/           # Report generation
│   └── settings/          # User settings
├── components/            # Reusable React components
│   ├── charts/           # Chart components
│   ├── dashboard/        # Dashboard-specific components
│   ├── maps/             # Map components
│   ├── notifications/    # Notification system
│   ├── reports/          # Report components
│   ├── skeletons/        # Loading skeletons
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🎯 Key Pages

### **📊 Overview Dashboard**
- Key performance indicators
- Interactive charts and graphs
- Recent activity feed
- Quick action buttons

### **📈 Analytics**
- Advanced data visualization
- Date range filtering
- Export functionality (PDF, CSV, JSON)
- Comparative analysis tools

### **🌍 Global View**
- Interactive world map
- Regional performance data
- Geographic data visualization
- Country-specific metrics

### **📋 Reports**
- Dynamic report generation
- Multiple export formats
- Report history and management
- Scheduled reporting (planned)

### **🎯 Campaign Management**
- Campaign creation and editing
- Performance tracking
- A/B testing tools (planned)
- ROI analysis

## 🎨 Customization

### **Themes**
The dashboard supports both dark and light themes with smooth transitions:

```tsx
// Theme switching is handled automatically
// Users can toggle between themes using the header button
```

### **Colors**
Customize the color scheme in `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
      }
    }
  }
}
```

### **Components**
All components are modular and can be easily customized or extended.

## 📊 Data Integration

The dashboard currently uses mock data for demonstration. To integrate with real data:

1. **Replace mock data** in component files
2. **Add API endpoints** in `app/api/` directory
3. **Implement data fetching** using React hooks or SWR
4. **Update TypeScript types** for your data structure

## 🔧 Development

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### **Code Quality**
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for git hooks (optional)

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with every push

### **Other Platforms**
The dashboard can be deployed to any platform that supports Next.js:
- **Netlify**
- **AWS Amplify**
- **Railway**
- **DigitalOcean App Platform**

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **Next.js** team for the amazing React framework
- **Vercel** for hosting and deployment platform
- **Lucide** for the icon library

## 📞 Support

If you have any questions or need help with the dashboard:

- **Create an issue** on GitHub
- **Email**: shrey.kuvera@gmail.com


---

**Built with ❤️ using Next.js, React, and TypeScript**

⭐ **Star this repository if you found it helpful!**
