import $ from 'jquery';
import './style.scss';

let num = 0;

// setInterval(function() => {
//   num = num + 1;
//   console.log('hello');
//
//   $('#main').html('You have been here for ${num} seconds..');
//
//    }, 1000);


setInterval(() => {
  num += 1;
  console.log(num);
  console.log('hello');
  const a = `You have been here for ${num} seconds..`;

  $('#main').html(a);
}, 1000);
