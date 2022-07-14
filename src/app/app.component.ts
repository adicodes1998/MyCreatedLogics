import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  ///////////////////////////////////////////////////////
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAdd = faPlusSquare;
  faMinus = faMinusSquare;
  faSearch = faSearch;
  faWindowClose = faWindowClose;
  ///////////////////////////////////////////////////////
  title = 'lf_newreq';
  currentView: any = true;
  leftDiv = [
    {
      "email": "resp1@bp.com",
      "name": "RESP 1",
      "collapsed": true,
      "isChecked":false,
      "matters": [
        { "matterId": "11", "matterName": "matter11" ,"isChecked":false,},
        { "matterId": "12", "matterName": "matter12" ,"isChecked":false,},
        { "matterId": "13", "matterName": "matter13" ,"isChecked":false,}]
    },
    {
      "email": "resp2@bp.com",
      "name": "RESP 2",
      "collapsed": true,
      "isChecked":false,
      "matters": [
        { "matterId": "21", "matterName": "matter21" ,"isChecked":false,},
        { "matterId": "22", "matterName": "matter22" ,"isChecked":false,},
        { "matterId": "23", "matterName": "matter23" ,"isChecked":false,},
        { "matterId": "24", "matterName": "matter24" ,"isChecked":false,}]
    },
    {
      "email": "resp3@bp.com",
      "name": "RESP 3",
      "collapsed": true,
      "isChecked":false,
      "matters": [
        { "matterId": "31", "matterName": "matter31" ,"isChecked":false,},
      ]
    }
  ]
  rightDiv = [];
  selectedRespFromLeft = [];
  selectedRespFromRight = [];
  selectedRespIndexes = [];
  tempMatterObjLeft:any = {};
  tempMatterObjRight:any = {};
  indexOfRespRight:any;
  respExistsInRight =false;
  indexOfRespLeft:any;
  respExistsInLeft =false;
  searchAttorneyText:any = '';
  attorneyList:any = [];
  selectedAttorney:any;
  constructor(public router: Router,
              public homeService : HomeServiceService,
              public loadingService:AppLoadingService,
              ) {
    //this.rightDiv.sort((a, b) => a.name < b.name ? -1 : 1);
    //this.leftDiv.sort((a, b) => a.name < b.name ? -1 : 1);    
  }

 

  onRadioCheckLeftResp(e, obj) {
    this.leftDiv.forEach(r=>{
      if(e.target.id == r.email){
        r.isChecked = true;
        r.matters.forEach(m=>{
          m.isChecked = true;
        })
      }
    })
    let tempObj = jQuery.extend(true,{},obj)
    let respAlreadyExist = false;
    let existingRespIndex;
    this.selectedRespFromLeft.forEach((r,i)=>{
      if(r.email == tempObj.email){
        existingRespIndex = i;
        respAlreadyExist = true;
      }
    })
    console.log(e.target.id);
    if (e.target.checked) {
      if(respAlreadyExist){
        console.log('RESP ALREADY EXISTS');
        console.log(this.selectedRespFromLeft[existingRespIndex]);
        this.selectedRespFromLeft.splice(existingRespIndex,1);
        console.log(this.selectedRespFromLeft);
        
        console.log(tempObj);
        
        this.selectedRespFromLeft.push(tempObj)
      }else{
      this.selectedRespFromLeft.push(tempObj);
      console.log(tempObj);
      } 
    } else if (!e.target.checked) {
      let indexOftemp = this.selectedRespFromLeft.indexOf(tempObj);
      this.selectedRespFromLeft.splice(indexOftemp, 1);
      this.leftDiv.forEach(r=>{
        if(e.target.id == r.email){
          r.isChecked = false;
          r.matters.forEach(m=>{
            m.isChecked = false;
          })
        }
      })
    }
    console.log(this.selectedRespFromLeft,"/////////////////",this.leftDiv);
  }

  onRadioCheckLeftMatter(e, obj) {
   this.leftDiv.forEach(r=>{
    if(obj.email == r.email){
      r.matters.forEach(m=>{
        if(m.matterId == e.target.id){
          m.isChecked = true;
        }     
      })
    }
  })
    let respAlreadyExist = false;
    let existingRespIndex;
    this.tempMatterObjLeft = jQuery.extend(true,{},obj);
    this.selectedRespFromLeft.forEach((r,i)=>{
      if(r.email == obj.email){
        existingRespIndex = i;
        respAlreadyExist = true;
      }
    })
    if (e.target.checked) {
      if(!respAlreadyExist){
        for(let i=0;i<this.leftDiv.length;i++){
          if(this.leftDiv[i].email == this.tempMatterObjLeft.email){
            for(let j=0;j<this.tempMatterObjLeft.matters.length;j++){
              if(this.tempMatterObjLeft.matters[j].matterId !== e.target.id){
                this.tempMatterObjLeft.matters.splice(this.tempMatterObjLeft.matters.
                  indexOf(this.tempMatterObjLeft.matters[j]),1);
                  j--;
              }
            }
          }
        }
        this.selectedRespFromLeft.push(this.tempMatterObjLeft);
        this.tempMatterObjLeft = {};
      }else{
        for(let i=0;i<this.leftDiv.length;i++){
         if(this.leftDiv[i].email == this.selectedRespFromLeft[existingRespIndex].email){
          for(let j=0;j<this.leftDiv[i].matters.length;j++){
            if(this.leftDiv[i].matters[j].matterId == e.target.id){
              this.selectedRespFromLeft[existingRespIndex].matters.push(this.leftDiv[i].matters[j]);
              if(this.leftDiv[i].matters.length == this.selectedRespFromLeft[existingRespIndex].matters.length){
                this.leftDiv[i].isChecked = true;
              }
            }
          }
         }
        }
        
      }
    } else if (!e.target.checked) {
      
      this.selectedRespFromLeft[existingRespIndex].matters.forEach(r=>{
        if(r.matterId == e.target.id){
          this.selectedRespFromLeft[existingRespIndex].matters.splice(this.selectedRespFromLeft[existingRespIndex].matters.indexOf(r),1);
          this.leftDiv.forEach(r=>{
            if(r.email == this.selectedRespFromLeft[existingRespIndex].email){
              if(r.matters.length > this.selectedRespFromLeft[existingRespIndex].matters.length){
                r.isChecked = false;
              }
            }
          })
        }
       })
       
       if(this.selectedRespFromLeft[existingRespIndex].matters.length == 0){
        this.selectedRespFromLeft.splice(existingRespIndex,1);
       }
    }
    console.log(this.selectedRespFromLeft);
  }


  onRadioCheckRightMatter(e, obj) {
    console.log(e.target.id,obj);
    this.rightDiv.forEach(r=>{
     if(obj.email == r.email){
       r.matters.forEach(m=>{
         if(m.matterId == e.target.id){
           m.isChecked = true;
         }     
       })
     }
   })
     let respAlreadyExist = false;
     let existingRespIndex;
     this.tempMatterObjRight = jQuery.extend(true,{},obj)
     console.log(e.target.id);
     this.selectedRespFromRight.forEach((r,i)=>{
       if(r.email == obj.email){
         existingRespIndex = i;
         respAlreadyExist = true;
       }
     })
     if (e.target.checked) {
       if(!respAlreadyExist){
         for(let i=0;i<this.rightDiv.length;i++){
           console.log();
           if(this.rightDiv[i].email == this.tempMatterObjRight.email){
             console.log('Inside If');
             for(let j=0;j<this.tempMatterObjRight.matters.length;j++){
               console.log('Inside J loop');
               if(this.tempMatterObjRight.matters[j].matterId !== e.target.id){
                 console.log('Matter IDS in if');
                 console.log(this.tempMatterObjRight.matters[j]);
                 this.tempMatterObjRight.matters.splice(this.tempMatterObjRight.matters.
                   indexOf(this.tempMatterObjRight.matters[j]),1);
                   console.log(this.tempMatterObjRight.matters);
                   j--;
               }
             }
           }
         }
         console.log(this.tempMatterObjRight);
         this.selectedRespFromRight.push(this.tempMatterObjRight);
         this.tempMatterObjRight = {};
         console.log(this.tempMatterObjRight,this.selectedRespFromRight,this.rightDiv);
       }else{
         console.log(this.selectedRespFromRight[existingRespIndex].matters);  
         console.log(existingRespIndex);
         console.log(this.selectedRespFromRight[existingRespIndex]);
         for(let i=0;i<this.rightDiv.length;i++){
          if(this.rightDiv[i].email == this.selectedRespFromRight[existingRespIndex].email){
           for(let j=0;j<this.rightDiv[i].matters.length;j++){
             if(this.rightDiv[i].matters[j].matterId == e.target.id){
               console.log(this.selectedRespFromRight[existingRespIndex].matters);
               this.selectedRespFromRight[existingRespIndex].matters.push(this.rightDiv[i].matters[j]);
               console.log(this.selectedRespFromRight[existingRespIndex].matters);
               if(this.rightDiv[i].matters.length == this.selectedRespFromRight[existingRespIndex].matters.length){
                 this.rightDiv[i].isChecked = true;
               }
             }
           }
          }
         }
         console.log(this.selectedRespFromRight);
         
       }
     } else if (!e.target.checked) {
       
       this.selectedRespFromRight[existingRespIndex].matters.forEach(r=>{
         if(r.matterId == e.target.id){
           this.selectedRespFromRight[existingRespIndex].matters.splice(this.selectedRespFromRight[existingRespIndex].matters.indexOf(r),1);
           this.rightDiv.forEach(r=>{
             if(r.email == this.selectedRespFromRight[existingRespIndex].email){
               console.log('inside if of leftdiv matter unchecked');
               console.log(r.matters.length ,"//////////",this.selectedRespFromRight[existingRespIndex].matters.length);
               
               if(r.matters.length > this.selectedRespFromRight[existingRespIndex].matters.length){
                 r.isChecked = false;
               }
             }
           })
         }
        })
        console.log(this.selectedRespFromRight);
        if(this.selectedRespFromRight[existingRespIndex].matters.length == 0){
         this.selectedRespFromRight.splice(existingRespIndex,1);
        }
     }

 }

  onRadioCheckRightResp(e, obj){
    this.rightDiv.forEach(r=>{
      if(e.target.id == r.email){
        r.isChecked = true;
        r.matters.forEach(m=>{
          m.isChecked = true;
        })
      }
    })
    let tempObj = jQuery.extend(true,{},obj)
    let respAlreadyExist = false;
    let existingRespIndex;
    this.selectedRespFromRight.forEach((r,i)=>{
      if(r.email == tempObj.email){
        existingRespIndex = i;
        respAlreadyExist = true;
      }
    })
    console.log(e.target.id);
    if (e.target.checked) {
      if(respAlreadyExist){
        this.selectedRespFromRight.splice(existingRespIndex,1);
        this.selectedRespFromRight.push(tempObj)
      }else{
      this.selectedRespFromRight.push(tempObj);
      console.log(tempObj);
      } 
    } else if (!e.target.checked) {
      let indexOftemp = this.selectedRespFromRight.indexOf(tempObj);
      this.selectedRespFromRight.splice(indexOftemp, 1);
      this.rightDiv.forEach(r=>{
        if(e.target.id == r.email){
          r.isChecked = false;
          r.matters.forEach(m=>{
            m.isChecked = false;
          })
        }
      })
    }
    console.log(this.selectedRespFromRight,"/////////////////",this.rightDiv);
  }


