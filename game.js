import chalk from 'chalk';
import readlineSync from 'readline-sync';
import figlet from 'figlet';
import { gameover } from './server.js';
import { handleUserInput2 } from './server.js';

// 플레이어 세팅 //
class Player {
  constructor(player) {
    this.hp = 100;
    this.minPower = 10;
    this.maxPower = 15;
  }

  normal_ATK(monster) {
    let damage = Math.floor(Math.random() * (this.maxPower - this.minPower + 1)) + this.minPower;
    monster.hp -= damage;
    return damage;
  }

  counter_ATK(monster) {
    let damage = Math.floor(Math.random() * (this.maxPower - this.minPower + 1)) + this.minPower;
    monster.hp -= damage * 5;
    return damage * 5;
  }

  ultimate_ATK(monster) {
    let damage = 999;
    monster.hp -= damage;
    return damage;
  }

  expUp_min(player) {
    let battleData_min = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
    player.minPower += battleData_min;
    return (player.minPower += battleData_min);
  }

  expUp_max(player) {
    let battleData_max = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    player.maxPower += battleData_max;
    return (player.maxPower += battleData_max);
  }

  repair(player) {
    let heal = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
    player.hp += heal;
    return heal;
  }
}

// 몬스터 세팅 //
class Monster {
  constructor() {
    this.hp = 70;
    this.minPower = 3;
    this.maxPower = 6;
  }

  attack(player) {
    let damage = Math.floor(Math.random() * (this.maxPower - this.minPower + 1)) + this.minPower;
    player.hp -= damage;
    return damage;
  }

  expUp_min(monster) {
    let battleData_min = 3;
    monster.minPower += battleData_min;
    return (monster.minPower += battleData_min);
  }

  expUp_max(monster) {
    let battleData_max = 6;
    monster.maxPower += battleData_max;
    return (monster.maxPower += battleData_max);
  }

  hpUp(monster) {
    let heal = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    monster.hp += heal;
    return heal;
  }
}

function rand_0_100() {
  return Math.floor(Math.random() * 101);
}

function diceroll(minPower, maxPower) {
  return Math.floor(Math.randome() * (maxPower * minPower + 1));
}

// 게임 스테이터스 세팅 //
function displayStatus(stage, player, monster) {
  console.log(
    chalk.magentaBright(
      `\n================================ Current Status =================================`,
    ),
  );
  console.log(
    chalk.cyanBright(`[ 제 ${stage} 구역 ] `) +
      chalk.blueBright(
        `| EVE HP: ${player.hp}, Attack: ${player.minPower} ~ ${player.maxPower} | `,
      ) +
      chalk.redBright(
        `| 오염체 HP: ${monster.hp}, Attack: ${monster.minPower} ~ ${monster.maxPower} |`,
      ),
  );
  console.log(
    chalk.magentaBright(
      `=================================================================================\n`,
    ),
  );
}

