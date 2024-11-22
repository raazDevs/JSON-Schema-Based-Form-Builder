# JSON Schema Form Generator

![Zigment AI1](https://github.com/user-attachments/assets/a1198b0e-ff7b-45d1-9528-7a83cc041ee8)


## Overview

The JSON Schema Form Generator is a powerful, dynamic web application that allows users to create complex forms on-the-fly using JSON schemas. Built with modern web technologies, this tool offers real-time form generation and validation, making it an ideal solution for developers, designers, and businesses looking to streamline their form creation process.


![Zigment AI](https://github.com/user-attachments/assets/05603810-1298-46ed-ab02-91e704391847)


🌐 **[Live Demo](https://json-schema-based-form-builder-7fcz.vercel.app)**


## 🚀 Key Features

- 🔄 **Dynamic Form Generation**: Instantly create and preview forms from JSON schemas in real-time
- ✅ **Robust Validation**: Built-in form validation using Zod ensures data integrity
- 🌓 **Dark/Light Mode**: Toggle between themes to suit your preference and reduce eye strain
- 📱 **Responsive Design**: Fully functional layout on both desktop and mobile devices
- 🖋 **Advanced JSON Editing**: Integrated Monaco Editor for a superior JSON authoring experience
- 💾 **Form Submission Handling**: Easily capture, manage, and download form submissions
- ♿ **Accessibility-Focused**: Designed following WCAG guidelines for inclusive user experience
- 🔧 **Customizable UI**: Flexible styling options to match your brand or project needs
- 🚀 **Performance Optimized**: Fast loading and rendering for smooth user interactions
- 🔒 **Secure by Design**: Implements best practices for form security and data protection


## Technology Stack

- **Frontend:** Next.js 13 (App Router), React.js(18+)
- **Language**: TypeScript
- **UI Components**: shadcn/ui (based on Radix UI)
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **JSON Editing**: Monaco Editor
- **Unit Testing**: Jest
- **E2E Testing**: Playwright

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/json-schema-form-generator.git
   \`\`\`

2. Navigate to the project directory:
   \`\`\`bash
   cd json-schema-form-generator
   \`\`\`

3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open your browser and visit \`http://localhost:3000\`

## Usage Guide

1. **JSON Schema Input**: 
   - Use the left panel to input your JSON schema
   - The schema should follow the structure outlined in the "Schema Structure" section below

2. **Form Preview**: 
   - The right panel displays a real-time preview of your generated form
   - As you type or modify the JSON schema, the form updates automatically

3. **Form Submission**: 
   - Fill out the generated form and click "Submit" to test the form's functionality
   - Successful submissions will be logged and can be downloaded

4. **Copy JSON / Download Submissions**: 
   - Use the "Copy Form JSON" button to copy your schema to the clipboard
   - Click "Download Submissions" to get a JSON file of all form submissions

### Schema Structure

Your JSON schema should follow this structure:

```JSON
{
  "formTitle": "String",
  "formDescription": "String",
  "fields": [
    {
      "id": "String",
      "type": "text | email | select | radio | textarea",
      "label": "String",
      "required": boolean,
      "placeholder": "String (optional)",
      "validation": {
        "pattern": "String (optional)",
        "message": "String (optional)"
      },
      "options": [
        { "value": "String", "label": "String" }
      ] (required for select and radio types)
    }
  ]
}
```

## Development

### Running Tests

- Run unit tests: \`npm run test:unit\`
- Run E2E tests: \`npm run test:e2e\`

### Building for Production

To create a production build, run:

\`\`\`bash
npm run build
\`\`\`

Then, you can start the production server with:

\`\`\`bash
npm start
\`\`\`

## Contributing

We welcome contributions to the JSON Schema Form Generator! Please follow these steps:

1. Fork the repository
2. Create a new branch: \`git checkout -b feature/your-feature-name\`
3. Make your changes and commit them: \`git commit -m 'Add some feature'\`
4. Push to the branch: \`git push origin feature/your-feature-name\`
5. Submit a pull request

Please ensure your code adheres to our coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub issue tracker.

## Acknowledgements

- [Vercel](https://vercel.com) for their excellent Next.js framework and deployment platform
- [shadcn](https://ui.shadcn.com/) for the beautiful and accessible UI components
- All the open-source libraries that made this project possible

---

Built with ❤️ by Rajdeep Nath

