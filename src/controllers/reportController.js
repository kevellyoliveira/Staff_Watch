const { exec } = require('child_process');
const path = require('path');

exports.generateReport = (req, res) => {
    const rmdFilePath = path.join(__dirname, '../../documentos/RelatorioRedeStaffWatch.Rmd').replace(/\\/g, '/'); // Ajuste o caminho conforme sua estrutura
    const outputFilePath = path.join(__dirname, '../../documentos/RelatorioRedeStaffWatch.html').replace(/\\/g, '/'); // HTML será salvo na pasta public


    

    // const command = `Rscript -e "rmarkdown::render('${rmdFilePath}', output_file='${outputFilePath}')"`;
    
    const command = `"C:/Program Files/R/R-4.4.1/bin/Rscript" -e "Sys.setenv(RSTUDIO_PANDOC = 'C:/Program Files/RStudio/resources/app/bin/quarto/bin/tools'); rmarkdown::render('${rmdFilePath}', output_file='${outputFilePath}')"`;

// Resto do código permanece igual.




    exec(command, (error, stdout, stderr) => {
        

        if (error) {
            
            console.error(`Erro ao gerar relatório: ${error.message}`);
            return res.status(500).send('Erro ao gerar relatório');
        }
        if (stderr) {
            console.error(`Erro: ${stderr}`);
        }
        console.log(`Relatório gerado com sucesso: ${stdout}`);

        // Enviar o arquivo gerado para o usuário
        res.sendFile(outputFilePath);
    });
};
