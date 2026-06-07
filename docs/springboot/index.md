---
title: 後端技術 | LucasHsu.dev
description: 整理 LucasHsu.dev 目前的 Spring Boot 後端文章，包含交易、載入策略、分頁效能、Swagger 與排程實作。
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Spring Boot, 後端, JPA, Transactional, Swagger, Pagination, Scheduled
  - - meta
    - property: og:title
      content: 後端技術
  - - meta
    - property: og:description
      content: 整理 LucasHsu.dev 目前的 Spring Boot 後端文章，包含交易、載入策略、分頁效能、Swagger 與排程實作。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/springboot-cover.png
---

# 後端技術

這區目前先收 Spring Boot 相關內容。你如果在補 JPA、交易管理、分頁效能或 API 文件，從這裡進最順。

> 📝 TL;DR：這裡是後端文章入口。先看交易和持久化上下文打底，再補 Lazy/Eager、分頁效能，最後接 Swagger 跟排程實作。

## 文章總覽

- [@Transactional 事務管理](/springboot/transactional)
- [JPA 持久化上下文](/springboot/persistence-context)
- [Lazy vs Eager 載入策略](/springboot/lazy)
- [Spring Boot 分頁與 N+1 問題](/springboot/data-pagination)
- [Swagger 教學](/springboot/swagger-docs)
- [Spring Boot Email 與 Scheduled 排程實作](/springboot/email-scheduled)

## 建議閱讀順序

1. 先看 [`@Transactional 事務管理`](/springboot/transactional)，不然很多交易行為你只會背，不會用。
2. 接著看 [`JPA 持久化上下文`](/springboot/persistence-context)，把 EntityManager 跟 dirty checking 釐清。
3. 再補 [`Lazy vs Eager 載入策略`](/springboot/lazy) 跟 [`Spring Boot 分頁與 N+1 問題`](/springboot/data-pagination)。
4. 最後有需要再看 [`Swagger 教學`](/springboot/swagger-docs) 和 [`Email 與 Scheduled 排程實作`](/springboot/email-scheduled)。

