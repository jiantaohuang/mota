////////////////////////////
//////////地图//////////////
////////////////////////////
class GameMap{
	constructor(storeyNum){
		this.dom = config.area;  
		this.initLocation = {};  //英雄初始位置
		this.storeyNum = storeyNum;   //当前楼层
		this.storey = StoreyAttr[`storey${storeyNum}`] || []; 
		this.storeyList = new Map();
		this.storeyCreepList = new Map();
		this.storeyItemList = new Map();
		this.storeyOtherList = new Map();
		this.creepsMap = new Map();
		this.itemsMap = new Map();
		this.otherMap = new Map();
		if(this.storey){
			this.setStorey(storeyNum);
		}
	}
	/////////////////////////
	/// -1  异常、出界
	///  0  平地
	///  1  墙
	/////////////////////////
	isAction(x,y){
		let action = -1;
		if(this.storey[x]){
			action = this.storey[x][y];
		}
		if(undefined === action){
			action = -1;
		}
		return action;
	}
	setStorey(storeyNum){
		this.storeyList.set(`storey${storeyNum}`,this.storey);
		this.storeyCreepList.set(`storeyCreep${storeyNum}`,this.storeyCreep);
		this.storeyItemList.set(`storeyItem${storeyNum}`,this.storeyItem);
		this.storeyOtherList.set(`storeyOther${storeyNum}`,this.otherMap);
		this.draw();
	}
	getCreep(row,col){
		return this.creepsMap.get(`${row}-${col}`);
	}
	getItem(row,col){
		return this.itemsMap.get(`${row}-${col}`);
	}
	deleteCreep(row,col){
		this.getCreep(row,col).redraw();
		this.storey[row][col] = 0;
		return this.creepsMap.delete(`${row}-${col}`);
	}
	deleteItem(row,col){
		this.getItem(row,col).redraw();
		this.storey[row][col] = 0;
		return this.itemsMap.delete(`${row}-${col}`);
	}
	setStairway(type,callback){
		let result = 0;       //记录上下楼 数量
 		let curStoreyNum = this.storeyNum;
		if(type === 'Up'){
			curStoreyNum += 1;
		}else if(type === 'Dn'){
			curStoreyNum -= 1;
		}

		let storey = StoreyAttr[`storey${curStoreyNum}`];
		if(storey){
			result = curStoreyNum - this.storeyNum;
			this.storeyNum = curStoreyNum;
			this.storey = storey;
			this.setStorey(curStoreyNum);
			if(callback && typeof(callback) === 'function') callback.call(null,result);
		}
	}
	draw(){
		this.redraw();
		
		this.storey.map((line,row) => {
			line.map((value,col) => {
				let block = document.createElement('div');
				if(value === 9998) this.initLocation.dn = {row:row,col:col};
				if(value === 9999) this.initLocation.up = {row:row,col:col};
				if(value < 100){
					block.className = `block block${value}`;   
				}else{
					block.className = `block block0`;
					if(value < 200){
						this.drawCreep(row,col,Storey.StoreyEnum(value));
					}else if(value < 300){
						this.drawItem(row,col,Storey.StoreyEnum(value));
					}else if(value <400){

					}else if(value < 402){
						let type = Storey.StoreyEnum(value);
						let stairway = new Stairway(row,col,type);
						this.otherMap.set(`${row}-${col}`,stairway);
					}
				}
				block.style.top = row * config.unitSize +'px';
				block.style.left = col * config.unitSize +'px';
				this.dom.appendChild(block);
			})
		})
	}
	drawItem(row,col,type){
		let it = new Item(row,col,type);
		this.itemsMap.set(`${row}-${col}`,it);
	}
	drawCreep(row,col,type){
		let m = new Creep(row,col,type);
		this.creepsMap.set(`${row}-${col}`,m);
	}
	
	redraw(){
		this.dom.innerHTML = '';
	}
}




