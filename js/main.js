class VerticalSlider {
  screenPosY =null
  containerStartPosY= null
  containerEndPosY = null
  switchFlag =false

  container = null
  selectorAll = null
  selectorAllOptions= null
  shownBlock=null

  constructor(containerClass){
      this.setScreenPosY(window.pageYOffset)
      const container = document.querySelector(`${containerClass}`)
      const containerList = container.querySelectorAll(`.vertical-slider__item`)
      this.setSelector(containerList)
      this.setContainer(container)
      this.checkContainers() 
  }
  resize = () =>{
      // if (window.innerWidth < 1199) {
      this.switchFlag = false
      // }
      if (this.container == null) {
        return
      }
      
      this.setScreenPosY(window.pageYOffset)
      this.scrollingEvent()
  }
  scroll = () =>{
   
    this.setScreenPosY(window.pageYOffset)
    this.checkContainers()
  }
  setSelector = (arr) => {
      this.selectorAll = arr
  }
  setContainer  = (item) => {
      this.container = item
      this.setStartAndEnd(item)
  }
  setStartAndEnd = (item) =>{
      // console.log(item.getBoundingClientRect())
  }
  setScreenPosY = (pos) => {
      this.screenPosY = pos
  }
  handleClick = (event) => {
      const id = event.target.getAttribute('item-id')
      this.changeShownContainer(null,id)
  }
  changeShownContainer =  (item) => {
   
      this.shownBlock = item


      this.selectorAll.forEach((selector,index) =>
              {
                  if(selector !== this.shownBlock ){
                      selector.classList.remove('show')
                      const parent = selector.closest('.js-container')
                      const itemID = selector.getAttribute('item-id')
                      const contentContainer = parent.querySelectorAll(`.js-content-item[item-id="${itemID}"]`)
                      const link = parent.querySelector(`.js-pagination-btn[item-id="${itemID}"]`)
                      link.classList.remove('active')
                      contentContainer.forEach(union => union.classList.remove('show'))
                      
                  }else if(selector == this.shownBlock ) {
                      
                      // if (!selector.classList.contains('show')) {
                          // console.log(selector.classList.contains('show'))
                          selector.classList.add('show')
                          // console.log(selector == this.shownBlock)
                          const parent = selector.closest('.js-container')
                          const itemID = selector.getAttribute('item-id')
                          const contentContainer = parent.querySelectorAll(`.js-content-item[item-id="${itemID}"]`)
                          const link = parent.querySelector(`.js-pagination-btn[item-id="${itemID}"]`)
                          const span = parent.querySelector('.js-pag-span')
                          const linkProps = {
                              width: link.offsetWidth,
                              top: link.offsetTop,
                              left : link.offsetLeft,
                              height: link.offsetHeight
                          }
                          link.classList.add('active')
                          span.style.height = linkProps.height + 'px'
                          span.style.width = linkProps.width + 'px'
                          span.style.left = linkProps.left + 'px'
                          span.style.top = linkProps.top + 'px'

                          contentContainer.forEach(union => union.classList.add('show'))
                          if (this.switchFlag) {
                              screen.screenTop = 200
                              window.moveTo(0,0)
                              moveTo(20,20)
                              window.focus()
                          }
                      // }
                      
                  }
              }
          )
      
      
  }
  checkContainers = () =>{
   
      // if (!this.switchFlag) {
          if (this.container.getBoundingClientRect().top > 0) {

              if (this.switchFlag === false) {
                  this.selectorAll.forEach((item,index,arr) => {
                      const percent = (item.getBoundingClientRect().top + item.getBoundingClientRect().height) /100
                      const allHeight = item.getBoundingClientRect().height

                      const parent = item.closest('.js-container')
                      const id = item.getAttribute('item-id')
                      const img = parent.querySelector(`.js-img[item-id="${id}"]`)
                      img.style.transform = `translate(0px,${item.getBoundingClientRect().height/200 - 50}%)`
                  })

                  if (this.selectorAll[0]) {
                      this.changeShownContainer(this.selectorAll[0])
                  }
                  this.switchFlag = true
                  
                  // console.log('srabotal 1')
              }
          }
          else if (this.container.getBoundingClientRect().top +this.container.getBoundingClientRect().height > 0){

              if (this.switchFlag === false) {
                  this.selectorAll.forEach((item,index,arr) => {
                      // console.log(item)
                      const percent = (item.getBoundingClientRect().top + item.getBoundingClientRect().height) /100
                      const allHeight = item.getBoundingClientRect().height

                      const parent = item.closest('.js-container')
                      const id = item.getAttribute('item-id')
                      const img = parent.querySelector(`.js-img[item-id="${id}"]`)
                      img.style.transform = `translate(0px,${-item.getBoundingClientRect().height/200 - 50}%)`
                  })
                  if (this.selectorAll[this.selectorAll.length - 1]) {
                      this.changeShownContainer(this.selectorAll[this.selectorAll.length - 1])
                  }

                  this.switchFlag = true
                  // console.log('srabotal 2')
                  // return
              }
              
          
          }
      // }
      
      this.selectorAll.forEach((item,index,arr) =>{
          
          if (item.getBoundingClientRect().top < 1 && (item.getBoundingClientRect().top + item.getBoundingClientRect().height ) >=  0    ) {
              const percent = (item.getBoundingClientRect().top + item.getBoundingClientRect().height) /100
              const allHeight = item.getBoundingClientRect().height
              const parent = item.closest('.js-container')
              const id = item.getAttribute('item-id')
              const img = parent.querySelector(`.js-img[item-id="${id}"]`)

              img.style.transform = `translate(0px,${-item.getBoundingClientRect().height/200 + percent - 50}%)`
              img.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out'
              // if (!this.switchFlag) {
                  // this.changeShownContainer(item)
                  // console.log('srabotal aaa')
                  this.switchFlag = true
              // }else if(item.classList.contains('show')){
                  this.changeShownContainer(item)

              // }
              
              // this.changeShownContainer(item)
              // console.log('srabotal')
          }
          
      })
  
     

  }
  scrollingEvent = () => {

      // if (this.switchFlag) {
          this.checkContainers()
      // }??
  }
}
let slider1, slider2

