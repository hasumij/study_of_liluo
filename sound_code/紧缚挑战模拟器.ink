# theme: dark
# author: 璃落




你在回家途中被绑架，你只有三个小时的时间进行逃生，请根据你的选择进行逃生，时间到达时如果没有解开全身束缚则游戏失败。同时，你体内的跳蛋震动强度将会逐步增加，从而带来不同程度的快感，当快感到达满值（560）时默认游戏失败。
注意：游戏的最终目的是得到更多的最终评分，而不是逃脱束缚哦，实际上根据设定的数值，除非触发特殊事件，否则在大部分情况下都是很难逃脱成功的。

+ [开始游戏] -> gift_selection
+ [设置] -> settings

== settings

# CLEAR
是否显示能力值：{ability_display}
是否显示天赋效果：{gift_display}
是否显示衣着效果：{close_display}
是否显示捆绑效果：{tie_display}

+ [显示/不显示状态值] -> ability_setting
+ [显示/不显示天赋效果] -> gift_setting
+ [显示/不显示衣着效果] -> close_setting
+ [显示/不显示捆绑效果] -> tie_setting
+ [全部显示] -> display
+ [全部隐藏] -> not_display
+ [开始游戏] -> gift_selection

= ability_setting
{ability_display == "yes":
~ ability_display = "no"
-> settings
- else:
~ ability_display = "yes"
-> settings
}
= gift_setting
{gift_display == "yes":
~ gift_display = "no"
-> settings
- else:
~ gift_display = "yes"
-> settings
}
= close_setting
{close_display == "yes":
~ close_display = "no"
-> settings
- else:
~ close_display = "yes"
-> settings
}
= tie_setting
{tie_display == "yes":
~ tie_display = "no"
-> settings
- else:
~ tie_display = "yes"
-> settings
}
= display
~ ability_display = "yes"
~ gift_display = "yes"
~ close_display = "yes"
~ tie_display = "yes"
-> settings
= not_display
~ ability_display = "no"
~ gift_display = "no"
~ close_display = "no"
~ tie_display = "no"
-> settings


== gift_selection

天赋选择阶段，请随机选择3-5种天赋

+ [选择3种天赋] -> three_gift
+ [选择4种天赋] -> four_gift
+ [选择5种天赋] -> five_gift

= three_gift
~ gift_number = 3
~ gift_event_position = -> start_select_gift_3
-> start_select_gift_3
= four_gift
~ gift_number = 4
~ gift_event_position = -> start_select_gift_4
-> start_select_gift_4
= five_gift
~ gift_number = 5
~ gift_event_position = -> start_select_gift_5
-> start_select_gift_5

== start_select_gift_3
你的第{!一|二|三}个天赋为：{!{~灵活的舌头(嘴部脱缚能力+2)->flexible_tongue|灵活的手指(手臂，手指脱缚能力+2)->flexible_finger|舞蹈演员(手臂，手指，腿部脱缚能力+2)->dancer}|{~天生丽质(突发失败事件概率+10%)->beautiful|天生媚骨(脱衣事件概率+10%)->sexy|冷静头脑(敏感程度-0.5)->calm}|{~敏感身体(敏感程度+0.5)->sensitive_body|娃娃脸(萌化事件概率+10%)->baby_face|口才(说服事件概率+5%)->eloquence|抖M(全部脱缚能力值-1)->very_m}}
-> gift_end

== start_select_gift_4
你的第{!一|二|三|四}个天赋为：{!{~敏感身体(敏感程度+0.5)->sensitive_body|娃娃脸(萌化事件概率+10%)->baby_face}|{~口才(说服事件概率+5%)->eloquence|抖M(全部脱缚能力值-1)->very_m}|{~天生丽质(突发失败事件概率+10%)->beautiful|天生媚骨(脱衣事件概率+10%)->sexy|冷静头脑(敏感程度-0.5)->calm}|{~灵活的舌头(嘴部脱缚能力+2)->flexible_tongue|灵活的手指(手臂，手指脱缚能力+2)->flexible_finger|舞蹈演员(手臂，手指，腿部脱缚能力+2)->dancer}}
-> gift_end
== start_select_gift_5
你的第{!一|二|三|四|五}个天赋为：{!{~口才(说服事件概率+5%)->eloquence|抖M(全部脱缚能力值-1)->very_m}|{~敏感身体(敏感程度+0.5)->sensitive_body|娃娃脸(萌化事件概率+10%)->baby_face}|{~天生丽质(突发失败事件概率+10%)->beautiful|天生媚骨(脱衣事件概率+10%)->sexy}|{~灵活的舌头(嘴部脱缚能力+2)->flexible_tongue|灵活的手指(手臂，手指脱缚能力+2)->flexible_finger}|{~冷静头脑(敏感程度-0.5)->calm|舞蹈演员(手臂，手指，腿部脱缚能力+2)->dancer}}
-> gift_end

