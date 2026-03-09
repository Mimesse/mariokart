const player1 = {
    NOME : "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};
const player2 = {
    NOME : "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result 

    switch (true) {
        case random < 0.33:
            result =  "RETA"
            break;
        case random < 0.66:
            result =  "CURVA"
            break;
        default:
            result =  "CONFRONTO"
            break;
    }

    return result;
}
async function logRollResult(charcterName, block, diceResult, attribute) {
     console.log(`${charcterName} 🎲 rolou um dado de ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playerRaceEngine(charcter1, charcter2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`\n 🏁 Rodada ${round} 🏁`);

            // sortear bloco
            let block = await getRandomBlock();
            console.log(`Bloco sorteado: ${block}`);

            // rolar os dados
          let diceResult1 = await rollDice();
          let diceResult2 = await rollDice();

          // teste de habilidade
          let TotalTestSkill1 = 0;
          let TotalTestSkill2 = 0;

          if (block === "RETA") {
            TotalTestSkill1 = diceResult1 + charcter1.VELOCIDADE;
            TotalTestSkill2 = diceResult2 + charcter2.VELOCIDADE;

            await logRollResult(
                charcter1.NOME, 
                block, 
                diceResult1, 
                " VELOCIDADE ", 
                charcter1.VELOCIDADE);  

             await logRollResult(
                charcter2.NOME, 
                block, 
                diceResult2, 
                " VELOCIDADE ", 
                charcter2.VELOCIDADE);  
            
          }

          if (block === "CURVA") {
             TotalTestSkill1 = diceResult1 + charcter1.MANOBRABILIDADE;
            TotalTestSkill2 = diceResult2 + charcter2.MANOBRABILIDADE;

              await logRollResult(
                charcter1.NOME, 
                block, 
                diceResult1, 
                " MANOBRABILIDADE", 
                charcter1.MANOBRABILIDADE);

             await logRollResult(
                charcter2.NOME, 
                block, 
                diceResult2, 
                " MANOBRABILIDADE ", 
                charcter2.MANOBRABILIDADE);
              
          }

          if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + charcter1.PODER;
            let powerResult2 = diceResult2 + charcter2.PODER;

            console.log(`${charcter1.NOME} confrontou ${charcter2.NOME} + ${charcter1.PODER} 🥊`)

                await logRollResult(
                charcter1.NOME, 
                block, 
                diceResult1, 
                " poder ", 
                charcter1.PODER);  

                await logRollResult(
                charcter2.NOME, 
                block, 
                diceResult2, 
                " poder ", 
                charcter2.PODER); 

                if (powerResult1 > powerResult2) {
                    if (charcter2.PONTOS > 0) {
                        console.log(`${charcter1.NOME} venceu o confronto! ${charcter2.NOME} perdeu 1 ponto 🐢.`);
                        charcter2.PONTOS --;
                    }
                }

                if (powerResult2 > powerResult1) {
                    if (charcter1.PONTOS > 0) {
                        console.log(`${charcter2.NOME} venceu o confronto! ${charcter1.NOME} perdeu 1 ponto 🐢.`);
                        charcter1.PONTOS --;
                    }
                }

                if (powerResult2 === powerResult1) {
                    console.log("Empate no confronto! Ninguém perde pontos.")
            }

        }

          if (TotalTestSkill1 > TotalTestSkill2) {
            console.log(`🏎️  ${charcter1.NOME} venceu a rodada! 🏎️`);
            charcter1.PONTOS ++;
          } else if (TotalTestSkill2 > TotalTestSkill1) {
            console.log(`🏎️  ${charcter2.NOME} venceu a rodada! 🏎️`);
            charcter2.PONTOS ++;
          }
    }
        console.log(`\n 🏁 Resultado Final 🏁`);
}

async function declareWinner(charcter1, charcter2) {
    console.log("Resultado Final:");
    console.log(`${charcter1.NOME}: ${charcter1.PONTOS} pontos`);
    console.log(`${charcter2.NOME}: ${charcter2.PONTOS} pontos`);

    if(charcter1.PONTOS > charcter2.PONTOS) 
        console.log(`\n 🏆 ${charcter1.NOME} é o vencedor! 🏆`);
     else if (charcter2.PONTOS > charcter1.PONTOS) 
        console.log(`\n 🏆 ${charcter2.NOME} é o vencedor! 🏆`);
     else 
        console.log("\n 🤝 A corrida terminou em empate! 🤝");
    }

     (async function main() {
    console.log(
        "🏁🚨 Corrida entre " + player1.NOME + " e " + player2.NOME + " começou! 🚨🏁"
    );

    await playerRaceEngine(player1, player2);
    await declareWinner(player1, player2);
        })();
