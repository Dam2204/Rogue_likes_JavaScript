import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { startGame } from './game.js';

// 로비 화면을 출력하는 함수
function displayLobby() {
  console.clear();

  // 타이틀 텍스트
  console.log(
    chalk.magenta(
      figlet.textSync('Planet E-83', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }),
    ),
  );

  // 상단 경계선
  const line = chalk.magentaBright('='.repeat(55));
  console.log(line);

  // 게임 이름
  console.log(chalk.red.bold('행성 E-83의 WN-2sT 광산이 오염되었습니다.'));

  // 설명 텍스트
  console.log(chalk.gray('정화 작업을 시작하시겠습니까?'));
  console.log();

  // 옵션들
  console.log(chalk.blue('1.') + chalk.white(' 전투 로봇 EVE 연결하기'));
  console.log(chalk.blue('2.') + chalk.white(' 오염도 확인하기'));
  console.log(chalk.blue('3.') + chalk.white(' 옵션'));
  console.log(chalk.blue('4.') + chalk.white(' 폐쇄하기'));

  // 하단 경계선
  console.log(line);

  // 하단 설명
  console.log(chalk.gray('1-4 사이의 수를 입력한 뒤 엔터를 누르세요.'));
}

// 유저 입력을 받아 처리하는 함수
function handleUserInput() {
  const choice = readlineSync.question('입력: ');

  switch (choice) {
    case '1':
      console.log(chalk.green('정화 작업을 시작합니다.'));
      // 여기에서 새로운 게임 시작 로직을 구현
      startGame();
      break;
    case '2':
      console.log(chalk.yellow('96.58% ... 정화 작업이 필요합니다.'));
      // 업적 확인하기 로직을 구현
      handleUserInput();
      break;
    case '3':
      console.log(chalk.blue('구현 준비중입니다.. 정화 작업을 시작하세요.'));
      // 옵션 메뉴 로직을 구현
      handleUserInput();
      break;
    case '4':
      console.log(chalk.red.bold('WN-2sT 광산을 포기합니다.'));
      // 게임 종료 로직을 구현
      process.exit(0); // 게임 종료

    default:
      console.log(chalk.red('올바른 선택을 하세요.'));
      handleUserInput(); // 유효하지 않은 입력일 경우 다시 입력 받음
  }
}

// 게임 시작 함수
function start() {
  displayLobby();
  handleUserInput();
}

// 게임 실행
start();

function delay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 게임 오버 함수 //
export async function gameover() {
  console.clear();

  // 타이틀 텍스트
  console.log(
    chalk.red(
      figlet.textSync(' Connection  Lost ', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }),
    ),
  );

  // 상단 경계선
  const line = chalk.grey('='.repeat(80));
  console.log(line);

  // 메인 텍스트
  console.log(chalk.red.bold(' '));
  console.log(chalk.red.bold('EVE와의 연결이 끊어졌습니다.'));

  // 설명 텍스트
  console.log(chalk.gray('새로운 전투 로봇에 연결하시겠습니까?'));
  console.log();

  // 옵션들
  console.log(chalk.blue('1.') + chalk.white(' 새로운 전투 로봇 연결하기'));
  console.log(chalk.blue('2.') + chalk.white(' WN-2sT 광산을 포기하기'));
}

// 게임 오버시, 유저 입력을 받아 처리하는 함수
export async function handleUserInput2() {
  const choice = readlineSync.question('입력: ');

  switch (choice) {
    case '1':
      startGame(); //새로운 게임 시작
      break;
    case '2':
      console.log(chalk.red('WN-2sT 광산을 포기합니다.'));
      process.exit(0); // 게임 종료

    default:
      console.log(chalk.red('올바른 선택을 하세요.'));
      handleUserInput2(); // 유효하지 않은 입력일 경우 다시 입력 받음
  }
}

// 게임 클리어 함수 //
export async function gameclear() {
  console.clear();

  // 타이틀 텍스트
  console.log(
    chalk.green(
      figlet.textSync(' Complete ', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }),
    ),
  );

  // 상단 경계선
  const line = chalk.gray('='.repeat(50));
  console.log(line);

  // 메인 텍스트
  console.log(chalk.green.bold('정화 작업이 완료되었습니다.'));

  // 설명 텍스트
  console.log(chalk.gray('행성 관리 프로그램을 종료하시겠습니까?'));
  console.log();

  // 옵션들
  console.log(chalk.blue.bold('1.') + chalk.white.bold(' 종료하기'));
  console.log(chalk.blue('2.') + chalk.white(' 오염도 확인하기'));
}

// 게임 클리어시, 유저 입력을 받아 처리하는 함수
export async function handleUserInput3() {
  const choice = readlineSync.question('입력: ');

  switch (choice) {
    case '1':
      console.log(chalk.green('프로그램을 종료합니다.'));
      process.exit(0); // 게임 종료
    case '2':
      console.log(chalk.white('0% ... 정화 작업이 완료되었습니다.'));
      handleUserInput3();
    default:
      console.log(chalk.red('올바른 선택을 하세요.'));
      handleUserInput3(); // 유효하지 않은 입력일 경우 다시 입력 받음
  }
}
