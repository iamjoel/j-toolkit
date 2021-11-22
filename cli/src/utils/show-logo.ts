import figlet from 'figlet'
import chalk from 'chalk'

export default (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    figlet('Joel\'s Toolkit', function(err: any, data: string) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          reject()
          return;
      }
      console.log(chalk.green(data))
      resolve(true)
    })
  })
}