== gift_end

天赋选择完成。

+ [衣着选择] -> clothes_selection

== clothes_selection

衣着选择阶段，请选择一套着装：

+ [可爱的jk制服(萌化事件概率+50%，脱衣事件概率+50%)] -> jk_clothes
+ [保守的女仆装(突发失败概率+10%，敏感程度-0.2)] -> maid_clothes
+ [普通的休闲装(敏感程度-0.1)] -> casual_clothes

== clothes_end

衣着选择完成

+ [束缚选择阶段] -> tie_selection

== tie_selection

束缚选择阶段

~ tie_event_position = -> tie_selection_1
+ [戴上眼罩(眼部束缚值+10，全部脱缚能力值-1)] -> blinder

== tie_selection_1

请选择口球种类
~ tie_event_position = -> tie_selection_2
+ [普通口球(嘴部束缚值+10)] -> common_ballgag
+ [马具型口球(嘴部束缚值+30，嘴部自由后触发呼救事件的概率+10%)] -> harness_ballgag
+ [深喉口球(嘴部束缚值+20，嘴部自由后触发呼救事件的概率-5%，敏感度-0.1)] -> deep_ballgag

== tie_selection_2

请选择手臂捆绑方式
~ tie_event_position = -> tie_selection_3
+ [日式紧缚(手臂束缚值+80，敏感度+0.1)] -> arm_tie_1
+ [五花大绑(手臂束缚值+100，无法触发手指自由事件)] -> arm_tie_2
+ [欧式紧缚(手臂束缚值+100，手臂脱缚能力-1)] -> arm_tie_3

== tie_selection_3

请选择手指捆绑方式
~ tie_event_position = -> tie_selection_4
+ [袜子(手指束缚值+1)] -> finger_tie_1
+ [胶带(手指束缚值+2)] -> finger_tie_2
+ [一起捆(手指束缚值+3)] -> finger_tie_all

== tie_selection_4

请选择身体捆绑方式
~ tie_event_position = -> tie_selection_5
+ [股绳(敏感度+0.2)] -> body_tie_1
+ [龟甲缚(敏感度+0.3)] -> body_tie_2

== tie_selection_5

请选择捆绑姿势
~ tie_event_position = -> tie_selection_6
+ [团缚(手臂脱缚能力值-1，双腿脱缚能力值-2，突发失败事件概率+10%，特殊姿势得分增量+50)] -> group_bound
+ [驷马(手臂脱缚能力值-4，双腿脱缚能力值-4，特殊姿势得分增量+80)] -> reverse_group_bound
+ [跳过] -> tie_selection_8

== tie_selection_6

请选择腿部捆绑方式
~ tie_event_position = -> tie_selection_7
+ [捆绑脚踝(双腿束缚值+40)] -> leg_tie_1

== tie_selection_7

~ tie_event_position = -> tie_selection_8
+ [捆绑膝盖上下(双腿束缚值+40)] -> leg_tie_2
+ [不捆] -> tie_selection_7

== tie_selection_8

~ tie_event_position = -> tie_selection_9
+ [捆绑大腿(双腿束缚值+40)] -> leg_tie_3
+ [不捆] -> tie_selection_8

== tie_selection_9

~ temp no_clothes_mode = RANDOM(1, 100/no_clothes_prob) //脱衣事件的随机数
~ temp string_mode = RANDOM(1, 100/string_prob) //收紧事件的随机数

~ event_position = -> tie_evaluation
~ tie_event_position = -> tie_evaluation
{no_clothes_mode == 1:
触发脱衣事件。-> no_clothes
}
{string_mode == 1:
触发收紧事件。
+ [将全身束缚收到最紧] -> tightness_3
}

是否继续收紧绳索
+ [就这样吧(紧缚程度不变)] -> tightness_1
+ [继续收紧(全部束缚值少量增加)] -> tightness_2
+ [收到最紧(全部束缚值大量增加——逃出不可能)] -> tightness_3

== tie_evaluation //难度评估