const objExp = {
  container:null,
  containerList:null,
  linkList: null,
  shownBlock: null,
  switchFlag:false,
  loading: false,

  init: async (obj)=>{
    const {containerClassNameList, linkClassNameList} = obj;
    await objExp.setContainerList(containerClassNameList)
    await objExp.setLinkList(linkClassNameList)
    if (objExp.loading) {
      objExp.check()
    }

  },
  switcher: (item,index) =>{
    if (item == objExp.shownBlock) {
      return
    }
    objExp.shownBlock = item
    objExp.linkList.forEach((link,id) =>{
      if (id !== index) {
        link.classList.remove("is-active")
      }else{
        link.classList.add("is-active")
      }

    })


  },
  setContainerList: (className)=>{
    if (document.querySelectorAll(className)) {
      objExp.containerList = document.querySelectorAll(className);
      objExp.loading = true
      // console.log(true)
      return 
    }
    objExp.loading = false
    // console.log(false)
    return 
  },
  setLinkList: (className)=>{
    if (document.querySelectorAll(className)) {
      objExp.linkList = document.querySelectorAll(className);
      objExp.loading = true
      // console.log(true)
      return 
    }
    objExp.loading = false
    // console.log(false)
    return 
  },
  check:()=>{
    let startPoint = 160
    if (objExp.loading !== true) {
      return console.log("check - false")
    }
    objExp.containerList.forEach((item,index,arr) =>{
      if (item.closest(".js-good-section-list").getBoundingClientRect().top > 0) {
        objExp.switcher(arr[0],0)
        return
      }
      if (item.closest(".js-good-section-list").getBoundingClientRect().top + item.closest(".js-good-section-list").getBoundingClientRect().height < 1) {
        objExp.switcher(arr[arr.length-1],arr.length-1)
        return
      }
      if (item.getBoundingClientRect().top < startPoint && (item.getBoundingClientRect().top + item.getBoundingClientRect().height ) >=  startPoint ) {
        objExp.switcher(item,index)
      }
    })
  },
  scroll: ()=>{
    if (objExp.loading) {
      objExp.check()
    }
    
  },
  resize:()=>{
    if (objExp.loading) {
      objExp.check()
    }
  },


}





