# Fictionlab documentation

Welcome to the Fictionlab documentation repository. This documentation is built
using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

## Links

- [Production link](http://docs.fictionlab.pl)
- [development (local) link](http://localhost:3000)

## Getting Started

### Prerequisites

Ensure the following tools are installed on your local machine:

- Code editor ([Visual Studio Code](https://code.visualstudio.com/) is
  recommended)
- [Node.js](https://nodejs.org/en/)
- [Yarn 1.22.22 (Classic)](https://classic.yarnpkg.com/en/)
- [Git](https://git-scm.com/)
- A web browser

#### Recommended VS Code extensions

<!-- prettier-ignore -->
> [!TIP]
> When opening this project in VS Code, you should be prompted to install the recommended extensions. If not, you can install them from the list below.

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Cloning repository

To clone the repository, execute the following command in your terminal:

```sh
git clone https://github.com/fictionlab/docs
```

Alternatively, use the VS Code command palette:

```
> git clone
```

and paste the repository URL.

By default, `development` branch is selected. To create new branch see
[Updating the Documentation](#updating-the-documentation).

### Launching development environment

After cloning the repository, open the folder in VS Code and run:

```
yarn install
```

To start the development environment, use:

```
yarn start
```

A new browser tab will open at http://localhost:3000, reflecting any changes
made to the files.

### Updating docusaurus

To update Docusaurus correctly, execute the following command:

```
yarn upgrade @docusaurus -L
```

Next, remove the `yarn.lock` file along with the `node_modules` and `build` directories. After deletion, regenerate the necessary files with updated dependency versions by running:

```
yarn install
```


## Editing the documentation

### Creating documents

To create an entirely new page, create a new `.mdx` file in the desired folder
within the repository. Docusaurus maps the file structure relative to the
`/docs` folder into web URLs.

For example: `/docs/leo-rover/specification.mdx` is translated to
`https://docs.fictionlab.pl/leo-rover/specification`.

<!-- prettier-ignore -->
> [!TIP]
> To avoid including the document name in the URL (e.g., creating a `leo-rover` page), name the document the same as the parent folder.
> Alternatively, you can name it `index.mdx`. For more information see: [Doc URLs - Docusaurus.io](https://docusaurus.io/docs/create-doc#doc-urls).

### Editing documents

To update the documentation, clone this repository and create a new branch from
`development` (or any other branch). For example, to create a branch named
`feature/new-button` from `development`:

```
git checkout -b feature/new-button development
```

Make necessary modifications and test everything using the development
environment. For guidelines on styling and formatting, refer to our
Documentation style guide -
[Documentation guidelines](https://docs.fictionlab.pl/guidelines).

<!-- prettier-ignore -->
> [!TIP]
> For more information on Docusaurus, visit [docusaurus.io](https://docusaurus.io/docs).

### Testing implemented changes

After making changes, test the compiled code in the browser.

<!-- prettier-ignore -->
> [!IMPORTANT]
> Always test your edits on both desktop and mobile browsers.
>
> Use developer tools to simulate mobile views (press F12 and select Toggle device emulation in Chrome-based browsers).

Finally, check the spelling and formatting:

```
yarn formatcheck
```

This will list files requiring formatting changes, which you can fix manually.
To fix formatting automatically, use:

```
yarn format
```

<!-- prettier-ignore -->
> [!CAUTION]
> Prettier has limited support for MDXv3. Automatic formatting can sometimes create unexpected results.
>
> For more details, see [docusaurus.io - usage with prettier](https://docusaurus.io/docs/markdown-features/admonitions#usage-with-prettier)

If using
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
extension, you can also use Prettier to only format current document. To do
this, in VS Code use **Shift+Alt+F** shortcut or type `> Format document` into
search bar.

To check spelling, run:

```
yarn spellcheck
```

This will list unrecognized words in markdown files, which you must correct
manually.

<!-- prettier-ignore -->
> [!TIP]
> If you use the [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
> extension in VS Code, documents will be spell-checked in real-time. Any unrecognized words will be displayed in the PROBLEMS tab of VS Code.

Sometimes, CSpell will mistakenly mark correct words as unknown, including
custom names like ROS topics and variables. To remove this error, add the word
to the CSpell configuration. Right-click the word and select **Spelling** >
**Add words to the CSpell configuration**. This can be done either in the editor
or in the **PROBLEMS** tab of VS Code.

In the editor, you can use the VS Code shortcut **Ctrl+.** to bring up the
**Quick Fix** menu, which provides the same options as mentioned above.

### Pushing Changes to the Remote Repository

When ready, push your changes using:

```
git push
```

<!-- prettier-ignore -->
> [!TIP]
> For more information on using Git, see [Atlassian Git Tutorial](https://www.atlassian.com/git).

After pushing changes, create a Pull Request to merge them into the
`development` branch. Your code will be reviewed by the Fictionlab team. Default
reviewers are:

- [@Krzemien97](https://github.com/Krzemien97)
- [@bjsowa](https://github.com/bjsowa)

<!-- prettier-ignore -->
> [!WARNING]
> Pull requests to the `production` branch from any branch other than `development` will not be merged.

### Branch Naming Conventions

Follow these naming conventions for branches:

- `/feature/description` - for new features, components etc.
- `/content/description` - for markdown content updates
- `/fix/description` - for fixes
- `/chore/description` - for dependency updates

## Reporting Issues

To report documentation issues, create an
[issue](https://github.com/fictionlab/docs/issues) on this repository or email
us at contact@fictionlab.pl.