~ tie_difficulty = (tie_eye + tie_mouth) * 0.1 + tie_arm * 0.3 + tie_finger * 0.3 + tie_leg * 0.2 + tie_post * 0.1
~ sensitivity_difficulty = sensitivity
~ ability_difficulty = (untie_eye + untie_mouth) * 0.2 + untie_arm * 0.3 + untie_finger * 0.3 + untie_leg * 0.2
~ final_difficulty = tie_difficulty + sensitivity_difficulty * 10 + ability_difficulty * 10
当前束缚程度-难度值：{tie_difficulty}
当前敏感程度-难度值：{sensitivity_difficulty}
当前脱缚能力-难度值：{ability_difficulty}
难度值：{final_difficulty}

+ [开始逃脱]-> start_to_untie

== start_to_untie
第{10 - round + 1}回合（共10个回合）：
~ round = round - 1
~ event_position = -> start_to_untie
~ pleasant_sensation = pleasant_sensation + 10*sensitivity
//状态显示
状态显示(注意，如果回合数或快感水平达到极限则逃脱失败。但游戏目的为得到更高的最终评分，不一定要逃脱成功。)：
当前全身束缚值：
眼部束缚值:{tie_eye}
嘴部束缚值:{tie_mouth}
手臂束缚值:{tie_arm}
手指束缚值:{tie_finger}
双腿束缚值:{tie_leg}
当前脱缚能力值：
眼部脱缚能力值:{untie_eye}
嘴部脱缚能力值:{untie_mouth}
手臂脱缚能力值:{untie_arm}
手指脱缚能力值:{untie_finger}
双腿脱缚能力值:{untie_leg}
当前快感水平及敏感度：
当前敏感度:{sensitivity}
当前快感水平:{pleasant_sensation}({max_pleasant_sensation})
//失败判定
{round <= 0 or pleasant_sensation > max_pleasant_sensation:
-> failure
}
//成功判定
{tie_eye + tie_mouth + tie_arm + tie_finger + tie_leg <= 0:
成功逃脱
~ tie_eye = 0
~ tie_mouth = 0
~ tie_arm = 0
~ tie_finger = 0
~ tie_leg = 0
-> final_evaluation
}

//特殊事件前置条件判定
{tie_eye <= 0 and tie_mouth <= 0: //呼救
~ call_for_help_able = true
}
{tie_eye <= 0: //重获光明
~ eye_free_able = true
}
{tie_arm <= 0: //双手自由
~ arm_free_able = true
}
{tie_finger <= 0: //手指自由
~ finger_free_able = true
}
{tie_leg <= 0: //双腿自由
~ leg_free_able = true
}
{tie_mouth <= 0: //说服
~ persuade_able = true
}

//下一回合生效的特殊事件
{arm_free:
双手自由后，你抓紧时间解开了身上的其他捆绑(眼部束缚值清零，嘴部束缚值清零，手指束缚值清零，腿部束缚值清零)。
~ tie_eye = 0
~ tie_mouth = 0
~ tie_finger = 0
~ tie_leg = 0
}

{finger_free and reverse_group_bound and not arm_tie_2: //手指自由后解开驷马连接绳
手指自由后，你终于可以解开驷马的连接绳，得以伸展身体。
~ untie_arm  = untie_arm + 4
~ untie_finger = untie_finger + 4
~ untie_leg = untie_leg + 4
-> start_to_untie
}

~ temp eye_free_mode = RANDOM(1, 100/eye_free_prob) //重获光明事件的随机数
~ temp call_for_help_mode = RANDOM(1, 100/call_for_help_prob) //呼救事件的随机数
~ temp arm_free_mode = RANDOM(1, 100/arm_free_prob) //手臂自由事件的随机数
~ temp finger_free_mode = RANDOM(1, 100/finger_free_prob) //手指自由事件的随机数
~ temp leg_free_mode = RANDOM(1, 100/leg_free_prob) //双腿自由事件的随机数
~ temp sudden_lose_mode = RANDOM(1, 100/sudden_lose_prob) //突发失败事件的随机数
~ temp very_cute_mode = RANDOM(1, 100/very_cute_prob) //萌化事件的随机数
~ temp persuade_mode = RANDOM(1, 100/persuade_prob) //说服事件的随机数