// 전투 로그 //
const battle = async (stage, player, monster) => {
  let logs = [];

  while (player.hp > 0 && monster.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);
    console.log(chalk.magentaBright(`제 ${stage} 구역의 오염체를 발견했다!`));
    console.log(chalk.magentaBright(` `));

    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(
        `\n1. 물리 공격(85%) 2. 전류 방출(30%) 3. 제 ${stage} 구역 방어 시스템 복구(10%)`,
      ),
    );

    const choice = readlineSync.question('당신의 선택은? ');

    // 플레이어의 선택에 따라 다음 행동 처리

    switch (choice) {
      case '1':
        if (rand_0_100(1) > 15) {
          const normal = player.normal_ATK(monster);
          logs.push(chalk.blueBright('[ EVE의 물리 공격! ]'));
          logs.push(chalk.blueBright(`▶ 성공: 오염체에게 ${normal} 의 대미지를 입혔다.`));
          const damageToPlayer_0 = monster.attack(player);
          logs.push(chalk.red('[ 오염체의 공격! ]'));
          logs.push(chalk.red(`[ 오염체에게 ${damageToPlayer_0} 의 대미지를 받았다.]`));
          logs.push(chalk.magentaBright(` `));
          break;
        } else {
          logs.push(chalk.blueBright('[ EVE의 물리 공격! ]'));
          logs.push(chalk.blueBright(`▶ 실패: 오염체에게 0 의 대미지를 입혔다.`));
          const damageToPlayer_1 = monster.attack(player);
          logs.push(chalk.red('[ 오염체의 공격! ]'));
          logs.push(chalk.red(`[ 오염체에게 ${damageToPlayer_1} 의 대미지를 받았다.]`));
          logs.push(chalk.magentaBright(` `));
          break;
        }
      case '2':
        if (rand_0_100(1) > 70) {
          const counter = player.counter_ATK(monster);
          logs.push(chalk.blueBright('[ EVE의 전류 방출! ]'));
          logs.push(chalk.blueBright(`▶ 성공: 오염체가 감전되어 일시적 행동 불가 상태가 되었다!`));
          logs.push(chalk.blueBright(`[ 오염체에게 ${counter} 의 대미지를 입혔다. ]`));
          logs.push(chalk.magentaBright(` `));
          break;
        } else {
          logs.push(chalk.blueBright('[ EVE의 전류 방출! ]'));
          logs.push(chalk.blueBright(`▶ 실패: 오염체에게 0 의 대미지를 입혔다.`));
          const damageToPlayer_2 = monster.attack(player);
          logs.push(chalk.red('[ 오염체의 공격! ]'));
          logs.push(chalk.red(`[ 오염체에게 ${damageToPlayer_2}의 대미지를 받았다.]`));
          logs.push(chalk.magentaBright(` `));
          break;
        }
      case '3':
        if (rand_0_100(1) > 90) {
          const ultimate = player.ultimate_ATK(monster);
          logs.push(chalk.blueBright('[ EVE의 방어 시스템 복구 시도! ]'));
          logs.push(chalk.yellow(`▶ 성공: 오염체에게 ${ultimate}의 대미지를 입혔다.`));
          break;
        } else {
          const damageToPlayer_3 = monster.attack(player);
          logs.push(chalk.blueBright('[ EVE의 방어 시스템 복구 시도! ]'));
          logs.push(chalk.blueBright(`▶ 실패: 오염체에게 0 의 대미지를 입혔다.`));
          logs.push(chalk.red('[ 오염체의 공격! ]'));
          logs.push(chalk.red(`[ 오염체에게 ${damageToPlayer_3}의 대미지를 받았다.]`));
          logs.push(chalk.magentaBright(` `));
          break;
        }
    }
  }

  if (player.hp <= 0) {
    gameover();
    handleUserInput2();
  } else if (monster.hp <= 0) {
    console.clear();
    function delay(ms = 1000) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async function delayTest() {}
    console.log(chalk.magentaBright(`===================================`));
    console.log(chalk.magentaBright.bold(`제 ${stage} 구역의 오염체를 섬멸했습니다.`));
    console.log(chalk.magentaBright(`===================================`));
    console.log(chalk.magentaBright(` `));

    await delay(2000);
    const expUp_1 = player.expUp_min(player);
    const expUp_2 = player.expUp_max(player);
    console.log(
      chalk.magentaBright(
        `[ 전투 데이터 분석 완료 ] 오염체에게 ${expUp_1} ~ ${expUp_2}의 대미지를 입힐 수 있게 되었습니다.`,
      ),
    );
    console.log(chalk.magentaBright(` `));
    await delay(2000);
    const healUp = player.repair(player);
    console.log(
      chalk.magentaBright(
        `[ 수리 완료 ] 제 ${stage} 구역의 시설 부품을 사용하여 ${healUp}의 내구도를 회복했습니다.`,
      ),
    );
    console.log(chalk.magentaBright(` `));
    console.log(chalk.hidden());
    await delay(2000);
    console.log(chalk.magentaBright.bold(`5초 뒤 다음 구역으로 이동합니다.`));
    await delay(5000);
    console.log();
  }
};

export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage);
    const monsterMinup = monster.expUp_min(monster);
    const monsterMaxup = monster.expUp_max(monster);
    const monsterHpup = monster.hpUp(monster);

    await battle(stage, player, monster);

    // 스테이지 클리어 및 게임 종료 조건

    stage++;
  }
}
