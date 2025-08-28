<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-申请入会 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-member-apply" :style="{'--theme-color': themeColor}">
		<!-- 表单数据 -->
		<form class="component-member-apply-form">
			<view class="component-member-apply-form-item" v-for="(item, index) in applyField" :key="index">
				<!-- 标题 -->
				<view class="item-title">
					<text class="required" v-if="item.required == 1">*</text>
					<text class="text">{{item.label}}</text>
					<text class="tips" v-if="item.type == 'image' || item.type == 'cert' || item.type == 'video' || item.type == 'file'">（{{item.option}}）</text>
				</view>
				<!-- 文本字段 -->
				<block v-if="item.type == 'text'">
					<!-- 地址选择 -->
					<view class="item-input" @click="chooseLocation(index)" v-if="showType == 1 && item.field == 'address'">
						<view class="input text-ellipsis" v-if="item.value.address">{{item.value.address}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择{{item.label}}</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
					<!-- 文本框 -->
					<view class="item-input" :class="{disabled: item.disabled}" v-else>
						<input class="input" :disabled="item.disabled" type="text" v-model="item.value" :placeholder="item.option" placeholder-class="placeholder" />
					</view>
				</block>
				<!-- 数字字段 -->
				<block v-else-if="item.type == 'number'">
					<view class="item-input" :class="{disabled: item.disabled}">
						<input class="input" :disabled="item.disabled" type="number" :maxlength="(showType == 1 && item.field == 'mobile') ? 11 : -1" v-model="item.value" :placeholder="item.option" placeholder-class="placeholder" />
					</view>
					<view class="item-switch" @click="changeMobileAuth()" v-if="showType == 1 && item.field == 'mobile' && mobileAuth">
						<view class="switch-label">手机号是否对外</view>
						<view class="switch-box" :class="{'select': mobileAuth == 1}">
							<view class="round"></view>
						</view>
					</view>
				</block>
				<!-- 单选按钮 -->
				<block v-else-if="item.type == 'radio'">
					<view class="item-radio">
						<view class="radio" :class="{active: item.value == option}" v-for="(option, num) in getOption(item.option)" :key="num" @click="selectRadio(index, option)">
							<image src="/static/select.png" mode="aspectFit"></image>
							<text>{{option}}</text>
						</view>
					</view>
				</block>
				<!-- 复选按钮 -->
				<block v-else-if="item.type == 'checkbox'">
					<view class="item-radio">
						<view class="radio" :class="{active: item.value.includes(option)}" v-for="(option, num) in getOption(item.option)" :key="num" @click="selectCheckbox(index, option)">
							<image src="/static/select.png" mode="aspectFit"></image>
							<text>{{option}}</text>
						</view>
					</view>
				</block>
				<!-- 下拉列表 -->
				<block v-else-if="item.type == 'select'">
					<!-- 会员级别 -->
					<view class="item-input" :class="{disabled: item.disabled}" @click="openSelectPicker(index)" v-if="showType == 1 && item.field == 'member_level_id'">
						<view class="input text-ellipsis" v-if="item.value">{{getMemberLevelName(item.value)}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择{{item.label}}</view>
						<image class="icon" src="/static/right.png" mode="aspectFit" v-if="!item.disabled"></image>
					</view>
					<!-- 行业分类 -->
					<view class="item-input" @click="openSelectPicker(index)" v-else-if="showType == 1 && item.field == 'industry_category_id'">
						<view class="input text-ellipsis" v-if="item.value">{{getIndustryName(item.value)}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择{{item.label}}</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
					<!-- 籍贯 -->
					<view class="item-input" @click="openSelectPicker(index)" v-else-if="showType == 1 && item.field == 'native_place'">
						<view class="input text-ellipsis" v-if="item.value">{{item.value}}</view>
						<view class="input placeholder text-ellipsis" v-else>{{item.option}}</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
					<!-- 下拉列表 -->
					<view class="item-input" @click="openSelectPicker(index)" v-else>
						<view class="input text-ellipsis" v-if="item.value">{{item.value}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择{{item.label}}</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
				</block>
				<!-- 日期字段 -->
				<block v-else-if="item.type == 'date'">
					<view class="item-input" @click="openDatePicker(index)">
						<view class="input text-ellipsis" v-if="item.value">{{item.value}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择{{item.label}}</view>
						<image class="icon" src="/static/date.png" mode="aspectFit"></image>
					</view>
				</block>
				<!-- 时间字段 -->
				<block v-else-if="item.type == 'time'">
					<view class="item-input" @click="openTimePicker(index)">
						<view class="input text-ellipsis" v-if="item.value">{{item.value}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择{{item.label}}</view>
						<image class="icon" src="/static/time.png" mode="aspectFit"></image>
					</view>
				</block>
				<!-- 日期时间 -->
				<block v-else-if="item.type == 'datetime'">
					<uni-datetime-picker v-model="item.value">
						<view class="item-input">
							<view class="input text-ellipsis" v-if="item.value">{{item.value}}</view>
							<view class="input placeholder text-ellipsis" v-else>请选择{{item.label}}</view>
							<image class="icon" src="/static/date.png" mode="aspectFit"></image>
						</view>
					</uni-datetime-picker>
				</block>
				<!-- 文本域 -->
				<block v-else-if="item.type == 'textarea'">
					<view class="item-input" @click="toEditor(index)" v-if="showType == 1 && item.field == 'introduce_content'">
						<view class="input text-ellipsis" v-if="item.value">{{getEditorText(item.value) || ('编辑' + item.label)}}</view>
						<view class="input placeholder text-ellipsis" v-else>{{item.option}}</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
					<view class="item-input" @click="toEditor(index)" v-else-if="showType == 2 && item.field == 'company_introduction'">
						<view class="input text-ellipsis" v-if="item.value">{{getEditorText(item.value) || ('编辑' + item.label)}}</view>
						<view class="input placeholder text-ellipsis" v-else>{{item.option}}</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
					<view class="item-input" @click="toEditor(index)" v-else-if="showType == 3 && item.field == 'organize_introduction'">
						<view class="input text-ellipsis" v-if="item.value">{{getEditorText(item.value) || ('编辑' + item.label)}}</view>
						<view class="input placeholder text-ellipsis" v-else>{{item.option}}</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
					<view class="item-input" v-else>
						<textarea class="textarea" type="text" maxlength="-1" v-model="item.value" :placeholder="item.option" placeholder-class="placeholder" />
					</view>
				</block>
				<!-- 证书上传 -->
				<block v-else-if="item.type == 'cert'">
					<view class="item-input">
						<input class="input" type="text" v-model="item.value.name" placeholder="请输入姓名" placeholder-class="placeholder" />
					</view>
					<view class="item-input">
						<input class="input" type="text" v-model="item.value.number" placeholder="请输入证书编号" placeholder-class="placeholder" />
					</view>
					<view class="item-upload">
						<view class="upload-image" v-if="item.value.image" @click="previewImage(index)">
							<image class="image-select" :src="item.value.image" mode="aspectFill"></image>
							<image class="image-delete" src="/static/delete.png" mode="aspectFit" @click.stop="deleteImage(index)"></image>
						</view>
						<view class="upload-image" v-else @click="chooseImage(index, 1)">
							<view class="image-background"></view>
							<view class="image-choose">
								<view class="icon">
									<image src="/static/camera.png" mode="aspectFit"></image>
								</view>
								<view class="text">上传证书</view>
							</view>
						</view>
					</view>
				</block>
				<!-- 图片上传 -->
				<block v-else-if="item.type == 'image'">
					<!-- 单图上传 -->
					<view class="item-upload" v-if="(showType == 1 && item.field == 'avatar') || (showType == 2 && item.field == 'company_logo') || (showType == 3 && item.field == 'organize_logo')">
						<view class="upload-image" v-if="item.value" @click="previewImage(index)">
							<image class="image-select" :src="item.value" mode="aspectFill"></image>
							<image class="image-delete" src="/static/delete.png" mode="aspectFit" @click.stop="deleteImage(index)"></image>
						</view>
						<view class="upload-image" v-else @click="chooseImage(index, 1)">
							<view class="image-background"></view>
							<view class="image-choose">
								<view class="icon">
									<image src="/static/camera.png" mode="aspectFit"></image>
								</view>
								<view class="text">点击上传</view>
							</view>
						</view>
					</view>
					<!-- 多图上传 -->
					<view class="item-upload" v-else>
						<view class="upload-image" v-if="item.value && item.value.length > 0" v-for="(img, num) in item.value" :key="num" @click="previewImage(index, num)">
							<image class="image-select" :src="img" mode="aspectFill"></image>
							<image class="image-delete" src="/static/delete.png" mode="aspectFit" @click.stop="deleteImage(index, num)"></image>
						</view>
						<view class="upload-image" v-if="!item.value || item.value.length < 9" @click="chooseImage(index, 9)">
							<view class="image-background"></view>
							<view class="image-choose">
								<view class="icon">
									<image src="/static/camera.png" mode="aspectFit"></image>
								</view>
								<view class="text">上传图片</view>
							</view>
						</view>
					</view>
				</block>
				<!-- 视频上传 -->
				<block v-else-if="item.type == 'video'">
					<view class="item-upload">
						<view class="upload-image" v-if="item.value">
							<view class="image-video">
								<image class="video" src="/static/video.png" mode="aspectFill"></image>
							</view>
							<image class="image-delete" src="/static/delete.png" mode="aspectFit" @click="deleteVideo(index)"></image>
						</view>
						<view class="upload-image" v-else @click="chooseVideo(index)">
							<view class="image-background"></view>
							<view class="image-choose">
								<view class="icon">
									<image src="/static/camera.png" mode="aspectFit"></image>
								</view>
								<view class="text">上传视频</view>
							</view>
						</view>
					</view>
				</block>
				<!-- 文件上传 -->
				<block v-else-if="item.type == 'file'">
					<view class="item-files">
						<view class="files-upload flex align-items-center" v-if="!item.value || item.value.length < 9" @click="chooseFiles(index)">
							<view class="upload-icon" :style="{'background-image': 'url('+ iconUpload +')'}" v-if="iconUpload"></view>
							<view class="upload-info flex-item">
								<view class="info-title">点击上传</view>
								<view class="info-tips" v-if="item.value.length">已上传{{item.value.length}}/9，每个附件大小不能超过10M</view>
								<view class="info-tips" v-else>可上传9个，每个附件大小不能超过10M</view>
							</view>
						</view>
						<view class="files-list" v-if="item.value && item.value.length > 0">
							<view class="list-item flex align-items-center" v-for="(file, num) in item.value" :key="num">
								<view class="item-name flex-item">{{file.name}}</view>
								<image class="item-delete" src="/static/delete.png" mode="aspectFit" @click="deleteFiles(index, num)"></image>
							</view>
						</view>
					</view>
				</block>
			</view>
		</form>
		<!-- 单项选择框 -->
		<select-picker ref="selectPicker" :title="selectTitle" @onChange="pageChange" @confirm="changeSelectPicker"></select-picker>
		<!-- 省市区选择框 -->
		<address-picker ref="addressPicker" @onChange="pageChange" @confirm="changeSelectPicker"></address-picker>
		<!-- 日期选择框 -->
		<date-picker ref="datePicker" @onChange="pageChange" @confirm="changeDatePicker"></date-picker>
		<!-- 时间选择框 -->
		<time-picker ref="timePicker" @onChange="pageChange" @confirm="changeTimePicker"></time-picker>
	</view>
</template>

<script>
	import selectPicker from "@/pages/component/picker/select.vue"
	import addressPicker from "@/pages/component/picker/address.vue"
	import datePicker from "@/pages/component/picker/date.vue"
	import timePicker from "@/pages/component/picker/time.vue"
	import svgData from "@/common/svg.js"
	import { mapState } from "vuex"
	export default {
		name: "memberApply",
		props: ["showData", "showType", "mobileAuth"],
		components: {
			selectPicker,
			addressPicker,
			datePicker,
			timePicker,
		},
		data() {
			return {
				// 入会字段
				applyField: [],
				// 会员级别
				levelList: [],
				// 行业分类
				industryList: [],
				// 单选标题
				selectTitle: "",
			}
		},
		watch: {
			showData: {
				handler(value) {
					this.applyField = value || [];
				},
				immediate: true,
				deep: true
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconUpload: state => {
					return svgData.svgToUrl("upload", state.app.themeColor)
				}
			})
		},
		mounted() {
			if (this.showType == 1) {
				this.getIndustry()
				this.getMemberLevel()
			}
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.$emit("onChange", state)
			},
			// 获取选项数据
			getOption(option) {
				return option.split(",")
			},
			// 获取会员级别
			getMemberLevel(fn) {
				this.$util.request("member.level").then(res => {
					if (res.code == 1) {
						this.levelList = res.data
						if (fn) fn()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取会员级别 ', error)
				})
			},
			// 获取行业分类
			getIndustry(fn) {
				this.$util.request("member.industry").then(res => {
					if (res.code == 1) {
						this.industryList = res.data
						if (fn) fn()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取行业分类 ', error)
				})
			},
			// 获取会员级别名称
			getMemberLevelName(id) {
				for (let i in this.levelList) {
					if (this.levelList[i].id == id) return this.levelList[i].name
				}
			},
			// 获取行业分类
			getIndustryName(id) {
				for (let i in this.industryList) {
					if (this.industryList[i].id == id) return this.industryList[i].name
				}
			},
			// 选择单选
			selectRadio(index, option) {
				if (this.applyField[index].value == option) {
					this.applyField[index].value = ""
				} else {
					this.applyField[index].value = option
				}
			},
			// 选择复选
			selectCheckbox(index, option) {
				if (this.applyField[index].value.includes(option)) {
					this.$delete(this.applyField[index].value, this.applyField[index].value.indexOf(option))
				} else {
					this.applyField[index].value.push(option)
				}
			},
			// 选择图片
			chooseImage(index, limit = 9) {
				// #ifdef MP-WEIXIN
				uni.chooseMedia({
					count: Number(limit) > 1 ? (limit - this.applyField[index].value.length) : 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						let list = res.tempFiles.map(item => item.tempFilePath)
						if ((this.showType == 1 && this.applyField[index].field == "avatar") || (this.showType == 2 && this.applyField[index].field == 'company_logo') || (this.showType == 3 && this.applyField[index].field == 'organize_logo')) {
							this.applyField[index].value = list[0]
						} else if (this.applyField[index].type == "cert") {
							this.applyField[index].value.image = list[0]
						} else {
							this.applyField[index].value = [...this.applyField[index].value, ...list]
						}
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.chooseImage({
					count: Number(limit) > 1 ? (limit - this.applyField[index].value.length) : 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						let list = res.tempFilePaths
						if ((this.showType == 1 && this.applyField[index].field == "avatar") || (this.showType == 2 && this.applyField[index].field == 'company_logo') || (this.showType == 3 && this.applyField[index].field == 'organize_logo')) {
							this.applyField[index].value = list[0]
						} else if (this.applyField[index].type == "cert") {
							this.applyField[index].value.image = list[0]
						} else {
							this.applyField[index].value = [...this.applyField[index].value, ...list]
						}
					}
				});
				// #endif
			},
			// 删除图片
			deleteImage(i, j) {
				if ((this.showType == 1 && this.applyField[i].field == "avatar") || (this.showType == 2 && this.applyField[i].field == 'company_logo') || (this.showType == 3 && this.applyField[i].field == 'organize_logo')) {
					this.applyField[i].value = ""
				} else if (this.applyField[i].type == "cert") {
					this.applyField[i].value.image = ""
				} else {
					this.$delete(this.applyField[i].value, j)
				}
			},
			// 预览图片
			previewImage(i, j = 0) {
				let list = []
				if ((this.showType == 1 && this.applyField[i].field == "avatar") || (this.showType == 2 && this.applyField[i].field == 'company_logo') || (this.showType == 3 && this.applyField[i].field == 'organize_logo')) {
					list = [this.applyField[i].value]
				} else if (this.applyField[i].type == "cert") {
					list = [this.applyField[i].value.image]
				} else {
					list = this.applyField[i].value
				}
				uni.previewImage({
					urls: list,
					current: j
				});
			},
			// 选择视频
			chooseVideo(index) {
				// #ifdef MP-WEIXIN
				uni.chooseMedia({
					count: 1,
					mediaType: ['video'],
					sourceType: ['album', 'camera'],
					camera: 'back',
					success: (res) => {
						this.applyField[index].value = res.tempFiles[0].tempFilePath
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: (res) => {
						this.applyField[index].value = res.tempFilePath;
					}
				});
				// #endif
			},
			// 删除视频
			deleteVideo(index) {
				this.applyField[index].value = ""
			},
			// 选择文件
			chooseFiles(index) {
				// #ifdef MP-WEIXIN
				wx.chooseMessageFile({
					count: 9 - this.applyField[index].value.length,
					type: 'file',
					extension: ['.pdf', '.doc', '.docx', '.xls', '.xlsx'],
					success: (res) => {
						let list = []
						let exceed = []
						res.tempFiles.forEach(item => {
							if (parseFloat(item.size / 1024) <= 10240) {
								list.push({
									name: item.name,
									path: item.path,
								})
							} else {
								exceed.push(item.name)
							}
						})
						if (exceed.length) {
							uni.showToast({
								icon: "none",
								title: exceed.join("、") + "超过10M",
								duration: 1500
							})
						}
						this.applyField[index].value = [...this.applyField[index].value, ...list]
					}
				})
				// #endif
				// #ifdef H5
				let extensionLimit = ['.pdf', '.doc', '.docx', '.xls', '.xlsx']
				uni.chooseFile({
					count: 9 - this.applyField[index].value.length,
					type: "all",
					extension: extensionLimit,
					success: (res) => {
						let list = []
						let typeError = []
						let exceed = []
						res.tempFiles.forEach(item => {
							let extension = item.name.split('.')
							extension = extension[extension.length - 1]
							if (!extensionLimit.includes('.' + extension)) {
								typeError.push(item.name)
							} else if (parseFloat(item.size / 1024) <= 10240) {
								list.push({
									name: item.name,
									path: item.path,
								})
							} else {
								exceed.push(item.name)
							}
						})
						if (typeError.length) {
							uni.showModal({
								title: "提示",
								content: typeError.join("、") + "文件类型错误，请选择pdf、doc、docx、xls、xlsx格式文件",
								showCancel: false,
								confirmColor: this.themeColor,
								confirmText: "我知道了"
							})
						} else if (exceed.length) {
							uni.showModal({
								title: "提示",
								content: exceed.join("、") + "超过10M",
								showCancel: false,
								confirmColor: this.themeColor,
								confirmText: "我知道了"
							})
						} else this.applyField[index].value = [...this.applyField[index].value, ...list]
					}
				});
				// #endif
			},
			// 删除文件
			deleteFiles(i, j) {
				this.$delete(this.applyField[i].value, j)
			},
			// 选择下拉选项
			openSelectPicker(index) {
				if (this.applyField[index].disabled) return
				this.selectTitle = this.applyField[index].label
				if (this.showType == 1 && this.applyField[index].field == "member_level_id") {
					if (this.levelList.length) this.$refs.selectPicker.open(this.levelList, this.applyField[index].value, index)
					else {
						this.getMemberLevel(() => {
							this.$refs.selectPicker.open(this.levelList, this.applyField[index].value, index)
						})
					}
				} else if (this.showType == 1 && this.applyField[index].field == "industry_category_id") {
					if (this.industryList.length) this.$refs.selectPicker.open(this.industryList, this.applyField[index].value, index)
					else {
						this.getIndustry(() => {
							this.$refs.selectPicker.open(this.industryList, this.applyField[index].value, index)
						})
					}
				} else if (this.showType == 1 && this.applyField[index].field == "native_place") {
					this.$refs.addressPicker.open(this.applyField[index].value, index)
				} else {
					let list = this.applyField[index].option.split(",")
					this.$refs.selectPicker.open(list, this.applyField[index].value, index)
				}
			},
			// 改变下拉选项
			changeSelectPicker(value, index) {
				if (this.showType == 1 && this.applyField[index].field == "native_place") {
					this.applyField[index].value = value.province + "/" + value.city + "/" + value.area
				} else if (this.showType == 1 && (this.applyField[index].field == "member_level_id" || this.applyField[index].field == "industry_category_id")) {
					this.applyField[index].value = value.id
				} else {
					this.applyField[index].value = value
				}
			},
			// 打开地图选择位置
			chooseLocation(index) {
				uni.chooseLocation({
					success: (res) => {
						this.applyField[index].value = {
							latitude: res.latitude,
							longitude: res.longitude,
							name: res.name,
							address: res.address
						}
					}
				});
			},
			// 改变手机号对外状态
			changeMobileAuth() {
				const result = this.mobileAuth == 1 ? 2 : 1
				this.$emit("changeMobileAuth", result)
			},
			// 选择日期
			openDatePicker(index) {
				this.$refs.datePicker.open(this.applyField[index].value, index)
			},
			// 改变日期
			changeDatePicker(value, index) {
				this.applyField[index].value = value
			},
			// 选择时间
			openTimePicker(index) {
				this.$refs.timePicker.open(this.applyField[index].value, index)
			},
			// 改变时间
			changeTimePicker(value, index) {
				this.applyField[index].value = value
			},
			// 跳转编辑器页面
			toEditor(index) {
				this.$store.commit('app/setEditorContent', this.applyField[index].value)
				this.$util.toPage({
					mode: 1,
					path: `/pages/member/apply/editor?params=${index}`
				})
			},
			// 设置编辑器内容
			setEditorData(e) {
				this.applyField[e.params].value = e.content
			},
			// 提取富文本文字
			getEditorText(e) {
				if (e) return e.replace(/<[^>]+>/g, '')
				else return ""
			},
			// 获取表单数据
			getApplyField(fn) {
				fn(JSON.parse(JSON.stringify(this.applyField)))
			},
		},
	}
</script>

<style lang="scss">
	.component-member-apply {
		.component-member-apply-form {
			.component-member-apply-form-item {
				margin-top: 32rpx;

				&:first-child {
					margin-top: 0;
				}

				.item-title {
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;

					.required {
						color: #E60012;
					}

					.tips {
						font-size: 28rpx;
						font-weight: 400;
						color: #666666;
					}
				}

				.item-input {
					margin-top: 32rpx;
					display: flex;
					align-items: center;
					border-radius: 16rpx;
					background: #ffffff;

					&.disabled {
						.input {
							color: #ACADB7
						}
					}

					.input {
						color: #5A5B6E;
						font-size: 28rpx;
						height: 104rpx;
						line-height: 104rpx;
						flex: 1;
						padding: 0 32rpx;
					}

					.textarea {
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
						flex: 1;
						padding: 32rpx;
						height: 200rpx;
					}

					.placeholder {
						color: #ACADB7;
					}

					.icon {
						width: 32rpx;
						height: 32rpx;
						padding-right: 32rpx;
					}
				}

				.item-radio {
					display: flex;
					flex-wrap: wrap;
					margin-left: -26rpx;
					padding-top: 8rpx;

					.radio {
						border-radius: 8rpx;
						background: #ffffff;
						padding: 16rpx;
						margin-left: 26rpx;
						margin-top: 24rpx;
						display: flex;
						align-items: center;

						image {
							width: 24rpx;
							height: 24rpx;
							margin-right: 8rpx;
							display: none;
						}

						text {
							color: #ACADB7;
							font-size: 24rpx;
							line-height: 34rpx;
						}

						&.active {
							background: var(--theme-color);

							image {
								display: block;
							}

							text {
								color: #ffffff;
							}
						}
					}
				}

				.item-upload {
					display: flex;
					flex-wrap: wrap;
					padding-top: 8rpx;

					.upload-image {
						position: relative;
						width: 31%;
						height: 0;
						padding-top: 31%;
						margin-top: 24rpx;
						margin-right: 3.5%;

						&:nth-child(3n) {
							margin-right: 0;
						}

						.image-select {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							border-radius: 10rpx;
						}

						.image-video {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							border-radius: 10rpx;
							background: var(--theme-color);
							padding: 56rpx;
						}

						.image-delete {
							position: absolute;
							top: -16rpx;
							right: -16rpx;
							width: 48rpx;
							height: 48rpx;
						}

						.image-choose {
							position: absolute;
							top: 20rpx;
							left: 20rpx;
							right: 20rpx;
							bottom: 20rpx;
							z-index: 6;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							background: #ffffff;
							border-radius: 6rpx;

							.icon {
								width: 80rpx;
								height: 80rpx;
								padding: 18rpx;
								background: var(--theme-color);
								border-radius: 50%;
							}

							.text {
								margin-top: 16rpx;
								color: var(--theme-color);
								font-size: 28rpx;
								line-height: 40rpx;
							}
						}

						.image-background {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							z-index: 1;
							background: var(--theme-color);
							opacity: 0.08;
						}
					}
				}

				.item-files {
					.files-upload {
						position: relative;
						margin-top: 32rpx;
						border-radius: 16rpx;
						background: #FFF;
						padding: 52rpx;

						.upload-icon {
							width: 72rpx;
							height: 64rpx;
							background-size: 72rpx 64rpx;
						}

						.upload-info {
							margin-left: 32rpx;

							.info-title {
								color: var(--theme-color);
								font-size: 24rpx;
								line-height: 34rpx;
								letter-spacing: 1rpx;
							}

							.info-tips {
								margin-top: 8rpx;
								color: #BBBDBF;
								font-size: 24rpx;
								line-height: 34rpx;
							}
						}

						&:before {
							content: "";
							display: block;
							position: absolute;
							top: 20rpx;
							left: 20rpx;
							right: 20rpx;
							bottom: 20rpx;
							border-radius: 16rpx;
							border: 1px dashed #D4D6D9;
						}
					}

					.files-list {
						margin-top: 32rpx;
						border-radius: 16rpx;
						background: #FFF;
						padding: 36rpx 32rpx;

						.list-item {
							margin-top: 32rpx;

							&:first-child {
								margin-top: 0;
							}

							.item-name {
								color: #ACADB7;
								font-size: 28rpx;
								line-height: 40rpx;
							}

							.item-delete {
								margin-left: 20rpx;
								width: 32rpx;
								height: 32rpx;
							}
						}
					}
				}

				.item-switch {
					margin-top: 32rpx;
					display: flex;
					align-items: center;
					border-radius: 16rpx;
					background: #ffffff;
					padding: 32rpx;

					.switch-label {
						flex: 1;
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.switch-box {
						margin-left: 20rpx;
						width: 72rpx;
						height: 36rpx;
						padding: 2rpx;
						background: #D9D9D9;
						border-radius: 18rpx;
						transition: all .3s;

						.round {
							width: 32rpx;
							height: 32rpx;
							border-radius: 50%;
							background: #FFFFFF;
							margin-left: 0;
							transition: all .3s;
						}

						&.select {
							background: var(--theme-color);

							.round {
								margin-left: calc(100% - 32rpx);
							}
						}
					}
				}
			}
		}
	}
</style>