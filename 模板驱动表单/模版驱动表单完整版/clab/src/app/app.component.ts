import {Component} from '@angular/core';

/**
 * 表单
 * 表单是商业应用的支柱，你用它来执行登录、求助、下单、预订机票、安排会议，以及不计其数的其它数据录入任务。
 * 在开发表单时，创建数据方面的体验是非常重要的，它能指引用户明细、高效的完成工作流程。
 * 开发表单需要设计能力（那超出了本章的范围），而框架支持双向数据绑定、变更检测、验证和错误处理，而本章你将会学到它们。
 * 这个页面演示了如何从草稿构建一个简单的表单。这个过程中你将学会如何：
 * 1.用组件和模板构建 Angular 表单
 * 2.用 ngModel 创建双向数据绑定，以读取和写入输入控件的值
 * 3.跟踪状态的变化，并验证表单控件
 * 4.使用特殊的 CSS 类来跟踪控件的状态并给出视觉反馈
 * 5.向用户显示验证错误提示，以及启用/禁用表单控件
 * 6.使用模板引用变量在 HTML 元素之间共享信息
 *
 * 模板驱动表单 (template-driven forms)
 * 通常，使用 Angular 模板语法编写模板，结合本章所描述的表单专用指令和技术来构建表单。
 * 你还可以使用响应式（也叫模型驱动）的方式来构建表单。不过本章中只介绍模板驱动表单。
 * 利用 Angular 模板，可以构建几乎所有表单 — 登录表单、联系人表单…… 以及任何的商务表单。
 * 可以创造性的摆放各种控件、把它们绑定到数据、指定校验规则、显示校验错误、有条件的禁用或 启用特定的控件、触发内置的视觉反馈等等，不胜枚举。
 * 它用起来很简单，这是因为 Angular 处理了大多数重复、单调的任务，这让你可以不必亲自操刀、身陷其中。
 * 你将学习构建如下的“模板驱动”表单：
 * 这里是英雄职业介绍所，使用这个表单来维护候选英雄们的个人信息。每个英雄都需要一份工作。
 * 公司的使命就是让合适的英雄去应对恰当的危机！
 * 表单中的三个字段，其中两个是必填的。必填的字段在左侧有个绿色的竖条，方便用户分辨哪些是必填项。
 * 如果删除了英雄的名字，表单就会用醒目的样式把验证错误显示出来。
 *
 * 创建表单组件
 * Angular 表单分为两部分：基于 HTML 的模板和组件类，用来程序处理数据和用户交互。
 * 先从组件类开始，是因为它可以简要说明英雄编辑器能做什么。
 *
 * NgForm 指令
 * 什么是 NgForm 指令？ 但你明明没有添加过NgForm指令啊！
 * Angular 替你做了。Angular 会在 <form> 标签上自动创建并附加一个 NgForm 指令。
 * NgForm 指令为 form 增补了一些额外特性。
 * 它会控制那些带有 ngModel 指令和 name 属性的元素，监听他们的属性（包括其有效性）。
 * 它还有自己的 valid 属性，这个属性只有在它包含的每个控件都有效时才是真。
 *
 * 注意，<input> 标签还添加了 name 属性 (attribute)，并设置为 "name"，表示英雄的名字。
 * 使用任何唯一的值都可以，但使用具有描述性的名字会更有帮助。
 * 当在表单中使用 [(ngModel)] 时，必须要定义 name 属性。
 * 在内部，Angular 创建了一些 FormControl，并把它们注册到 NgForm 指令，再将该指令附加到 <form> 标签。
 * 注册每个 FormControl 时，使用 name 属性值作为键值。
 *
 * 每个 input 元素都有 id 属性，label 元素的 for 属性用它来匹配到对应的输入控件。
 * 每个 input 元素都有 name 属性，Angular 表单用它注册控件。
 *
 * 通过 ngModel 跟踪修改状态与有效性验证
 * 在表单中使用 ngModel 可以获得比仅使用双向数据绑定更多的控制权。
 * 它还会告诉你很多信息：用户碰过此控件吗？它的值变化了吗？数据变得无效了吗？
 * NgModel 指令不仅仅跟踪状态。
 * 它还使用特定的 Angular CSS 类来更新控件，以反映当前状态。
 * 可以利用这些 CSS 类来修改控件的外观，显示或隐藏消息。
 * 状态 为真时的 CSS 类  为假时的 CSS 类
 * 控件被访问过。  ng-touched  ng-untouched
 * 控件的值变化了。 ng-dirty  ng-pristine
 * 控件的值有效。  ng-valid  ng-invalid
 *
 * 往姓名 <input> 标签上添加名叫 spy 的临时模板引用变量， 然后用这个 spy 来显示它上面的所有 CSS 类。
 * (ng-valid | ng-invalid)这一对是最有趣的部分，因为当数据变得无效时，
 * 你希望发出强力的视觉信号， 还想要标记出必填字段。可以通过加入自定义 CSS 来提供视觉反馈。
 *
 * 添加用于视觉反馈的自定义 CSS
 * 在新建的 forms.css 文件中，添加两个样式来实现这一效果。把这个文件添加到项目中，与 index.html 相邻。
 * 修改 index.html 中的 <head>，以包含这个样式表：
 * <link rel="stylesheet" href="assets/forms.css">
 *
 * 显示和隐藏验证错误信息
 * 你还能做的更好。“Name” 输入框是必填的，清空它会让左侧的条变红。
 * 这表示某些东西是错的，但用户不知道错在哪里，或者如何纠正。
 * 可以借助 ng-invalid 类来给出有用的提示。
 * 要达到这个效果，在 <input> 标签中添加：
 * 1.模板引用变量
 * 2.“is required”消息，放在邻近的 <div> 元素中，只有当控件无效时，才显示它。
 * 下面这个例子中把一条错误信息添加到了name输入框中。
 * 模板引用变量可以访问模板中输入框的 Angular 控件。
 * 这里，创建了名叫 name 的变量，并且赋值为 "ngModel"。
 * 为什么是 “ngModel”？
 * 指令的 exportAs 属性告诉 Angular 如何链接模板引用变量到指令。
 * 这里把 name 设置为 ngModel 是因为 ngModel 指令的 exportAs 属性设置成了 “ngModel”。
 *
 * 你把 div 元素的 hidden 属性绑定到 name 控件的属性，这样就可以控制“姓名”字段错误信息的可见性了。
 *
 * 上例中，当控件是有效的 (valid) 或全新的 (pristine) 时，隐藏消息。
 * “全新的”意味着从它被显示在表单中开始，用户还从未修改过它的值。
 *
 * 这种用户体验取决于开发人员的选择。有些人会希望任何时候都显示这条消息。
 * 如果忽略了 pristine 状态，就会只在值有效时隐藏此消息。
 * 如果往这个组件中传入全新（空）的英雄，或者无效的英雄，将立刻看到错误信息 —— 虽然你还啥都没做。
 *
 * 有些人会为这种行为感到不安。它们希望只有在用户做出无效的更改时才显示这个消息。
 * 如果当控件是“全新”状态时也隐藏消息，就能达到这个目的。 在往表单中添加新英雄时，将看到这种选择的重要性。
 *
 * 英雄的第二人格是可选项，所以不用改它。
 * 英雄的超能力选项是必填的。
 * 只要愿意，可以往 <select> 上添加相同的错误处理。
 * 但没有必要，这个选择框已经限制了“超能力”只能选有效值。
 *
 * 现在，你要在这个表单中添加新的英雄。 在表单的底部放置“New Hero（新增英雄）”按钮，并把它的点击事件绑定到 newHero 组件。
 * 再次运行应用，点击 New Hero 按钮，表单被清空了。
 * 输入框左侧的必填项竖条是红色的，表示 name 和 power 属性是无效的。
 * 这可以理解，因为有一些必填字段。
 * 错误信息是隐藏的，因为表单还是全新的，还没有修改任何东西。
 *
 * 输入名字，再次点击 New Hero 按钮。
 * 这次，出现了错误信息！为什么？你不希望显示新（空）的英雄时，出现错误信息。
 *
 * 使用浏览器工具审查这个元素就会发现，这个 name 输入框并不是全新的。
 * 表单记得你在点击 New Hero 前输入的名字。
 * 更换了英雄对象并不会重置控件的“全新”状态。
 *
 * 你必须清除所有标记，在调用 newHero() 方法后调用表单的 reset() 方法即可。
 *
 * 使用 ngSubmit 提交该表单
 * 在填表完成之后，用户还应该能提交这个表单。
 * “Submit（提交）”按钮位于表单的底部，它自己不做任何事，但因为有特殊的 type 值 (type="submit")，所以会触发表单提交。
 * 现在这样仅仅触发“表单提交”是没用的。
 * 要让它有用，就要把该表单的 ngSubmit 事件属性绑定到英雄表单组件的 onSubmit() 方法上：
 * <form (ngSubmit)="onSubmit()" #heroForm="ngForm">
 * 你已经定义了一个模板引用变量 #heroForm，并且把赋值为“ngForm”。 现在，就可以在“Submit”按钮中访问这个表单了。
 * 你要把表单的总体有效性通过 heroForm 变量绑定到此按钮的 disabled 属性上，代码如下：
 * <button type="submit" class="btn btn-success" [disabled]="!heroForm.form.valid">Submit</button>
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
