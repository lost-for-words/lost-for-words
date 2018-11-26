// The main "container" for the zine

zine = new ShuntDiv(document.getElementById('zine-container'), [], {
  default: 'zine-cover-front',
  saveWithHash: true,
});

// List of prose by their (partial) HTML identifier

zine_content = [
  "hard-of-hearing",
  "stationary-sailor",
  "22",
  "year-of-the-dog-whistle"
];

// Define animations for clicking links to prose

zine_content.forEach(function(partial_id) {
  zine.addShunt(
    new ShuntDiv.Introduction(
      'zine-content-' + partial_id,
      'dualAnimateCss',
      {
        exit_animation_name:  'fadeOut',
        exit_animation_function: 'ease',
        exit_animation_time: 800,
        enter_animation_name: 'fadeIn',
        enter_animation_function: 'ease',
        enter_animation_time: 650,
        enter_above: false,
      }
    )
  );

  document.querySelector('a#link-' + partial_id).addEventListener('click', function() {
    zine.introduce('zine-content-' + partial_id);
  });
});

// Define pair-wise animations between the zine's pages of prose

shunt_forward_horizontal = {
  exit_animation_name: 'fadeOutLeft',
  exit_animation_function: 'ease',
  exit_animation_time: 800,
  enter_animation_name: 'fadeInRight',
  enter_animation_function: 'ease',
  enter_animation_time: 650,
};

shunt_backward_horizontal = {
  exit_animation_name: 'fadeOutRight',
  exit_animation_function: 'ease',
  exit_animation_time: 800,
  enter_animation_name: 'fadeInLeft',
  enter_animation_function: 'ease',
  enter_animation_time: 650,
};

shunt_forward_vertical = {
  exit_animation_name: 'fadeOutUp',
  exit_animation_function: 'ease',
  exit_animation_time: 800,
  enter_animation_name: 'fadeInUp',
  enter_animation_function: 'ease',
  enter_animation_time: 650,
};

shunt_backward_vertical = {
  exit_animation_name: 'fadeOutDown',
  exit_animation_function: 'ease',
  exit_animation_time: 800,
  enter_animation_name: 'fadeInDown',
  enter_animation_function: 'ease',
  enter_animation_time: 650,
};

for (i = 1; i < zine_content.length; ++i) {
  zine_page_exit = 'zine-content-' + zine_content[i - 1];
  zine_page_enter = 'zine-content-' + zine_content[i];

  // Forward: enter keypress, spacebar keypress

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'dualAnimateCss',
    'keypress',
    Object.assign({ key: 13 }, shunt_forward_vertical)
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'dualAnimateCss',
    'keypress',
    Object.assign({ key: 32 }, shunt_forward_vertical)
  ));

  // Forward: down arrow keypress, right arrow keypress

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'dualAnimateCss',
    'keypress',
    Object.assign({ key: 40 }, shunt_forward_vertical)
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'dualAnimateCss',
    'keypress',
    Object.assign({ key: 39 }, shunt_forward_horizontal)
  ));

  // Backward: up arrow keypress, left arrow keypress

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_enter, zine_page_exit,
    'dualAnimateCss',
    'keypress',
    Object.assign({ key: 38 }, shunt_backward_vertical)
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_enter, zine_page_exit,
    'dualAnimateCss',
    'keypress',
    Object.assign({ key: 37 }, shunt_backward_horizontal)
  ));

  // Forward: mousewheel scroll down, touch event swipe up, touch event swipe
  // left

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'dualAnimateCss',
    'wheel',
    Object.assign({ deltaY: 20 }, shunt_forward_vertical)
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'dualAnimateCss',
    'touchSwipe',
    Object.assign({ swipe: 'up' }, shunt_forward_vertical)
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'dualAnimateCss',
    'touchSwipe',
    Object.assign({ swipe: 'left' }, shunt_forward_horizontal)
  ));

  // Backward: mousewheel scroll up, touch event swipe down, touch event swipe
  // right

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_enter, zine_page_exit,
    'dualAnimateCss',
    'wheel',
    Object.assign({ deltaY: -20 }, shunt_backward_vertical)
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_enter, zine_page_exit,
    'dualAnimateCss',
    'touchSwipe',
    Object.assign({ swipe: 'down' }, shunt_backward_vertical)
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_enter, zine_page_exit,
    'dualAnimateCss',
    'touchSwipe',
    Object.assign({ swipe: 'right' }, shunt_backward_horizontal)
  ));
}

// Zine covers

[
  ['zine-cover-front', 'zine-content-' + zine_content[0]],
  ['zine-content-' + zine_content.slice(-1)[0], 'zine-cover-back'],
].forEach(function(pages) {
  zine_page_exit = pages[0]
  zine_page_enter = pages.slice(-1)[0]

  // Forward: enter keypress, spacebar keypress

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'zRotate',
    'keypress',
    { key: 13, rotate: 'up' }
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'zRotate',
    'keypress',
    { key: 32, rotate: 'up' }
  ));

  // Forward: down arrow keypress, right arrow keypress

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'zRotate',
    'keypress',
    { key: 40, rotate: 'up' }
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'zRotate',
    'keypress',
    { key: 39, rotate: 'left' }
  ));

  // Backward: up arrow keypress, left arrow keypress

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_enter, zine_page_exit,
    'zRotate',
    'keypress',
    { key: 38, rotate: 'down' }
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_enter, zine_page_exit,
    'zRotate',
    'keypress',
    { key: 37, rotate: 'right' }
  ));

  // Forward: mousewheel scroll down, touch event swipe up, touch event swipe
  // left

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'zRotate',
    'wheel',
    { deltaY: 20, rotate: 'up' }
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'zRotate',
    'touchSwipe',
    { swipe: 'up', rotate: 'up' }
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_exit, zine_page_enter,
    'zRotate',
    'touchSwipe',
    { swipe: 'left', rotate: 'left' }
  ));

  // Backward: mousewheel scroll up, touch event swipe down, touch event swipe
  // right

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_enter, zine_page_exit,
    'zRotate',
    'wheel',
    { deltaY: -20, rotate: 'down' }
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_enter, zine_page_exit,
    'zRotate',
    'touchSwipe',
    { swipe: 'down', rotate: 'down' }
  ));

  zine.addShunt(new ShuntDiv.Transition(
    zine_page_enter, zine_page_exit,
    'zRotate',
    'touchSwipe',
    { swipe: 'right', rotate: 'right' }
  ));
});
