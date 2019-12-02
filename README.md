# package-sample
## npm package
A sample project that adds 2 sample package to the repo

- Need an .npmrc file with
```
//npm.pkg.github.com/:_authToken=<token>
@<name>:registry=https://npm.pkg.github.com
```
- Run in each folder
```
npm publish
```

## docker package
- Build the image locally
- Run
```
docker login docker.pkg.github.com --username nicolas-francis
docker tag IMAGE_ID docker.pkg.github.com/nicolas-francis/package-sample/IMAGE_NAME:VERSION
docker push docker.pkg.github.com/nicolas-francis/package-sample/IMAGE_NAME:VERSION
```
