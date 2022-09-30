// const sliderObj = {
//     screenPosY: null,
//     containerStartPosY: null,
//     containerEndPosY : null,
//     switchFlag:false, 

//     container : null,
//     selectorAll : null,
//     selectorAllOptions: null,
//     shownBlock: null,


//     init:() => {

//     },
    
//     setSelector: (arr) => {
//         sliderObj.selectorAll = arr
//     },
//     setContainer : (item) => {
//         sliderObj.container = item
//         sliderObj.setStartAndEnd(item)
//     },
//     setStartAndEnd:(item) =>{
//         console.log(item.getBoundingClientRect())
//         // setInterval(() => console.log(item.getBoundingClientRect()),1000)
//     },
//     setScreenPosY : (pos) => {
//         sliderObj.screenPosY = pos
//         console.log(sliderObj.screenPosY , "screenPosY")
//     },
//     handleClick : (event) => {
//         const id = event.target.getAttribute('item-id')
//         sliderObj.changeShownContainer(null,id)
//     },
//     changeShownContainer :  (item,id = null) => {
//         // set shown container
//         if (id == null) {
//             sliderObj.shownBlock = item
//         }else{
//             sliderObj.selectorAll.forEach(selector => {
//                 const selectorId = selector.getAttribute('item-id')
//                 if (selectorId  == Number(id)) {
//                     sliderObj.shownBlock = selector
//                     return
//                 }
//             })
//             // sliderObj.switchFlag = true
//         }
//         // turn off unshown containers

//             sliderObj.selectorAll.forEach((selector,index) =>
//                 {
//                     if(selector !== sliderObj.shownBlock ){
//                         selector.classList.remove('show')
//                         const parent = selector.closest('.js-container')
//                         const itemID = selector.getAttribute('item-id')
//                         // console.log(itemID)
//                         const contentContainer = parent.querySelectorAll(`.js-content-item[item-id="${itemID}"]`)
//                         const link = parent.querySelector(`.js-pagination-btn[item-id="${itemID}"]`)
//                         link.classList.remove('active')
//                         contentContainer.forEach(union => union.classList.remove('show'))
                        
//                     }else{
//                         selector.classList.add('show')
                        
//                         const parent = selector.closest('.js-container')
//                         const itemID = selector.getAttribute('item-id')
//                         const contentContainer = parent.querySelectorAll(`.js-content-item[item-id="${itemID}"]`)
//                         const link = parent.querySelector(`.js-pagination-btn[item-id="${itemID}"]`)
//                         const span = parent.querySelector('.js-pag-sapn')
//                         const linkProps = {
//                             width: link.offsetWidth,
//                             top: link.offsetTop,
//                             left : link.offsetLeft,
//                             height: link.offsetHeight
//                         }
//                         link.classList.add('active')
//                         span.style.height = linkProps.height + 'px'
//                         span.style.width = linkProps.width + 'px'
//                         span.style.left = linkProps.left + 'px'
//                         span.style.top = linkProps.top + 'px'

//                         contentContainer.forEach(union => union.classList.add('show'))
//                         // contentContainer.classList.add('show')
//                         console.log(sliderObj.shownBlock, "Active container")
//                         if (sliderObj.switchFlag) {
//                             screen.screenTop = 200
//                             window.moveTo(0,0)
//                             moveTo(20,20)
//                             window.focus()
//                         }
//                     }
//                 }
//             )
        
        
//     },
//     checkContainers: () =>{
//         if (sliderObj.container.getBoundingClientRect().top >= sliderObj.screenPosY) {
//             if (sliderObj.selectorAll[0]) {
//                 console.log(sliderObj.selectorAll[0])
//                 sliderObj.changeShownContainer(sliderObj.selectorAll[0])
//             }
//             return
//         }
//         sliderObj.selectorAll.forEach((item,index,arr) =>{
            
//             if (item.getBoundingClientRect().top <= 0 && (item.getBoundingClientRect().top + item.getBoundingClientRect().height ) >= 0  ) {
//                 sliderObj.changeShownContainer(item)
                
//             }
            
//         })
//     },
//     scrollingEvent : () => {
//         if (!sliderObj.switchFlag) {
//             sliderObj.checkContainers()
//         }
//         // sliderObj.scrollingEvent()
//     }
// }    