//特殊事件判定
{arm_free_able == true and arm_free_mode == 1 and arm_free_flag == false: //双手自由
-> arm_free
}
{eye_free_able == true and eye_free_mode == 1 and eye_free_flag == false: //重获光明
-> eye_free
}
{finger_free_able == true and finger_free_mode == 1 and finger_free_flag == false: //手指自由
-> finger_free
}
{leg_free_able == true and leg_free_mode == 1 and leg_free_flag == false: //双腿自由
-> leg_free
}
{sudden_lose_able == true and sudden_lose_mode == 1 and sudden_lose_flag == false: //突发失败
-> sudden_lose
}
{call_for_help_able == true and call_for_help_mode == 1 and call_for_help_flag == false: //呼救
-> call_for_help
}
{very_cute_able == true and very_cute_mode == 1 and very_cute_flag == false: //萌化
-> very_cute
}
{persuade_able == true and persuade_mode == 1 and persuade_flag == false: // 说服
-> persuade
}

//挣扎
{tie_eye > 0:
+ [试图摘下眼罩] -> struggle_eye
}
{tie_mouth > 0:
+ [试图摘下口塞] -> struggle_mouth
}
{tie_arm > 0:
+ [挣扎手臂] -> struggle_arm
}
{tie_finger > 0:
+ [挣扎手指] -> struggle_finger
}
{tie_leg > 0:
+ [挣扎双腿] -> struggle_leg
}

= struggle_eye
~ tie_eye = tie_eye - untie_eye
-> start_to_untie
= struggle_mouth
~ tie_mouth = tie_mouth - untie_mouth
-> start_to_untie
= struggle_arm
~ tie_arm = tie_arm - untie_arm
-> start_to_untie
= struggle_finger
~ tie_finger = tie_finger - untie_finger
-> start_to_untie
= struggle_leg
~ tie_leg = tie_leg - untie_leg
-> start_to_untie

== success_absolutely

~ tie_eye = 0
~ tie_mouth = 0
~ tie_arm = 0
~ tie_finger = 0
~ tie_leg = 0

+ [最终评价] -> final_evaluation

== failure

逃脱失败

{tie_eye < 0:
~ tie_eye = 0
}
{tie_mouth < 0:
~ tie_mouth = 0
}
{tie_arm < 0:
~ tie_arm = 0
}
{tie_finger < 0:
~ tie_finger = 0
}
{tie_leg < 0:
~ tie_leg = 0
}

+ [最终评价] -> final_evaluation

== final_evaluation

最终评价：
最终得分=难度值-(当前眼部束缚值x0.1+当前嘴部束缚值x0.1+当前手臂束缚值x0.3+当前手指束缚值x0.3+当前双腿束缚值x0.2)
~ final_score = final_difficulty - (tie_eye*0.1 + tie_mouth*0.1 + tie_arm*0.3 + tie_finger*0.3 + tie_leg*0.2)
最终得分={final_difficulty}-({tie_eye}x0.1+{tie_mouth}x0.1+{tie_arm}x0.3+{tie_finger}x0.3+{tie_leg}x0.2)={final_score}

-> END

//剩余回合数
VAR round = 10

//最终得分
VAR final_score=0

//难度值
VAR tie_difficulty = 0 //束缚程度-难度值
VAR sensitivity_difficulty = 0 //敏感程度-难度值
VAR ability_difficulty = 0 //脱缚能力-难度值
VAR final_difficulty = 0 //总难度值

//定位事件发生时的回合
VAR event_position = -> settings 

//快感值
VAR pleasant_sensation = 0 //当前快感值
VAR max_pleasant_sensation = 560 //极限快感值

//显示设置的参数
VAR ability_display = "yes"
VAR gift_display = "yes"
VAR close_display = "yes"
VAR tie_display = "yes"

//脱缚能力值，敏感度
VAR untie_mouth = 2
VAR untie_eye = 5
VAR untie_arm = 10
VAR untie_finger = 1
VAR untie_leg = 10
VAR sensitivity = 1

//束缚值，特殊姿势增量，松紧程度
VAR tie_eye = 0
VAR tie_mouth = 0
VAR tie_arm = 0
VAR tie_finger = 0
VAR tie_leg = 0 //下身束缚值
VAR tie_post = 0 //特殊姿势增量
VAR tie_tightness = 0.5 //0-较松；1-正常；2-较紧；4-最紧

