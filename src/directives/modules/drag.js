export default {
  mounted: function(el) {
    const elHeader = el.querySelector('.drag-move');
    elHeader.style.cursor = 'move';

    elHeader.onmousedown = function(e) {
      var disx = e.pageX - el.offsetLeft;
      var disy = e.pageY - el.offsetTop;

      document.onmousemove = function(e) {
        el.style.left = e.pageX - disx + "px";
        el.style.top = e.pageY - disy + "px";
      };

      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
  },
};
