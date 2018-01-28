import * as sass from 'node-sass'

export default class ScssCompiler {
  public render(file) {
    return new Promise((resolve, reject) => {
      sass.render(
        {
          file,
          outputStyle: 'compressed'
        },
        (error, result) => {
          if (error) return reject(error)

          if (result.css) return resolve(result)

          reject(result)
        }
      )
    })
  }
}
