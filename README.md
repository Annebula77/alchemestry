# AlchemArl Token Interface

A modern interface for displaying token information with detailed view capabilities.

## Features

- Display a list of tokens with key information
- Detailed token information view
- Token sorting by various parameters
- Search tokens by symbol or contract address
- 24-hour price change display
- Contract address copy to clipboard
- Responsive design for all devices

## Technologies

- React
- Redux for state management
- Material-UI components
- CSS for styling
- Web3 integration

## Getting Started

1. Clone the repository:

```bash
git clone [your repository URL]
```

2. Install dependencies:

```bash
npm install --legacy-peer-deps
# or
npm install -f
```

3. Start the development server:

```bash
npm start
```

The app will run in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
src/
  ├── components/         # React components
  │   ├── common/        # Shared components
  │   └── style.css      # Styles
  ├── redux/             # Redux files
  │   ├── actions/       # Action creators
  │   ├── reducers/      # Reducers
  │   └── sagas/         # Sagas
  ├── utils/             # Utility functions
  └── assets/            # Static files
```

## Usage

1. View the token list with essential information
2. Click on a token to view detailed information
3. Use the search function to filter tokens
4. Sort by table columns
5. Copy contract addresses with a single click

## Build

To build the app for production:

```bash
npm run build
```

This will create a `build` folder with the production-ready application, optimized for best performance.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