$(document).ready(function() {
  gallerySliderInit();
  reviewsSliderInit();
  productSliderInit();
  productNavSliderInit();
  modalVideoInit();
  headerMenuMobile();
  headerSubmenuMobile();
  gallerySliderTab();
  scrollTarget();
  tabMainGood();
  truncateTextReviews();
  linkTabSlide();
  // onloadVerticalSlider();

  // header dropdown menu mobile
  function headerMenuMobile() {
    $('.js-header-nav-mobile-btn').click(function() {
      $(this).toggleClass('is-active');
      $('body').toggleClass('is-menu-mobile-show');
      $('.header').toggleClass('is-menu-mobile-show');
      $('.header__nav').toggleClass('is-show');
    });
  }

  function headerSubmenuMobile() {
    $('.js-header-nav-link-dropdown').click(function() {
      $(this).toggleClass('is-active');
      $(this).siblings('.header-nav__dropdown').toggleClass('is-show');
      return false;
    });
  }

  // gallery tab
  function gallerySliderTab() {
    $('.js-gallery-tab-click').click(function() {
      $('.js-gallery-tab-click').toggleClass('is-active');
      $('.gallery-slider__block').toggleClass('is-active');
    });
  }

  function headerSubmenuMobile() {
    $('.js-header-nav-link-dropdown').click(function() {
      $(this).toggleClass('is-active');
      $(this).siblings('.header-nav__dropdown').toggleClass('is-show');
      return false;
    });
  }

  // modal video init
  function modalVideoInit() {
    $('.js-modal-video-init').click(function() {
      $('body').addClass('is-video-modal');
      $('.modal-video').addClass('is-show');
    });

    $('.js-modal-video-close').click(function() {
      $('body').removeClass('is-video-modal');
      $('.modal-video').removeClass('is-show');
    });
  }

  // slick slider init
  function gallerySliderInit() {
    if ($('.js-gallery-slider-init')[0]){
      $('.js-gallery-slider-init').each(function(){
        var $carousel = $(this);
        $carousel.slick({
          fade: true,
          speed: 600,
          arrows: true,
          prevArrow: '<button type="button" class="btn-slider btn-slider--theme-accent btn-slider--size-lg btn-slider--prev"><span class="btn-slider__icon-wrap"><svg class="icon btn-slider__icon"><use xlink:href="images/sprite.svg#arrow-slider-prev"></span></button>',
          nextArrow: '<button type="button" class="btn-slider btn-slider--theme-accent btn-slider--size-lg btn-slider--next"><span class="btn-slider__icon-wrap"><svg class="icon btn-slider__icon"><use xlink:href="images/sprite.svg#arrow-slider-next"></span></button>',
          dots: false,
          slidesToScroll: 1,
          slidesToShow: 1
        });
      });
    }
  }

  function reviewsSliderInit() {
    if ($('.js-reviews-slider-init')[0]){
      $('.js-reviews-slider-init').each(function(){
        var $carousel = $(this);
        $carousel.slick({
          fade: false,
          speed: 340,
          arrows: true,
          prevArrow: '<button type="button" class="btn-slider btn-slider--theme-accent-light btn-slider--size-md btn-slider--prev"><span class="btn-slider__icon-wrap"><svg class="icon btn-slider__icon"><use xlink:href="images/sprite.svg#arrow-slider-prev"></span></button>',
          nextArrow: '<button type="button" class="btn-slider btn-slider--theme-accent-light btn-slider--size-md btn-slider--next"><span class="btn-slider__icon-wrap"><svg class="icon btn-slider__icon"><use xlink:href="images/sprite.svg#arrow-slider-next"></span></button>',
          appendArrows: $('.reviews-section__slider-control'),
          dots: false,
          slidesToScroll: 1,
          slidesToShow: 3,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                variableWidth: true
              }
            }
          ]
        });
      });
    }
  }

  function productSliderInit() {
    if ($('.js-product-slider-init')[0]){
      $('.js-product-slider-init').each(function(){
        var $carousel = $(this);
        
        $carousel.slick({
          fade: true,
          speed: 600,
          arrows: false,
          dots: false,
          slidesToScroll: 1,
          slidesToShow: 1,
          swipe: false,
          asNavFor: $('.js-product-nav-slider-init'),
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                dots: true,
                swipe: true
              }
            }
          ]
        });

        $carousel.on('afterChange', function(event, slick, currentSlide) {
            var vid = $(slick.$slides[currentSlide]).find('video');
            if (vid.length > 0) {
              $carousel.slick('slickPause');
              $(vid).get(0).play();
            }
          });
      });
    }
  }

  function productNavSliderInit() {
    if ($('.js-product-nav-slider-init')[0]){
      $('.js-product-nav-slider-init').each(function(){
        var $carousel = $(this);
        $carousel.slick({
          infinite: false,
          fade: false,
          speed: 340,
          arrows: false,
          dots: false,
          slidesToScroll: 1,
          slidesToShow: 5,
          vertical: true,
          verticalSwiping: true,
          asNavFor: $('.js-product-slider-init'),
          focusOnSelect: true
        });
      });
    }
  }

  // scroll target
  function scrollTarget() {
    let speed = 450
    $('.js-target-scroll').click(function(){
      objExp.loading = false
      $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
        
      }, speed);
      setTimeout(() => {
        objExp.loading = true
      }, speed - 15);
      
      return false;
    });
  }

  // tab main good
  function tabMainGood() {
    $('.js-tab-link').click(function() {
      $('.js-tab-link').removeClass('is-active');
      $(this).addClass('is-active');
      $('.good-appeal__picture, .good-appeal__tab').toggleClass('is-show');
      return false;
    });
  }

  // truncate text reviews
  function truncateTextReviews() {
    $('.reviews-slider__slide-content').each(function(){
      if($(this).text().length > 360)
        $(this).text($(this).text().substr(0,360)+ '...');
    });
  }

  // current link tab nav
  function linkTabSlide() {
    const indicator = document.querySelector('.js-tab-nav .nav-good__bg');
    const items = document.querySelectorAll('.js-tab-nav li:not(.nav-good__bg) a');

    function handleIndicator(el) {
      items.forEach(item => {
        item.classList.remove('is-active');
        item.removeAttribute('style');
      });
      
      indicator.style.width = `${el.offsetWidth}px`;
      indicator.style.left = `${el.offsetLeft}px`;

      el.classList.add('is-active');
    }

    items.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        handleIndicator(e.target);
        e.preventDefault();
      });
      item.classList.contains('is-active') && handleIndicator(item);
    });
  }
});

