////////////////////////////
//////////引擎//////////////
////////////////////////////
class Engine{
	constructor(hero,map){
		this.hero = hero;
		this.map = map;
		this.drawScoreboard(hero.getOption());
		this.isCombat = false;
	}

	drawScoreboard(options){
		//画计分板
		let sb = document.querySelector('.scoreboard');
		for(let opt in options){
			let temp = sb.querySelector(`.${opt}`);
			if(temp){
				if(typeof(options[opt]) !== 'object'){
					temp.innerText = options[opt];
				}else{
					for(let key in options[opt]){
						temp = sb.querySelector(`.${key}`);
						if(temp){
							temp.innerText = options[opt][key];
						}
					}
				}
			}
		}
	}

	heroMove(x,y){
		if(this.isCombat) return;  //战斗中不能移动
		let action = map.isAction(this.hero.xLocation+x,this.hero.yLocation+y);
		if(action === -1){                 
			return;                        //异常
		}else if(action === 0 || action === 9999 || action === 9998){
			this.hero.move(x,y);           //平地  9998 9999 为上下楼初始位置
		}else if(action < 100){
			return;                        //1-99 障碍
		}else if(action < 200){   
			this.attackCreep(x,y);         //100-199 怪物
		}else if(action <300){
			this.getItem(x,y);             //200-299 道具
		}else if(action < 400){
			;                              //300-399 NPC
		}else if(action < 402){             //400-401 楼梯
			let type = Storey.StoreyEnum(action);
			this.setStairway(type,result=>{
				let location = result > 0 ?this.map.initLocation.up : this.map.initLocation.dn;
				this.hero.setLocation(location);
				this.hero.dom = null;
				this.hero.draw();
			});  
		}
		
	}
	setStairway(type,callback){
		this.map.setStairway(type,callback);
	}
	getItem(x,y){
		let it = map.getItem(this.hero.xLocation+x,this.hero.yLocation+y);
		this.hero.getItem(it,(result)=>{
			if(result.state === -1){
				if(it.option.type === 'door'){
					Animation.toast(`没有足够的${it.option.name.replace('门','')}钥匙`);
				}
			}else{
				this.hero.move(x,y);
				this.map.deleteItem(this.hero.xLocation,this.hero.yLocation);
				this.drawScoreboard(hero.getOption());
				if(result.state === 0){
					Animation.toast(`获得一把${it.option.name}`);
				}
			}
		})
	}
	attackCreep(x,y){
		let m = map.getCreep(this.hero.xLocation+x,this.hero.yLocation+y);
		this.hero.attack(m,(result)=>{
			if(result === -1){
				Animation.toast('打不过');
			}else{
				this.isCombat = true;
				this.hero.move(x,y);
				Animation.attackAnimation(this.hero.dom,m.dom,(timer)=>{
					setTimeout(()=>{
						this.map.deleteCreep(this.hero.xLocation,this.hero.yLocation);
						this.drawScoreboard(hero.getOption());
						this.isCombat = false;
					},timer);
				});
			}
		});
	}
	up(){
		this.heroMove(-1,0);
	}
	down(){
		this.heroMove(1,0);
	}
	left(){
		this.heroMove(0,-1);
	}
	right(){
		this.heroMove(0,1)
	}
}

const Animation = {
	attackAnimation(aggressorDom,defenderDom,callback){
		let timer = 2000;
		let speed = 200;
		let flag = true;

		let interval = setInterval(()=>{
			defenderDom.style.zIndex = flag?'3':'4';
			aggressorDom.style.zIndex = flag?'4':'3';
			flag = !flag;
			timer -= speed;
			if(timer <= 0){
				clearInterval(interval);
				interval = null;
			}
		},speed);
		if(callback && typeof(callback) === 'function') callback.call(null,timer);		
	},
	toast(title){
		alert(title);
	}
}