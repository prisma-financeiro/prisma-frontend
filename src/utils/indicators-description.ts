const indicators: { [key: string]: string; } = {
  "P/L": "<p>Indicador utilizado para relacionar os proventos pagos por uma companhia e o preço atual de suas ações. Dividendos pagos no período / Preço ação.</p>",
  "LPA": "<p>O índice LPA representa a parcela do lucro líquido pertencente a cada ação, sendo que sua distribuição aos acionistas é definida pela política de dividendos adotada pela companhia.</p><p></br><b>Fórmula : LPA = (Lucro Líquido / Número de Ações Emitidas)</b></p></br><p>Comparar os lucros de uma empresa com outra não ajuda a tomar decisão, se você parar para pensar. Usar números brutos ignorando o fato de que duas empresas têm um número de ações emitidas em circulação sem dúvida diferente pode ser um equívoco.</p></br><p>Usando a fórmula acima, a empresa A teve um lucro líquido de 100 e tem 10 ações emitidas, então temos um LPA de 10 ($ 100/10 = 10), enquanto a empresa B teve um lucro líquido de 100 e tem 50 ações emitidas, então temos um LPA de 2 ($ 100/50 = 2).</p></br><p>Então, você deve comprar a A com um LPA de 10, certo? Talvez, mas não use apenas o LPA. O LPA é útil na comparação entre uma empresa e outra, assumindo que elas estão na mesma indústria, mas não lhe diz se é uma boa ação para comprar ou o que o mercado pensa dela.</p>",
  "VPA": "<p>O Valor Patrimonial por Ação – ou apenas VPA – indica o valor do patrimônio líquido de uma empresa distribuído entre as ações comercializadas. O número permite a comparação entre o valor de mercado e o patrimonial, propriamente dito.</p></br><p>A análise do Valor Patrimonial por Ação permite ao investidor comparar o preço de mercado de uma ação com o valor real que ela tem dentro da estrutura contábil da empresa.</p></br><p>Vamos ver um exemplo para entender melhor? Considere que uma S/A disponibiliza títulos e que o valor para sua compra é de R$ 30. Porém, seu VPA está em R$ 15. Ou seja, o mercado está acenando que tem disposição para pagar 2 vezes mais o valor do VPA. Isso pode dar indícios sobre a boa qualidade do papel e, ao mesmo tempo, significar problemas de venda lá na frente.</p>",
  "ROE": "<p>Retorno sobre Patrimônio Líquido (return on equity - ROE) é calculado pela divisão do lucro líquido pelo patrimônio líquido de uma empresa. Ou seja, ele serve para medir o retorno total em lucro líquido gerado em relação ao patrimônio líquido (diferença entre ativo e passivo). Em outras palavras, o quanto ela é eficiente em ser rentável com os recursos que tem disponíveis.<p></br><p><b>Fórmula : ROE = (Lucro Líquido / Patrimônio Líquido)</b></p></br><p>Podemos dizer que ROE é um indicador que tem como objetivo analisar e medir a capacidade que uma empresa tem para gerar valor para o negócio e para investidores, a partir dos recursos que a própria empresa possui.</p>",
  "ROA": "<p>O Retorno sobre Ativos (Return on Assets - ROA) é um indicador que analisa o quanto uma empresa é rentável em relação aos seus ativos. O resultado apontará, portanto, se a companhia está fazendo um bom uso e maximizando o resultado com os recursos que tem.</p></br><p>São considerados ativos tudo no qual a empresa tem capital investido e dá lucro no presente ou pode dar lucro no futuro. São contratos, produtos em estoque e até imóveis.</p></br><p>O ROA permite verificar se uma empresa com menos recursos tem uma rentabilidade maior do que uma concorrente mais consolidada.</p></br><p><b>Fórmula : ROA = (Lucro Líquido /  Ativo Total ) * 100</b></p></br><p>Por exemplo, se uma empresa registrou um lucro líquido de R$ 500 mil e tem R$ 5 milhões em ativos, o cálculo é o seguinte:</p></br><p>(R$ 500.000 ÷ R$ 5.000.000) × 100 = 10% ROA</p></br><p>Um ROA de 10% significa que a cada R$ 1 investido em ativos, o percentual de retorno será de R$ 0,10.</p></br><p>Um ROA alto significa que a gestão está fazendo uma boa aplicação do capital da empresa. </p></br><p>Já um ROA baixo pode significar que a empresa está investindo em projetos pouco rentáveis.</p></br>",
  "ROIC": "<p>O Retorno sobre o capital investido (Return On Invested Capital- ROIC) resulta no percentual de retorno gerado pela empresa com o uso de seu capital investido. Para encontrar este valor o seu cálculo é feito dividindo o lucro operacional, sem impostos, pelo capital da empresa.</p></br><p>O retorno sobre o capital investido é uma medida usada para avaliar a eficiência de uma empresa em gerar retorno com o uso de seu capital.</p></br><p><b>Fórmula : ROIC = (Resultado Operacional Líquido de Impostos / Capital Investido)</b></p></br>",
  "Liq. Corrente": "<p>A liquidez corrente possui o propósito de mensurar a capacidade de pagamento de uma companhia. Desse modo, existem algumas interpretações da liquidez corrente que possibilitam a compreensão dos resultados, dentre essas interpretações, estão:</p></br><ul><li>- Maior que 1 – Caso a liquidez corrente apresente um resultado maior que 1, significa que a companhia possui uma capacidade de pagamento relativamente boa, ou seja, expõe que a empresa possui um líquido positivo;</li></br><li>- Menor que 1 – Entretanto, se o indicativo da liquidez corrente apresentar um resultado inferior a 1,  demonstra que a empresa como dependente de geração de caixa, dado que, o ativo circulante está inferior ao passivo circulante;</li></br><li>- Igual a 1 – Além disso, caso o indicativo da liquidez corrente apresente um resultado igual a 1, revela que o capital da empresa e seus pagamentos estão proporcionais.</li></ul></br><p><b>Fórmula : Liquidez corrente = Ativo circulante / Passivo circulante</b></p></br>",
  "Passivos/Ativos": "<p>Cálculo para saber a relação entre os ativos (circulantes e não circulantes) e os passivos de uma empresa.</p></br><p><b>Fórmula : Passivos/Ativos = (Passivos / Ativos)</b></p></br>",
  "PL/Ativos": "<p>O patrimônio de uma empresa é o resultado da subtração dos ativos com os passivos. Este indicador mostra a relação dos ativos no patrimônio da empresa.</p></br><p><b>Fórmula : PL/Ativos = Patrimônio Líquido/Ativos</b></p>",
  "Dívida Liq./EBIT": "<p>O Índice Dívida Líquida/EBIT serve para analisar o índice de endividamento de uma empresa. Indica quanto tempo seria necessário para pagar a dívida líquida da empresa considerando o EBIT atual. Indica também o grau de endividamento da empresa.</p></br><p><b>Fórmula: Dívida Líq. EBIT = (Dívida Líq / EBIT)</b></p>",
  "Dívida Liq./EBITDA": "<p>O Índice Dívida Líquida/EBITDA serve para analisar o índice de endividamento de uma empresa. Seu resultado demonstra o número de anos que uma empresa levaria para pagar sua dívida líquida no cenário em que o EBITDA permanece constante.</p></br><p>O resultado da Dívida Líquida/EBITDA é considerado alto quando está entre 4x e 5x, sendo um sinal negativo para o investidor e para a própria empresa. Isso significa que a empresa possui menos capacidade para cumprir com suas obrigações financeiras, o que pode gerar um aumento no endividamento e interrupção no crescimento do negócio.</p></br><p>Já um índice entre 1x a 2x, por sua vez, é considerado mais saudável financeiramente pelo mercado, indicando uma boa gestão financeira da empresa.</p></br><p><b>Fórmula : Dívida Líquida/EBITDA = (Dívida Líquida / EBITDA)</b></p>",
  "Dívida Liq./PL": "<p>A Dívida Líquida/Patrimônio Líquido é utilizada para avaliar o endividamento de uma empresa e é calculado através da divisão entre a soma de seu endividamento e o total de bens e direitos que ela possui. Com esse índice é possível avaliar a quantidade de capital de terceiros que uma empresa utiliza em relação ao seu patrimônio.</p></br><p>Quanto menor for o resultado da Dívida Líquida/Patrimônio Líquido, maior é o sinal de que a empresa é saudável financeiramente. Consequentemente, quanto maior o índice, mais alavancada a empresa está, representando um risco para quem decide investir em suas ações.</p></br><p><b>Fórmula : Dívida Líquida/PL = Dívida Líquida /Patrimônio Líquido</b></p>",
  "Margem Bruta": "<p>A margem bruta mede a rentabilidade de uma empresa, ou seja, qual a porcentagem de lucro que a empresa ganha com cada venda antes de deduzir despesas, impostos, pagamento de juros e folha de pagamento. Por esse motivo, quanto maior a margem bruta, melhor.</p></br><p><b>Fórmula: margem bruta = (Lucro bruto/receita total) x 100</b></p>",
  "Margem Líquida": "<p>A margem líquida é a porcentagem do lucro líquido obtido pela empresa em relação a receita total, ou seja, mostra o percentual para cada unidade de venda que restou após a dedução de todas as despesas, inclusive o imposto de renda. A margem líquida é mais detalhada que a margem bruta, pois mostra quanto do faturamento se transforma em lucro de fato para os gestores e acionistas.</p></br><p><b>Fórmula: margem líquida = (lucro líquido/ receita total) x 100</b></p>",
  "Margem EBIT": "<p>A margem EBIT (Earnings Before Interest and Taxes - Lucro Antes de Juros e Impostos) é a porcentagem do EBIT em relação à receita líquida. E é uma forma de avaliar o desempenho de uma companhia levando em consideração a sua receita líquida.</p></br><p>A margem EBIT parece ser bem parecida com a Margem Bruta. Porém, no caso da Margem Bruta, utilizamos a Receita Bruta para identificar qual é à margem do resultado antes da parte financeira e dos impostos.</p></br><p>De modo geral, quanto maior é esse número, mais eficiente a companhia se mostra. Contudo, não é aconselhável analisar o indicador isoladamente. O ideal é avaliar diversos elementos fundamentalistas.</p></br><p><b>Fórmula: Margem EBIT = (EBIT / Receita Líquida) x 100</b></p>",
  "Margem EBITDA": "<p>A margem EBITDA  (Earnings Before Interest, Taxes, Depreciation and Amortization - Lucro Antes de Juros, Impostos, Depreciação e Amortização) representa a aptidão da companhia em gerir recursos mediante as atividades operacionais.</p></br><p>Quanto maior o percentual, maior a lucratividade da empresa, pois demonstra que a empresa é capaz de operar com mais eficiência e lucratividade.</p></br><p>Com a margem EBITDA é possível comparar empresas de diferentes tamanhos do mesmo segmento, pois representa os ganhos da companhia, baseados apenas em atividades operacionais. Esse indicador expõe de forma relativa, a margem de lucro das empresas.</p></br><p>Uma margem EBITDA baixa pode indicar falta de eficiência na empresa.</p></br><p><b>Fórmula: Margem EBITDA = EBITDA/ receita líquida X 100</b></p></br><p>Imagine, por exemplo, que uma empresa tem um EBITDA de R$1 bilhão no ano. Esse número, sozinho, pode parecer muito bom. Porém, se a receita anual foi de R$15 bilhões, o cálculo da margem EBITDA (EBITDA dividido pela receita) vai apontar um resultado de apenas 6%.</p></br>",
}

export default indicators;