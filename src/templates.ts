import { readFileSync } from 'fs'
import { join } from 'path'
import * as ejs from 'ejs'


const loadTemplate = (templatePath: string) => {
    const templateString = readFileSync(join(__dirname, templatePath), 'utf-8')
    return ejs.compile(templateString)
  }
  
  export const welcomeTemplate = loadTemplate('templates/welcome.ejs')