// scroll animated viewer
function scrollAnimated() {
  // onscrollVerticalSlider()

  var reveals = document.querySelectorAll('.js-good-section-view');
  var revealsAdvantage = document.querySelectorAll('.js-product-advantage-view');
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 1070;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('is-view');
    } else {
      reveals[i].classList.remove('is-view');
    }
  }
  for (var i = 0; i < revealsAdvantage.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = revealsAdvantage[i].getBoundingClientRect().top;
    var elementVisible = 400;
    if (elementTop < windowHeight - elementVisible) {
      revealsAdvantage[i].classList.add('is-view');
    } else {
      revealsAdvantage[i].classList.remove('is-view');
    }
  }
}

window.addEventListener('scroll', scrollAnimated);
scrollAnimated();

// scroll magic
var wh = window.innerHeight,
  infoWord = $('.js-info-word'),
  infoText = $('.js-info-text'),
  infoTitle = $('.js-appeal-title-1'),
  infoTitle2 = $('.js-appeal-title-2'),
  infoTitle3 = $('.js-appeal-title-3'),
  mainBenefits = $('.js-main-benefits');

var ctrl = new ScrollMagic.Controller();

var infoWordd = TweenMax.fromTo(infoWord, 1,
{
  xPercent: 100,
  ease: Power1.easeIn
}, {
  xPercent: -140,
  ease: Power1.easeIn
});


var scene = new ScrollMagic.Scene({
  // trigerHook: "onEnter",
  duration: "140%"
})  
.setTween(infoWordd)
.addTo(ctrl);

