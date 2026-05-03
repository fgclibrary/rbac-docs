import { createTokenizer } from "@orama/tokenizers/mandarin";
import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

// 中文分词器 + 模糊搜索配置
export const { GET } = createFromSource(source, {
  components: {
    tokenizer: createTokenizer(),
  },
  search: {
    threshold: 0,
    tolerance: 0,
  },
});
