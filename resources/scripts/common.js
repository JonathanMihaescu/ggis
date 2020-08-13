// Start the main app logic.
/* for when you have dependencies this is how it would look like
requirejs(['jquery', 'canvas', 'app/sub'],
function   ($,        canvas,   sub) {*/
/* Require will not execute until the dependencies are loaded*/
requirejs(['domReady'],
function (domReady) {
  var lastScrollTop;
  domReady(function() {
    setHeadingSectionDimensions();
    setMainNavHeight();
    delayedRender();
    positionHeader();
  });
      
  var toggleElement = document.getElementById('toggle');

  /*Event handler for toggle*/
  toggleElement.addEventListener('click',function(){
      var mainNav = document.querySelector('main nav');
      subMenus = document.querySelectorAll('main ul.sub-menu');
      if (toggleElement.className === "toggle-open") {
         toggleElement.className = "toggle-close";
         mainNav.style.display = "block";
      } else {
         toggleElement.className = "toggle-open";
         mainNav.style.display = "none";
         for(var i=0;i<subMenus.length;i++){
          subMenus[i].style.display = "none";
         }
         resetMainNav();
      }
  });

  window.addEventListener("scroll", function(){
    var st = window.pageYOffset || document.documentElement.scrollTop; 
    var header = document.querySelector('header');
    var headerHeight = header.offsetHeight;

    if ((st < lastScrollTop -20 && st > headerHeight) || toggleElement.className === "toggle-close"){
      header.style.position = "fixed";
    }else if(st >=lastScrollTop ){
      header.style.position = "absolute";
    }
      lastScrollTop = st <= 0 ? 0 : st;
  });
  window.addEventListener('orientationchange',function(){
    positionHeader();
    setMainNavHeight();
    resetMainNav();
    if(isSafari()){
      setTimeout(setHeadingSectionDimensions, 500);
    }else{      
      setHeadingSectionDimensions();
    }
    
  });

  window.addEventListener('resize',function(event){
    /*Eliminates menu header and sub-menu and brings toggle */
    var toggleElement = document.getElementById('toggle');
    var headerNav = document.querySelector('header nav');
    var mainNav = document.querySelector('main nav');
    var subMenus;

    
    if(window.innerWidth<=768){
      /* Removes header nav; shows toggle */
      subMenus = document.querySelectorAll('header ul.sub-menu');
      for(var i=0;i<subMenus.length;i++){
        subMenus[i].style.display = "none";
      }
      toggleElement.style.display = "inline-block";
      headerNav.style.display = "none";
      var subMenu = document.querySelector('main nav ul.sub-menu');
      var subMenuStyle = getComputedStyle(subMenu);
      if(subMenuStyle.display === "none"){ 
        resetMainNav();
      }
    }
    else{
      /* Removes main nav and toggle; shows header nav*/
      subMenus = document.querySelectorAll('main ul.sub-menu');
      for(var i=0;i<subMenus.length;i++){
        subMenus[i].style.display = "none";
      }
      toggleElement.style.display = "none";
      toggleElement.className = "toggle-open";
      mainNav.style.display = "none";
      headerNav.style.display = "block";
    }

    /*resizing heading-section*/
    if(!window.mobileAndTabletCheck() || window.outterHeight<966){
      setHeadingSectionDimensions();
    }
    positionHeader();
    setMainNavHeight();
  });

  /*MAking all sub menus disappear when one appears  */
  var mainNav = document.querySelectorAll('main nav ul:not(.sub-menu)')[0];
  var headerNav = document.querySelectorAll('header nav ul:not(.sub-menu)')[0];
  
  var mainTabs = getTabsWithSubMenusFrom(mainNav);
  var headerTabs = getTabsWithSubMenusFrom(headerNav);

  addMenuClickEventTo(mainTabs);
  addMenuClickEventTo(headerTabs);
  
  function getTabsWithSubMenusFrom(navElement) {
    var tabsWithSubMenus = [];
    var navTabs = navElement.children;
    for(var i=0;i<navTabs.length;i++){
      if(navTabs[i].children.length>0){
        tabsWithSubMenus.push(navTabs[i]);
      }
    }
    return tabsWithSubMenus;
  }


  function addMenuClickEventTo(tabs){
    var navLinks = document.querySelectorAll('main nav ul a');
    var mainUL = document.querySelector('main nav ul');
    for(var i=0;i<tabs.length;i++){
      tabs[i].addEventListener('click',function(event){
        var target = event.currentTarget || event.srcElement;
        var subMenu = target.children[1];
        var subMenuStyle = getComputedStyle(subMenu);
        if(subMenuStyle.display === "grid"){
          /* hides only this elements*/
           subMenu.style.display = "none";
           resetMainNav();
        }else{
          for(var i=0;i<tabs.length;i++){
            tabs[i].children[1].style.display = "none";
          }
           subMenu.style.display = "grid";
           if(window.innerHeight>414){
            navLinks[1].style.marginBottom = 1 +"em";
           }else{
            mainUL.style.marginLeft = -25 + "%";
           }
        }
      });
    }
  }

  /*MAKING sub menus disappear when you click outside of them   */
  document.addEventListener("click", function(event) {
    // If user clicks inside the element, do nothing
    if (event.target.closest("header nav,main nav")) return;

    if(window.innerWidth<1100){
      var subMenus = document.querySelectorAll('main ul.sub-menu');
    }else{
      var subMenus = document.querySelectorAll('header ul.sub-menu');
    }
    for(var i=0;i<subMenus.length;i++){
        subMenus[i].style.display = "none";
    }
  });

  window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

    return check;
  };

  function setHeadingSectionDimensions(){
    var headerTag = document.getElementsByTagName('header')[0];
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var headingSection = document.getElementsByClassName("heading-section-full")[0];
    var headingWrapper = document.getElementById("heading-wrapper");
    if(headingSection != undefined){
      if(windowHeight>=1024){
        /* CASE1 */
        headingSection.style.height = 1024 - headerTag.offsetHeight  + "px";
      }else if(windowWidth>=1024){
        /* CASE2 */
        headingSection.style.height = windowHeight-headerTag.offsetHeight + 200 + "px";
      }else{
        /* CASE3 */
        headingSection.style.height = windowHeight-headerTag.offsetHeight + 100 + "px";
      }

      /*TODO: this should a css code but it doesn't work for some reason*/
    }else{
      headingSection = document.getElementsByClassName("heading-section-half")[0];
    }
    headingSection.style.width = 100 + "%";
  } 
  function delayedRender(){
    var body = document.getElementsByTagName("BODY")[0];
    body.style.visibility = "visible";
  }
  function positionHeader(){
    lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var headerHeight = document.querySelector('header').offsetHeight;
    var body = document.querySelector('body');
    body.style.paddingTop = headerHeight + "px";
  }
  function setMainNavHeight(){
    var headerHeight = document.querySelector('header').offsetHeight;
    var nav = document.querySelector('main nav');
    var navUL = document.querySelector('main nav ul');

    var ulHeight = window.innerHeight - headerHeight;
    nav.style.height = window.innerHeight + "px";
    nav.style.paddingTop = headerHeight + "px";
    navUL.style.height = ulHeight + "px";
    navUL.style.marginTop = -ulHeight/5/5 + "px";
  }
  function resetMainNav(){
    var navLinks = document.querySelectorAll('main nav ul a');
    var mainUL = document.querySelector('main nav ul');
    subMenus = document.querySelectorAll('main ul.sub-menu');
      for(var i=0;i<subMenus.length;i++){
        subMenus[i].style.display = "none";
      }
    navLinks[1].style.marginBottom = 0 +"em"; /*portrait*/
    mainUL.style.marginLeft = 0 + "%"; /*landscape*/
  }
  function isSafari(){
    var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isSafari && iOS) {
        return true;
    } 
    return false;
  }
});