//respExistsInRight = false;

 async  moveSelectedToRight() {
     for(let i=0;i<this.leftDiv.length;i++){
      console.log(this.selectedRespFromLeft,this.leftDiv);

        for(let j=0;j<this.selectedRespFromLeft.length;j++){
          console.log(j,this.selectedRespFromLeft.length);
          if(this.selectedRespFromLeft.length<1){
            break;
          }
          if(this.leftDiv[i].email == this.selectedRespFromLeft[j].email){
            console.log(this.selectedRespFromLeft);
            if(this.rightDiv.length>0){
                await this.checkRespExistsCase(this.rightDiv,this.selectedRespFromLeft[j],'left');
              if(this.respExistsInRight){
                console.log("Inside IF OF this.respExistsInRight");
               this.moveMatters(this.leftDiv[i].matters,this.selectedRespFromLeft[j].matters);
               // this.rightDiv[this.indexOfRespRight].matters.push(...this.selectedRespFromLeft[j].matters);
                console.log(this.rightDiv[this.indexOfRespRight],this.selectedRespFromLeft[j].matters);
                this.rightDiv[this.indexOfRespRight].matters.push(...this.selectedRespFromLeft[j].matters)
                this.selectedRespFromLeft.splice(j, 1);
                this.indexOfRespRight = null;
                this.respExistsInRight = false;
                if(this.leftDiv[i].matters.length == 0){
                  this.leftDiv.splice(i,1);
                  i--;
                } 
                j--;
                //i--;
                break;
              }else{
                console.log('Inside else of undefined----------');
                if(this.leftDiv[i].matters.length!=this.selectedRespFromLeft[j].matters.length){
                  this.moveMatters(this.leftDiv[i].matters,this.selectedRespFromLeft[j].matters);
                  this.rightDiv.push(this.selectedRespFromLeft[j]);
                  this.selectedRespFromLeft.splice(j,1);
                  j--;
                }else{
                  this.rightDiv.push(this.selectedRespFromLeft[j]);
                  this.leftDiv.splice(i,1);
                  this.selectedRespFromLeft.splice(j,1);
                  i--;
                  j--;
                  break;
                }
              }
            }else{
              if(this.leftDiv[i].matters.length!=this.selectedRespFromLeft[j].matters.length){
                this.moveMatters(this.leftDiv[i].matters,this.selectedRespFromLeft[j].matters);
                this.rightDiv.push(this.selectedRespFromLeft[j]);
                this.selectedRespFromLeft.splice(j,1);
                j--;                
              }else{
                console.log('INSIDE ELSE');
                this.rightDiv.push(this.selectedRespFromLeft[j]);
                this.leftDiv.splice(i,1);
                this.selectedRespFromLeft.splice(j,1);
                i--;
                j--;
                break;
              } 
            }
          }
        }
     }
     this.collapseAllOnMove(this.rightDiv);
    this.uncheckAllOnMove(this.rightDiv);
    this.selectedRespFromLeft = [];
    this.sortAllArrays();
  }

  sortAllArrays(){
    this.rightDiv.sort((a, b) => a.name < b.name ? -1 : 1);
    this.leftDiv.sort((a, b) => a.name < b.name ? -1 : 1);
    this.rightDiv.forEach(r=>{
      r.matters.sort((a, b) => a.matterName < b.matterName ? -1 : 1);
    });
    this.leftDiv.forEach(r=>{
      r.matters.sort((a, b) => a.matterName < b.matterName ? -1 : 1);
    })
  }

  uncheckAllOnMove(arr){
    arr.forEach(r=>{
      r.isChecked = false;
      r.matters.forEach(m=>{
        m.isChecked = false;
      })
    })
  }

  collapseAllOnMove(arr){
    arr.forEach(r=>{
      r.collapsed = true;
    })
  }

  async checkRespExistsCase(toCheckIn,toCheckFrom,s){
    console.log(toCheckIn,toCheckFrom,s);
    if(s=='left'){
      for(let c=0;c<toCheckIn.length;c++){
        if(toCheckIn[c].email == toCheckFrom.email){
          this.respExistsInRight = true;
          this.indexOfRespRight = c;
        }
      }
    }else if(s=='right'){
      for(let c=0;c<toCheckIn.length;c++){
        if(toCheckIn[c].email == toCheckFrom.email){
          this.respExistsInLeft = true;
          this.indexOfRespLeft = c;
        }
      }
    } 
    
  }
 
  moveMatters(from,to){
    console.log(from,to);
    for(let i=0;i<from.length;i++){
      for(let j=0;j<to.length;j++){
      //  console.log(from[i],i);
        // if(i==-1){
        //   i=0
        // }
        if(from[i].matterId == to[j].matterId){
          console.log(from[i]);
          from.splice(i,1);
          i--;
          break;
        }
      }
    }
  }

 async moveAllToRight() {
  console.log(this.rightDiv.length);
   if(this.rightDiv.length < 1){
    this.rightDiv.push(...this.leftDiv);
   }else{
    for(let i=0;i<this.leftDiv.length;i++){
      await this.checkRespExistsCase(this.rightDiv,this.leftDiv[i],'left');
      if(this.respExistsInRight){
        console.log('Inside exists');
        
      this.rightDiv[this.indexOfRespRight].matters.push(...this.leftDiv[i].matters); 
      this.respExistsInRight = false;
      }else{
        console.log('Inside not exists');
        console.log(this.leftDiv[i]);
        this.rightDiv.push(this.leftDiv[i]);
      }
    }
   }
   console.log("Final Right div",this.rightDiv);
    this.leftDiv = [];
    this.collapseAllOnMove(this.rightDiv);
    this.uncheckAllOnMove(this.rightDiv);
    this.sortAllArrays();

  }
  
  async  moveSelectedToLeft(){
    for(let i=0;i<this.rightDiv.length;i++){
     console.log(this.selectedRespFromRight,this.rightDiv);

       for(let j=0;j<this.selectedRespFromRight.length;j++){
         if(this.selectedRespFromRight.length<1){
           break;
         }
         if(this.rightDiv[i].email == this.selectedRespFromRight[j].email){
           console.log(this.selectedRespFromRight);
           if(this.leftDiv.length>0){
               await this.checkRespExistsCase(this.leftDiv,this.selectedRespFromRight[j],'right');
               if(this.respExistsInLeft){
                console.log("Inside IF OF this.respExistsInLeft");
               this.moveMatters(this.rightDiv[i].matters,this.selectedRespFromRight[j].matters);
               // this.leftDiv[this.indexOfRespLeft].matters.push(...this.selectedRespFromRight[j].matters);
                console.log(this.leftDiv[this.indexOfRespLeft],this.selectedRespFromRight[j].matters);
                this.leftDiv[this.indexOfRespLeft].matters.push(...this.selectedRespFromRight[j].matters)
                this.selectedRespFromRight.splice(j, 1);
                this.indexOfRespLeft = null;
                this.respExistsInLeft = false;
                if(this.rightDiv[i].matters.length == 0){
                  this.rightDiv.splice(i,1);
                  i--;
                } 
                j--;
                //i--;
                break;
              }else{
               console.log('Inside else of undefined----------');
               if(this.rightDiv[i].matters.length!=this.selectedRespFromRight[j].matters.length){
                 this.moveMatters(this.rightDiv[i].matters,this.selectedRespFromRight[j].matters);
                 this.leftDiv.push(this.selectedRespFromRight[j]);
                 this.selectedRespFromRight.splice(j,1);
                 j--;
               }else{
                 this.leftDiv.push(this.selectedRespFromRight[j]);
                 this.rightDiv.splice(i,1);
                 this.selectedRespFromRight.splice(j,1);
                 i--;
                 j--;
                 break;
               }
             }
           }else{
             if(this.rightDiv[i].matters.length!=this.selectedRespFromRight[j].matters.length){
               this.moveMatters(this.rightDiv[i].matters,this.selectedRespFromRight[j].matters);
               this.leftDiv.push(this.selectedRespFromRight[j]);
               this.selectedRespFromRight.splice(j,1);
               j--;
             }else{
               console.log('INSIDE ELSE');
               this.leftDiv.push(this.selectedRespFromRight[j]);
               this.rightDiv.splice(i,1);
               this.selectedRespFromRight.splice(j,1);
               i--;
               j--;
               break;
             } 
           }
         }
       }
    }
    this.collapseAllOnMove(this.leftDiv);
   this.uncheckAllOnMove(this.leftDiv);
   this.selectedRespFromRight = [];
  this.sortAllArrays();
 }

 async moveAllToLeft() {
  console.log(this.leftDiv.length);
   if(this.leftDiv.length < 1){
    this.leftDiv.push(...this.rightDiv);
   }else{
    for(let i=0;i<this.rightDiv.length;i++){
      await this.checkRespExistsCase(this.leftDiv,this.rightDiv[i],'right');
      if(this.respExistsInLeft){
        console.log('Inside exists');
        
      this.leftDiv[this.indexOfRespLeft].matters.push(...this.rightDiv[i].matters); 
      this.respExistsInLeft = false;
      }else{
        console.log('Inside not exists');
        console.log(this.rightDiv[i]);
        this.leftDiv.push(this.rightDiv[i]);
      }
    }
   }
   console.log("Final Left div",this.leftDiv);
    this.rightDiv = [];
    this.collapseAllOnMove(this.leftDiv);
    this.uncheckAllOnMove(this.leftDiv);
    this.sortAllArrays();

  }

  addBoxClicked(e) {
    e.collapsed = !e.collapsed;
  }

}