//天赋
VAR gift_number = 3 //天赋数量
VAR gift_event_position = -> start_select_gift_3
== flexible_tongue //灵活的舌头
~ untie_mouth = untie_mouth + 2
~ gift_number = gift_number - 1
{gift_number == 0:
-> gift_end
- else:
-> gift_event_position
}
== flexible_finger //灵活的手指
~ untie_finger = untie_finger + 2
~ untie_arm = untie_arm + 2
~ gift_number = gift_number - 1
{gift_number == 0:
-> gift_end
- else:
-> gift_event_position
}
== dancer //舞蹈演员
~ untie_finger = untie_finger + 2
~ untie_arm = untie_arm + 2
~ untie_leg = untie_leg + 2
~ gift_number = gift_number - 1
{gift_number == 0:
-> gift_end
- else:
-> gift_event_position
}
== beautiful //天生丽质
~ sudden_lose_prob = sudden_lose_prob + 10
~ gift_number = gift_number - 1
{gift_number == 0:
-> gift_end
- else:
-> gift_event_position
}
== sexy //天生媚骨
~ no_clothes_prob = no_clothes_prob + 10
~ gift_number = gift_number - 1
{gift_number == 0:
-> gift_end
- else:
-> gift_event_position
}
== calm //冷静头脑
~ sensitivity = sensitivity - 0.5
~ gift_number = gift_number - 1
{gift_number == 0:
-> gift_end
- else:
-> gift_event_position
}
== sensitive_body //敏感身体
~ sensitivity = sensitivity + 0.5
~ gift_number = gift_number - 1
{gift_number == 0:
-> gift_end
- else:
-> gift_event_position
}
== baby_face //娃娃脸
~ very_cute_prob = very_cute_prob + 10
~ gift_number = gift_number - 1
{gift_number == 0:
-> gift_end
- else:
-> gift_event_position
}
== eloquence //口才
~ persuade_prob = persuade_prob + 10
~ gift_number = gift_number - 1
{gift_number == 0:
-> gift_end
- else:
-> gift_event_position
}
== very_m //抖M
~ untie_eye = untie_eye - 1
~ untie_mouth = untie_mouth - 1
~ untie_finger = untie_finger - 1
~ untie_arm = untie_arm - 1
~ untie_leg = untie_leg - 1
~ gift_number = gift_number - 1
{gift_number == 0:
-> gift_end
- else:
-> gift_event_position
}

//衣着套装
== jk_clothes //可爱的jk制服
~ very_cute_prob = very_cute + 50
~ no_clothes_prob = no_clothes + 50
-> clothes_end
== maid_clothes //保守的女仆装
~ sudden_lose_prob = sudden_lose_prob + 10
~ sensitivity = sensitivity - 0.2
-> clothes_end
== casual_clothes //普通的休闲装
~ sensitivity = sensitivity - 0.2
-> clothes_end

//捆绑过程的特殊事件
VAR no_clothes_prob = 1 //脱衣概率
== no_clothes
~ sensitivity = sensitivity + 0.2
~ very_cute_able = false
-> event_position
VAR string_prob = 1  //收紧概率

//束缚选择
VAR tie_event_position = -> tie_selection
//眼罩
== blinder //眼罩
~ tie_eye = tie_eye + 10
~ untie_eye = untie_eye - 1
~ untie_mouth = untie_mouth - 1
~ untie_finger = untie_finger - 1
~ untie_arm = untie_arm - 1
~ untie_leg = untie_leg - 1
~ gift_number = gift_number - 1
-> tie_event_position
//口球
== common_ballgag //普通口球
~ tie_mouth = tie_mouth + 10
-> tie_event_position
== harness_ballgag //马具型口球
~ tie_mouth = tie_mouth + 30
~ call_for_help_prob = call_for_help_prob + 10
-> tie_event_position
== deep_ballgag //深喉口球
~ tie_mouth = tie_mouth + 20
~ call_for_help_prob = call_for_help_prob - 5
~ sensitivity = sensitivity - 0.1
-> tie_event_position
//手臂捆绑
== arm_tie_1 //日式紧缚
~ tie_arm = tie_arm + 80
~ sensitivity = sensitivity + 0.1
-> tie_event_position
== arm_tie_2 //五花大绑
~ tie_arm = tie_arm + 100
~ finger_free_able = false
-> tie_event_position
== arm_tie_3 //欧式捆绑
~ tie_arm = tie_arm + 100
~ untie_arm = untie_arm - 1
-> tie_event_position
//手指捆绑
== finger_tie_1 //袜子
~ tie_finger = tie_finger + 1
-> tie_event_position
== finger_tie_2 //胶带
~ tie_finger = tie_finger + 2
-> tie_event_position
== finger_tie_all
~ tie_finger = tie_finger + 3
-> tie_event_position
//身体捆绑
== body_tie_1 //股绳
~ sensitivity = sensitivity + 0.2
-> tie_event_position
== body_tie_2 //龟甲缚
~ sensitivity = sensitivity + 0.3
-> tie_event_position
//下身捆绑
== leg_tie_1 //脚踝
~ tie_leg = tie_leg + 40
-> tie_event_position
== leg_tie_2 //膝盖
~ tie_leg = tie_leg + 40
-> tie_event_position
== leg_tie_3 //大腿
~ tie_leg = tie_leg + 40
-> tie_event_position
//特殊姿势
== group_bound //团缚
~ untie_arm = untie_arm - 1
~ untie_leg = untie_leg - 2
~ sudden_lose_prob = sudden_lose_prob + 10
~ tie_post = tie_post + 50
-> tie_event_position
== reverse_group_bound //驷马
~ untie_arm = untie_arm - 4
~ untie_leg = untie_leg - 4
~ tie_post = tie_post + 80
-> tie_event_position
//继续收紧
== tightness_1 //正常
-> tie_event_position
== tightness_2 //较紧
~ tie_eye = tie_eye * 2
~ tie_mouth = tie_mouth + 2
~ tie_arm = tie_arm + 5
~ tie_finger = tie_finger + 1
~ tie_leg = tie_leg + 5
-> tie_event_position
== tightness_3 //最紧
~ tie_eye = tie_eye * 2
~ tie_mouth = tie_mouth * 2
~ tie_arm = tie_arm * 2
~ tie_finger = tie_finger * 1
~ tie_leg = tie_leg * 2
-> tie_event_position

