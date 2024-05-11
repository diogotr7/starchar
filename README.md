# StarChar

StarChar is a character modification tool for the game Star Citizen. It allows for customization beyond the in-game options, such as illegal body colors and DNA import and export.

## Dev Mode

I'm working on some features that are either not ready or not safe to be used by the general public. To enable them, you can set the local storage key `isDev` to `true`. This will enable the DNA import/export feature.

## Technologies

- React
- Vite
- Mantine UI

The webpage is statically build and hosted on GitHub Pages.

## Running Locally

```bash
yarn install

yarn dev
```

## Contributing

### Frontend

Pull requests are welcome. My React skills are not the best so feel free to suggest changes or improvements. I'm also open to feature requests as long as they do not require hosting a backend, I want to keep this free to run.

### Reverse Engineering

Any changes to the data structure of the character files should instead be discussed in [StarCitizenChf](https://github.com/diogotr7/StarCitizenChf) , so the source of truth is maintained there. If modifications can be verified to work on most character files and in-game, they can them be ported to this project.
