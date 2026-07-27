
function toggleFaq(el){
  let answer = el.nextElementSibling;
  let icon = el.querySelector("i");
  answer.classList.toggle("active");
  icon.classList.toggle("rotate");
}
