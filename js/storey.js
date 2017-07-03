////////////////////////////
//////////关卡信息//////////
////////////////////////////
const StoreyAttr = {
	storey1 : [
		[0,203,0,100,0,0,0,0,0,0,0,0,0],
		[0,1,0,1,1,1,1,1,1,1,1,1,0],
		[0,1,100,0,1,0,0,0,0,0,0,1,0],
		[0,1,0,1,1,0,1,1,1,1,0,1,0],
		[0,1,0,1,1,0,1,0,1,1,0,1,0],
		[0,1,0,0,1,0,1,0,0,0,0,1,0],
		[0,1,1,1,1,0,1,1,1,1,1,1,0],
		[0,0,0,0,0,0,1,1,0,0,0,1,0],
		[0,1,1,1,1,1,1,0,0,1,0,1,0],
		[0,0,0,0,0,0,1,1,0,1,0,1,0],
		[0,1,1,1,1,0,1,1,0,1,0,1,0],
		[0,1,1,1,1,1,1,1,203,1,1,1,0],
		[0,0,0,0,0,0,200,201,202,0,0,0,0]
	]
}

const Storey = {
	StoreyEnum(num){
		switch(num){
			case 100 : return 'greenSlime';break; //100  --- 绿色史莱姆



			case 200 : return 'yellowKeys';break;   //道具  黄钥匙
			case 201 : return 'blueKeys';break;     //      蓝钥匙
			case 202 : return 'redKeys';break;      //      红钥匙
			case 203 : return 'yellowDoor';break;   //      黄门
			case 204 : return 'blueDoor';break;     //      蓝门
			case 205 : return 'redDoor';break;      //      红门


			case 400: return 'stairwayUp';break;         //其他  楼梯 上
			case 401: return 'stairwayDn';break;         //      楼梯 下
		}
	}
}


////////////////////////////
//////////怪物信息//////////
////////////////////////////
const CreepAttr = {
	greenSlime : {
		type:'Creep',
		build:'samll',
		name:'绿色史莱姆',
		className:'samll greenSlime',
		level:1,
		hp:50,
		attack:20,
		defense:1,
		gold:1,
		exp:1
	}
}

////////////////////////////
//////////道具信息//////////
////////////////////////////
const ItemAttr = {
	yellowKeys : {
		type : 'keys',
		build: 'samll',
		name:'黄钥匙',
		className:'keys yellow',
		LOOP:{
			key:{
				yellow:1
			}
		}
	},
	yellowDoor : {
		type : 'door',
		build: 'samll',
		name:'黄门',
		className:'door yellow',
		LOOP:{
			key:{
				yellow:-1
			}
		}
	},
	blueKeys : {
		type : 'Item',
		build: 'samll',
		name:'蓝钥匙',
		className:'keys blue',
		LOOP:{
			key:{
				blue:1
			}
		}
	},
	redKeys : {
		type : 'Item',
		build: 'samll',
		name:'红钥匙',
		className:'keys red',
		LOOP:{
			key:{
				red:1
			}
		}
	}
}
