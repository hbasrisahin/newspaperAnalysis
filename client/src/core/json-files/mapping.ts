export const getMappingJson = (min_gram_value:number=3,max_gram_value:number=10) => {
  return {
    "settings": {
      "index.max_ngram_diff": 10,
      "analysis": {
        "analyzer": {
          "ngram_analyzer": {
            "tokenizer": "ngram_tokenizer",
            "filter": ["lowercase"]
          }
        },
        "tokenizer": {
          "ngram_tokenizer": {
            "type": "ngram",
            "min_gram": min_gram_value,
            "max_gram": max_gram_value,
            "token_chars": ["letter", "digit"]
          }
        }
      }
    },
    "mappings": {
      "_doc": {
        "dynamic": "true",
        "dynamic_templates": [{
          "anything": {
            "match": "*",
            "mapping": {
              "index": true,
              "type": "text",
              "analyzer": "ngram_analyzer"
            }
          }
        }],

        "properties": {
          "date": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "id": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "name": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "ner": {
            "properties": {
              "LOCATION": {
                "type": "text",
                "index": true,
                "analyzer": "ngram_analyzer",
                "fields": {
                  "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                  }
                }
              },
              "ORGANIZATION": {
                "type": "text",
                "index": true,
                "analyzer": "ngram_analyzer",
                "fields": {
                  "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                  }
                }
              },
              "PERSON": {
                "type": "text",
                "index": true,
                "analyzer": "ngram_analyzer",
                "fields": {
                  "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                  }
                }
              }
            }
          },
          "page": {
            "type": "long"
          },
          "text": {
            "type": "text",
            "index": true,
            "analyzer": "ngram_analyzer",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "timestamp": {
            "type": "date"
          },
          "title": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "url": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          }
        }
      }
    }
  }

}