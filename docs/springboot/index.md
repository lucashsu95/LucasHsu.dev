---
title: 後端技術 | LucasHsu.dev
description: 整理 LucasHsu.dev 目前的 Spring Boot 後端文章，包含交易、載入策略、分頁效能、Swagger、排程實作、安全認證、檔案處理與 AOP。
head:
  - - meta
    - name: author
      content: 許恩綸
  - - meta
    - name: keywords
      content: Spring Boot, 後端, JPA, Transactional, Swagger, Pagination, Scheduled, Security, AOP, File, Specification
  - - meta
    - property: og:title
      content: 後端技術
  - - meta
    - property: og:description
      content: 整理 LucasHsu.dev 目前的 Spring Boot 後端文章，包含交易、載入策略、分頁效能、Swagger、排程實作、安全認證、檔案處理與 AOP。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://lucashsu95.github.io/LucasHsu.dev/images/springboot-cover.png
---

# 後端技術

這區目前先收 Spring Boot 相關內容。你如果在補 JPA、交易管理、分頁效能、安全認證或檔案處理，從這裡進最順。

> 📝 TL;DR：這裡是後端文章入口。先看交易和持久化上下文打底，再補 Lazy/Eager、分頁效能，接著 Swagger、排程、安全認證，最後補檔案處理與 AOP 進階主題。

## 文章總覽

### 基礎核心
- [@Transactional 事務管理](/springboot/transactional)
- [JPA 持久化上下文](/springboot/persistence-context)
- [@Valid 用於 Service 層](/springboot/valid-service)

### 效能優化
- [Lazy vs Eager 載入策略](/springboot/lazy)
- [Spring Boot 分頁與 N+1 問題](/springboot/data-pagination)

### API 文件
- [Swagger 教學](/springboot/swagger-docs)

### 排程與通知
- [Spring Boot Email 與 Scheduled 排程實作](/springboot/email-scheduled)

### 設定檔
- [@ConfigurationProperties](/springboot/configuration-properties)
- [Spring Profiles：dev/prod 切換](/springboot/spring-profiles)
- [整合實作：Config + Security](/springboot/config-security-integration)

### 安全認證
- [Security & Authentication](/springboot/security)

### 檔案處理
- [Spring Boot 檔案上傳與下載](/springboot/file-upload-download)
- [Spring Boot Word 檔案下載](/springboot/file-word)

### 進階技術
- [Spring Boot AOP + @Async](/springboot/aop-async)
- [Application Events + @TransactionalEventListener](/springboot/application-events)
- [Spring Boot Specification 動態查詢指南](/springboot/specification-guide)

### 開發工具
- [Checkstyle / PMD / Spotless](/springboot/code-quality-tools)

## 建議閱讀順序

1. 先看 [`@Transactional 事務管理`](/springboot/transactional)，不然很多交易行為你只會背，不會用。
2. 接著看 [`JPA 持久化上下文`](/springboot/persistence-context)，把 EntityManager 跟 dirty checking 釐清。
3. 再補 [`Lazy vs Eager 載入策略`](/springboot/lazy) 跟 [`Spring Boot 分頁與 N+1 問題`](/springboot/data-pagination)。
4. 有需要再看 [`Swagger 教學`](/springboot/swagger-docs)、[`Email 與 Scheduled 排程實作`](/springboot/email-scheduled) 與 [`Security & Authentication`](/springboot/security)。
5. 進階主題可補 [`Spring Boot AOP + @Async`](/springboot/aop-async) 和 [`Spring Boot 檔案上傳與下載`](/springboot/file-upload-download)。