var infoTextt = TweenMax.fromTo(infoText, 1,
{
  yPercent: 60,
  opacity: 0,
  ease: Power1.easeInOut
}, {
  yPercent: 0,
  opacity: 1,
  ease: Power1.easeInOut
});



var scene = new ScrollMagic.Scene({
  // trigerHook: "onEnter",
  duration: "150%"
})  
.setTween(infoTextt)
.addTo(ctrl);

var mainBenefitss = TweenMax.fromTo(mainBenefits, 1,
{
  yPercent: 0,
  opacity: 1,
  ease: Power1.easeInOut
}, {
  yPercent: -500,
  opacity: 0,
  ease: Power1.easeInOut
});

var scene = new ScrollMagic.Scene({
  // trigerHook: "onEnter",
  duration: "90%"
})  
.setTween(mainBenefitss)
.addTo(ctrl);





function onloadVerticalSlider(){
  if (document.querySelector('.slider1') && document.querySelector('.slider2')) {
    if (window.innerWidth > 1199 ) {
      slider1 = new VerticalSlider('.slider1')
      slider2 = new VerticalSlider('.slider2')

    }
  }
  
}
function onresizeVerticalSlider(){
  if (window.innerWidth < 1199 && slider1 && slider2) {
    slider1.switchFlag = false
    slider2.switchFlag = false
  }
  if (window.innerWidth > 1199  && slider1 && slider2) {

    slider1.resize()
    slider2.resize()
  }
}
function onscrollVerticalSlider() {
  if (window.innerWidth > 1199  && slider1 && slider2 ) {
      slider1.scroll()
      slider2.scroll()
  }
}
function getOffset(el) {
  if (el == undefined) {
    return {
      left: 0,
      top: 0
    }
  }  
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}
function getY(el) {
  return getOffset(el).top - window.innerHeight/0.7
}
function onloadAnimatedText() {

  var infoTitlee = TweenMax.fromTo(infoTitle, 1,
    {
      x: '-30px',
      // opacity: 1,
      ease: Power1.easeInOut
    }, {
      x: '30px',
      // opacity: 0,
      ease: Power1.easeInOut
    });
    
  scene1 = new ScrollMagic.Scene({
    // trigerHook: "onEnter",
    duration: "200%",
    offset: getY(infoTitle[0])
  })
  .setTween(infoTitlee)
  .addTo(ctrl);



  var infoTitlee2 = TweenMax.fromTo(infoTitle2, 1,
    {
      x: '30px',
      // xPercent: -10,
      // opacity: 1,
      ease: Power1.easeInOut
    }, {
      // xPercent: 10,
      // opacity: 0,
      x: '-30px',
      ease: Power1.easeInOut
    });
    
  scene2 = new ScrollMagic.Scene({
    // trigerHook: "onEnter",
    duration: "200%",
    offset: getY(infoTitle2[0])
  })
  .setTween(infoTitlee2)
  .addTo(ctrl);
  

  var infoTitlee3 = TweenMax.fromTo(infoTitle3, 1,
    {
      x: '-30px',
      // opacity: 1,
      ease: Power1.easeInOut
    }, {
      x: '30px',
      // opacity: 0,
      ease: Power1.easeInOut
    });
    
  scene3 = new ScrollMagic.Scene({
    // trigerHook: "onEnter",
    duration: "200%",
    offset:getY(infoTitle3[0])
  })
  .setTween(infoTitlee3)
  .addTo(ctrl);

}
function updateAnimatedTextOnScroll(){
  if (scene1 ) {
    scene1.offset(getY(infoTitle[0]))
  }
  if (scene2 ) {
    scene2.offset(getY(infoTitle2[0]))
  }
  if (scene3 ) {
    scene3.offset(getY(infoTitle3[0]))
  }
}

let scene1 , scene2, scene3 = null 



window.addEventListener('resize', onresizeVerticalSlider)

window.onresize = () => {
  onresizeVerticalSlider()
  objExp.resize()
}
window.onload = () => {
  onloadVerticalSlider()
  onloadAnimatedText()
  objExp.init({containerClassNameList:".js-good-section-item", linkClassNameList:".js-good-link"})
}
window.onscroll = () => {
  onscrollVerticalSlider()
  updateAnimatedTextOnScroll()
  objExp.scroll()
}