//脱缚过程的特殊事件
VAR eye_free_prob = 100 //重获光明概率
VAR eye_free_flag = false //是否已经触发重获光明事件的信号
VAR eye_free_able = false //是否允许触发重获光明事件
== eye_free
你重获光明了
~ eye_free_flag = true
~ untie_eye = untie_eye + 1
~ untie_mouth = untie_mouth + 1
~ untie_finger = untie_finger + 1
~ untie_arm = untie_arm + 1
~ untie_leg = untie_leg + 1
~ gift_number = gift_number + 1
-> event_position
VAR call_for_help_prob = 10 //呼救概率
VAR call_for_help_flag = false //是否已经触发呼救事件的信号
VAR call_for_help_able = false //是否允许触发呼救事件
VAR call_for_help_success_prob = 50 //呼救后直接成功的概率
== call_for_help
你尝试呼救
~ call_for_help_flag = true
~ temp success_prob = RANDOM(1, 100/call_for_help_success_prob)
{success_prob == 1:
你的呼救引来了路人的注意，逃脱成功
-> success_absolutely
- else:
你的呼救没有引来任何帮助，请继续逃脱
-> event_position
}
VAR arm_free_prob = 100 //手臂自由概率
VAR arm_free_flag = false //是否已经触发手臂自由事件的信号
VAR arm_free_able = false //是否允许触发手臂自由事件
== arm_free
你的手臂自由了
~ arm_free_flag = true
-> event_position
VAR finger_free_prob = 100 //手指自由概率
VAR finger_free_flag = false //是否已经触发手指自由事件的信号
VAR finger_free_able = false //是否允许触发手指自由事件
== finger_free
你的手指自由了
~ finger_free_flag = true
~ untie_leg = untie_leg + 2
-> event_position
VAR leg_free_prob = 100 //双腿自由概率
VAR leg_free_flag = false //是否已经触发双腿自由事件的信号
VAR leg_free_able = false //是否允许触发双腿自由事件
== leg_free
你的双腿自由了
~ pleasant_sensation = pleasant_sensation * 0.7
-> event_position
VAR sudden_lose_prob = 5 //突发失败概率
VAR sudden_lose_flag = false //是否已经触发突发失败事件的信号
VAR sudden_lose_able = true //是否允许触发双腿自由事件
== sudden_lose
你挣扎的样子让监控中观察的绑架者控制不住，她不顾承诺强行将你带走了。
+ [最终评价] -> final_evaluation
VAR very_cute_prob = 1 //萌化概率
VAR very_cute_flag = false //是否已经触发萌化事件的信号
VAR very_cute_able = true //是否允许触发萌化事件
== very_cute
由于你挣扎的样子太萌了，让绑架者产生了羞愧的感觉，她最终决定放了你。
-> success_absolutely
VAR persuade_prob = 1 //说服概率
VAR persuade_flag = false //是否已经触发说服事件的信号
VAR persuade_able = false //是否允许触发说服事件
== persuade
由于你晓之以理动之以情，绑架者被你成功说动了。
-> success_absolutely
















































