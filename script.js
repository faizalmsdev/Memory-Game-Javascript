let sequence = [];
let level = 0;
let score = 0;
let gameOver = false;

$('#start').click(function (e) {
  e.preventDefault();
  resetGame();
});

function resetGame() {
  sequence = [];
  level = 0;
  score = 0;
  gameOver = false;
  $('#score').text(`Score: ${score}`);
  $('#message').text('');
  execute();
}

function execute() {
  level++;
  $('#message').text(`Level ${level}`);
  const randomNum = Math.floor(Math.random() * 4);
  const array = ['red', 'yellow', 'blue', 'darkgreen'];
  const color = array[randomNum];
  sequence.push(color);
  console.log(sequence);

  let val = '#' + color;
  $(val)
    .animate({ opacity: 0.5 })
    .animate({ opacity: 1 }, () => {
      if (!gameOver) {
        addClickHandlers();
      }
    });
}

function addClickHandlers() {
  let clicked = 0;
  $('.container button').click(function () {
    const clickedColor = $(this).attr('data-action');
    const expectedColor = sequence[clicked];
    if (clickedColor === expectedColor) {
      clicked++;
      if (clicked === sequence.length) {
        score++;
        $('#score').text(`Score: ${score}`);
        setTimeout(execute, 1000);
      }
    } else {
      gameOver = true;
      $('#message').text(`Game over. Your score was ${score}.`);
    }
  });
}
