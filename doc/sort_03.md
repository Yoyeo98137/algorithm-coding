## 桶排序

> 桶排序是计数排序的升级版，也采用了分治思想。

↓思路：

- 桶排序就是先分类，即把数据放进相应的桶里 （划分区间）
- 然后对每个桶进行局部排序 （局部排序，通常选择快速排序或者插入排序）
- 最后再把桶合并一下就行了 （合并）

桶排序是分布式排序，适合处理大批量数据。  
需要额外空间，是外部排序。  
桶排序是否稳定，取决于第二步排序算法的选择。

该算法的核心是 **如何分类**，也就是，如何划分桶并把元素放进相应的桶里。