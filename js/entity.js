////////////////////////////
//////////实体基类//////////
////////////////////////////
class BaseEntity{
	constructor(x,y,option){
		this.xLocation = x || 0;
		this.yLocation = y || 0;
		this.option = Object.assign({},option);
		this.draw();
	}
	draw(){
		let areaDom = config.area;
		let entityDom = this.dom;
		if(!entityDom){
			entityDom = document.createElement('div');
			entityDom.className = this.option.className;
			areaDom.appendChild(entityDom);
		}
		entityDom.style.top = this.xLocation*config.unitSize + 'px';
		entityDom.style.left = this.yLocation*config.unitSize + 'px';
		this.dom = entityDom;
	}
	redraw(){
		config.area.removeChild(this.dom);
	}
	getOption(){
		return this.option || {};
	}
}


////////////////////////////
//////////英雄//////////////
////////////////////////////
class Hero extends BaseEntity{
	constructor(x,y,option){
		option = option || {
			type:'hero',
			className:'hero',
			level:1,
			hp:1000,
			attack:10,
			defense:10,
			gold:0,
			exp:0,
			key:{
				yellow:0,
				blue:0,
				red:0
			}
		};
		super(x,y,option);
	}
	draw(){
		super.draw();
	}
	move(x,y){
		this.xLocation += x;
		this.yLocation += y;
		this.draw();
	}
	attack(creep,callback){
		let result;
		let heroHp = this.option.hp;
		let creepHp = creep.option.hp;
		while(heroHp>0 && creepHp>0){
			creepHp -= this.option.attack-creep.option.defense;
			heroHp -= creep.option.attack-this.option.defense;
		}
		if(heroHp <= 0){
			result = -1;
		}else{
			result = 1;
			this.option.hp = heroHp;
			this.option.gold += creep.option.gold;
			this.option.exp += creep.option.exp;
		}
		if(callback && typeof(callback) === 'function') callback.call(null,result);
		return result;
	}
	/////////////////////
	///-1 异常///////////
	/// 0 正常并且提示///
	/// 1 无提示/////////
	/////////////////////
	getItem(item,callback){
		let result = {state:0};
		let LOOP = item.option.LOOP;
		for(let l in LOOP){
			let opt = LOOP[l];
			if(opt && typeof(opt) === 'object'){
				for(let o in opt){
					if(opt[o] && typeof(opt[o]) === 'number'){
						let temp = this.option[l][o] + opt[o];
						if(temp < 0){
							result.state = -1;  //数量不够
						}else{
							if(item.option.type === 'door') result.state = 1;
							this.option[l][o] = temp;
						}
					}else{
						this.option[l][o] = opt[o];
					}
				}
			}else if(opt && typeof(opt) === 'number'){
				this.option[l] += LOOP[l];
			}else{
				this.option[l] += LOOP[l];
			}

		}
		if(callback && typeof(callback) === 'function') callback.call(null,result);
		return result;
	}
}

////////////////////////////
//////////怪物//////////////
////////////////////////////
class Creep extends BaseEntity{
	constructor(x,y,creepName){
		let option = CreepAttr[creepName] || {};
		super(x,y,option);
	}
	draw(){
		super.draw();
	}
}

////////////////////////////
//////////道具//////////////
////////////////////////////
class Item extends BaseEntity{
	constructor(x,y,itemName){
		let option = ItemAttr[itemName] || {};
		super(x,y,option);
	}
	draw(){
		super.draw();
	}
}




////////////////////////////
//////////楼梯//////////////
////////////////////////////
class Stairway extends BaseEntity{
	constructor(x,y,type){
		//up 上楼 dn 下楼
		let option = {
			type:type,
			className:`stairway${type}`
		}
		super(x,y,option);
	}
	draw(){
		super.draw();
	}
}