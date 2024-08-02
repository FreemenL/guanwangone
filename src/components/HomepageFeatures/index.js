import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '智慧订单系统',
    Svg: `https://odoocdn.com/openerp_website/static/src/img/apps/home/device_shopfloor.webp`,
    description: (
      <>
        1. 全面掌控生产动态: 帮助企业主实时了解订单状态和生产进度，确保订单按时完成。<br/>
        2. 优化资源配置:通过系统优化生产计划和库存管理，减少资源浪费，提高资源利用率。<br/>
        3. 提升生产效率：自动化排程和监控功能减少重复工作和人为错误，提高生产效率<br/>
      </>
    ),
  },
  {
    title: '智慧仓库管理系统',
    Svg: `https://v3.ice.work/assets/images/splash-68f23214ef7cddd2d9afc925903a326c.png`,
    description: (
      <>
         1. 功能包括: 收货、上架、补货、移库、拣货、复核、退货、盘点、资料维护、运营监控、数据分析等一体化功能和服务.<br/>
         2. 前沿技术: 采用物联网、大数据分析、人工智能等技术，对仓储设备与管理过程进行数字化改造，提高仓储效率和准确性，实现智慧仓储管理的全新解决方案<br/>
      </>
    ),
  },
  {
    title: '智慧经管系统',
    Svg: `https://cangjiangkeji.oss-cn-beijing.aliyuncs.com/WechatIMG52.jpg`,
    description: (
      <>
        1. 经营数据细分统计：智慧数智经管系统能够对门店经营过程中的云端数据进行综合分析，帮助商家了解活动群体的参与效果以及营销活动对门店营业额的提升情况。<br/>
        2. 对账统计：商家可以在手机端后台查看每一笔交易的详细流水，包括交易额度、消费内容等。<br/>
        3. 商品销售分析：系统提供每日、每周、每月的商品销售情况分析，帮助商家了解商品销售趋势，调整价格或口味，优化库存管理。<br/>
      </>
    ),
  },
  {
    title: '智慧票务管理系统',
    Svg: `https://cangjiangkeji.oss-cn-beijing.aliyuncs.com/WechatIMG53.jpg`,
    description: (
      <>
        1. 系统功能： 在线购票，座位选择，票务管理，数据分析，二维码/条形码验票，客户服务，营销推广<br/>
        2. 自动化处理：系统可以自动处理购票、验票、退票等流程，减少人工干预，提高工作效率。<br/>
        3. 实时数据更新：销售数据和座位状态实时更新，帮助管理者及时掌握票务情况。<br/>
      </>
    ),
  },{
    title: '智能文档校对系统',
    Svg: `https://cangjiangkeji.oss-cn-beijing.aliyuncs.com/WechatIMG54.jpg`,
    description: (
      <>
        1. 文字校对及错误提示: 例如 输入  我来自山西省深圳市襄垣县 提示 我来自山西省长治市襄垣县 <br/>
        2. 额外功能: 文档导入,文本清空,我的词库,文档校对,系统管理员账号管理,系统当前共校验的字数统计<br/>
      </>
    ),
  },{
    title: '智能餐饮管理系统',
    Svg: `https://cangjiangkeji.oss-cn-beijing.aliyuncs.com/WechatIMG55.jpg`,
    description: (
      <>
        1. 自动化点餐与结账：智能餐饮管理系统能够实现自动化点餐和结账功能，顾客可以通过智能设备快速浏览菜单、下单并支付，减少了排队等待时间，同时也降低了餐厅的人力成本。这种自动化流程不仅提高了服务效率，还减少了人为错误的可能性。<br/>
        2. 库存管理：系统能够实时监控食材的库存情况，自动进行库存预警和补货提醒，帮助餐厅有效避免食材的浪费和短缺。这种智能化的库存管理方式有助于餐厅优化采购计划，降低库存成本。<br/>
      </>
    ),
  },

  
  
];

function Feature({Svg, title, description,idx}) {
  const className = idx===0? styles.specialimg: ''
  console.log(`className`,className);
  return (
    <div className={clsx('col col--4')}>
      <div className={clsx("text--center",styles.featureSvgSpecial)}>
        <img src={Svg} className={clsx(styles.rotateonhover,styles.featureSvg,className)} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
