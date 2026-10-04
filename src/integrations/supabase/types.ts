export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      account_devices: {
        Row: {
          browser_label: string
          clerk_user_id: string
          created_at: string
          device_hash: string
          id: string
          last_seen: string
          platform_label: string
          updated_at: string
        }
        Insert: {
          browser_label?: string
          clerk_user_id: string
          created_at?: string
          device_hash: string
          id?: string
          last_seen?: string
          platform_label?: string
          updated_at?: string
        }
        Update: {
          browser_label?: string
          clerk_user_id?: string
          created_at?: string
          device_hash?: string
          id?: string
          last_seen?: string
          platform_label?: string
          updated_at?: string
        }
        Relationships: []
      }
      account_link_codes: {
        Row: {
          clerk_user_id: string
          code: string
          created_at: string
          device_hash: string
          email: string
          id: string
          linked_at: string | null
          telegram_user_id: number | null
          updated_at: string
        }
        Insert: {
          clerk_user_id: string
          code: string
          created_at?: string
          device_hash: string
          email?: string
          id?: string
          linked_at?: string | null
          telegram_user_id?: number | null
          updated_at?: string
        }
        Update: {
          clerk_user_id?: string
          code?: string
          created_at?: string
          device_hash?: string
          email?: string
          id?: string
          linked_at?: string | null
          telegram_user_id?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      account_sessions: {
        Row: {
          clerk_user_id: string
          created_at: string
          device_hash: string
          expires_at: string
          id: string
          last_seen: string
          session_hash: string
          status: string
          updated_at: string
        }
        Insert: {
          clerk_user_id: string
          created_at?: string
          device_hash: string
          expires_at: string
          id?: string
          last_seen?: string
          session_hash: string
          status?: string
          updated_at?: string
        }
        Update: {
          clerk_user_id?: string
          created_at?: string
          device_hash?: string
          expires_at?: string
          id?: string
          last_seen?: string
          session_hash?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      clau_ad_views: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          telegram_id: number
        }
        Insert: {
          amount: number
          created_at?: string
          currency: string
          id?: string
          telegram_id: number
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          telegram_id?: number
        }
        Relationships: []
      }
      clau_payments: {
        Row: {
          amount_ton: number
          created_at: string
          id: string
          memo: string
          paid_at: string | null
          product: string
          status: string
          telegram_id: number
          tx_hash: string | null
        }
        Insert: {
          amount_ton: number
          created_at?: string
          id?: string
          memo: string
          paid_at?: string | null
          product: string
          status?: string
          telegram_id: number
          tx_hash?: string | null
        }
        Update: {
          amount_ton?: number
          created_at?: string
          id?: string
          memo?: string
          paid_at?: string | null
          product?: string
          status?: string
          telegram_id?: number
          tx_hash?: string | null
        }
        Relationships: []
      }
      clau_spins: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          telegram_id: number
        }
        Insert: {
          amount: number
          created_at?: string
          currency: string
          id?: string
          telegram_id: number
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          telegram_id?: number
        }
        Relationships: []
      }
      clau_tasks: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          key: string
          kind: string
          link: string | null
          reward_amount: number
          reward_currency: string
          sort_order: number
          target: number
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          key: string
          kind: string
          link?: string | null
          reward_amount: number
          reward_currency: string
          sort_order?: number
          target?: number
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          key?: string
          kind?: string
          link?: string | null
          reward_amount?: number
          reward_currency?: string
          sort_order?: number
          target?: number
          title?: string
        }
        Relationships: []
      }
      clau_translations: {
        Row: {
          created_at: string
          data: Json
          lang: string
          version: number
        }
        Insert: {
          created_at?: string
          data: Json
          lang: string
          version: number
        }
        Update: {
          created_at?: string
          data?: Json
          lang?: string
          version?: number
        }
        Relationships: []
      }
      clau_user_tasks: {
        Row: {
          created_at: string
          id: string
          task_key: string
          telegram_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          task_key: string
          telegram_id: number
        }
        Update: {
          created_at?: string
          id?: string
          task_key?: string
          telegram_id?: number
        }
        Relationships: []
      }
      clau_users: {
        Row: {
          ads_watched: number
          booster: string | null
          booster_mult: number
          booster_until: string | null
          clau: number
          created_at: string
          first_name: string | null
          gram: number
          id: string
          language: string
          last_ad_at: string | null
          photo_url: string | null
          referrals: number
          referred_by: number | null
          telegram_id: number
          tickets: number
          updated_at: string
          usdt: number
          username: string | null
        }
        Insert: {
          ads_watched?: number
          booster?: string | null
          booster_mult?: number
          booster_until?: string | null
          clau?: number
          created_at?: string
          first_name?: string | null
          gram?: number
          id?: string
          language?: string
          last_ad_at?: string | null
          photo_url?: string | null
          referrals?: number
          referred_by?: number | null
          telegram_id: number
          tickets?: number
          updated_at?: string
          usdt?: number
          username?: string | null
        }
        Update: {
          ads_watched?: number
          booster?: string | null
          booster_mult?: number
          booster_until?: string | null
          clau?: number
          created_at?: string
          first_name?: string | null
          gram?: number
          id?: string
          language?: string
          last_ad_at?: string | null
          photo_url?: string | null
          referrals?: number
          referred_by?: number | null
          telegram_id?: number
          tickets?: number
          updated_at?: string
          usdt?: number
          username?: string | null
        }
        Relationships: []
      }
      clau_withdrawals: {
        Row: {
          address: string
          amount: number
          created_at: string
          currency: string
          id: string
          status: string
          telegram_id: number
        }
        Insert: {
          address: string
          amount: number
          created_at?: string
          currency: string
          id?: string
          status?: string
          telegram_id: number
        }
        Update: {
          address?: string
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          status?: string
          telegram_id?: number
        }
        Relationships: []
      }
      course_entitlements: {
        Row: {
          clerk_user_id: string
          course_id: string
          created_at: string
          expires_at: string | null
          id: string
          starts_at: string
          status: string
          updated_at: string
        }
        Insert: {
          clerk_user_id: string
          course_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          starts_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          clerk_user_id?: string
          course_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          starts_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_entitlements_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          cover_key: string
          created_at: string
          doctor_ar: string
          doctor_en: string
          id: string
          is_popular: boolean
          module_id: string | null
          sort_order: number
          title_ar: string
          title_en: string
          updated_at: string
        }
        Insert: {
          cover_key?: string
          created_at?: string
          doctor_ar?: string
          doctor_en?: string
          id?: string
          is_popular?: boolean
          module_id?: string | null
          sort_order?: number
          title_ar: string
          title_en: string
          updated_at?: string
        }
        Update: {
          cover_key?: string
          created_at?: string
          doctor_ar?: string
          doctor_en?: string
          id?: string
          is_popular?: boolean
          module_id?: string | null
          sort_order?: number
          title_ar?: string
          title_en?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          accent: string
          code: string
          created_at: string
          id: string
          name_ar: string
          name_en: string
          sort_order: number
          university_id: string
          updated_at: string
        }
        Insert: {
          accent?: string
          code: string
          created_at?: string
          id?: string
          name_ar: string
          name_en: string
          sort_order?: number
          university_id: string
          updated_at?: string
        }
        Update: {
          accent?: string
          code?: string
          created_at?: string
          id?: string
          name_ar?: string
          name_en?: string
          sort_order?: number
          university_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_assets: {
        Row: {
          asset_type: string
          byte_size: number | null
          created_at: string
          id: string
          is_active: boolean
          lesson_id: string
          mime_type: string
          storage_bucket: string
          storage_path: string
          updated_at: string
        }
        Insert: {
          asset_type: string
          byte_size?: number | null
          created_at?: string
          id?: string
          is_active?: boolean
          lesson_id: string
          mime_type: string
          storage_bucket?: string
          storage_path: string
          updated_at?: string
        }
        Update: {
          asset_type?: string
          byte_size?: number | null
          created_at?: string
          id?: string
          is_active?: boolean
          lesson_id?: string
          mime_type?: string
          storage_bucket?: string
          storage_path?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_assets_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_contents: {
        Row: {
          created_at: string
          lesson_id: string
          summary_ar: string
          summary_en: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          lesson_id: string
          summary_ar?: string
          summary_en?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          lesson_id?: string
          summary_ar?: string
          summary_en?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_contents_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: true
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          course_id: string
          created_at: string
          id: string
          sort_order: number
          title_ar: string
          title_en: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          sort_order?: number
          title_ar: string
          title_en: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          sort_order?: number
          title_ar?: string
          title_en?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          accent: string
          code: string
          created_at: string
          department_id: string
          id: string
          name_ar: string
          name_en: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          accent?: string
          code: string
          created_at?: string
          department_id: string
          id?: string
          name_ar: string
          name_en: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          accent?: string
          code?: string
          created_at?: string
          department_id?: string
          id?: string
          name_ar?: string
          name_en?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      playback_grants: {
        Row: {
          asset_id: string
          clerk_user_id: string
          created_at: string
          device_hash: string
          expires_at: string
          id: string
          lesson_id: string
          revoked_at: string | null
          token_hash: string
          ua_hash: string
        }
        Insert: {
          asset_id: string
          clerk_user_id: string
          created_at?: string
          device_hash: string
          expires_at: string
          id?: string
          lesson_id: string
          revoked_at?: string | null
          token_hash: string
          ua_hash?: string
        }
        Update: {
          asset_id?: string
          clerk_user_id?: string
          created_at?: string
          device_hash?: string
          expires_at?: string
          id?: string
          lesson_id?: string
          revoked_at?: string | null
          token_hash?: string
          ua_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "playback_grants_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "lesson_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playback_grants_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      playback_sessions: {
        Row: {
          asset_id: string
          clerk_user_id: string
          created_at: string
          device_hash: string
          expires_at: string
          id: string
          last_seen: string
          lesson_id: string
          session_hash: string
          status: string
          updated_at: string
        }
        Insert: {
          asset_id: string
          clerk_user_id: string
          created_at?: string
          device_hash: string
          expires_at: string
          id?: string
          last_seen?: string
          lesson_id: string
          session_hash: string
          status?: string
          updated_at?: string
        }
        Update: {
          asset_id?: string
          clerk_user_id?: string
          created_at?: string
          device_hash?: string
          expires_at?: string
          id?: string
          last_seen?: string
          lesson_id?: string
          session_hash?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "playback_sessions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "lesson_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playback_sessions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          dark_mode: boolean
          display_name: string
          preferred_language: string
          university_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          dark_mode?: boolean
          display_name?: string
          preferred_language?: string
          university_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          dark_mode?: boolean
          display_name?: string
          preferred_language?: string
          university_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      security_events: {
        Row: {
          clerk_user_id: string | null
          created_at: string
          device_hash: string | null
          event_type: string
          id: string
          metadata: Json
          severity: string
        }
        Insert: {
          clerk_user_id?: string | null
          created_at?: string
          device_hash?: string | null
          event_type: string
          id?: string
          metadata?: Json
          severity?: string
        }
        Update: {
          clerk_user_id?: string | null
          created_at?: string
          device_hash?: string | null
          event_type?: string
          id?: string
          metadata?: Json
          severity?: string
        }
        Relationships: []
      }
      sms_catalog: {
        Row: {
          category: string
          created_at: string
          id: string
          is_active: boolean
          platform: string
          price_override: number | null
          provider_service_id: number
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          is_active?: boolean
          platform: string
          price_override?: number | null
          provider_service_id: number
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          is_active?: boolean
          platform?: string
          price_override?: number | null
          provider_service_id?: number
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sms_hidden_platforms: {
        Row: {
          created_at: string
          platform: string
        }
        Insert: {
          created_at?: string
          platform: string
        }
        Update: {
          created_at?: string
          platform?: string
        }
        Relationships: []
      }
      sms_orders: {
        Row: {
          category: string | null
          charge: number
          created_at: string
          error: string | null
          id: string
          link: string
          provider_order_id: string | null
          quantity: number
          remains: number | null
          service_id: number
          service_name: string
          start_count: number | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          charge: number
          created_at?: string
          error?: string | null
          id?: string
          link: string
          provider_order_id?: string | null
          quantity: number
          remains?: number | null
          service_id: number
          service_name: string
          start_count?: number | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          charge?: number
          created_at?: string
          error?: string | null
          id?: string
          link?: string
          provider_order_id?: string | null
          quantity?: number
          remains?: number | null
          service_id?: number
          service_name?: string
          start_count?: number | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "sms_users"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_services: {
        Row: {
          cancel: boolean
          category: string
          created_at: string
          is_active: boolean
          max_quantity: number
          min_quantity: number
          name: string
          rate: number
          refill: boolean
          service_id: number
          synced_at: string
          type: string
          updated_at: string
        }
        Insert: {
          cancel?: boolean
          category?: string
          created_at?: string
          is_active?: boolean
          max_quantity?: number
          min_quantity?: number
          name: string
          rate?: number
          refill?: boolean
          service_id: number
          synced_at?: string
          type?: string
          updated_at?: string
        }
        Update: {
          cancel?: boolean
          category?: string
          created_at?: string
          is_active?: boolean
          max_quantity?: number
          min_quantity?: number
          name?: string
          rate?: number
          refill?: boolean
          service_id?: number
          synced_at?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      sms_transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          meta: Json
          reference: string | null
          status: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          meta?: Json
          reference?: string | null
          status?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          meta?: Json
          reference?: string | null
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "sms_users"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_users: {
        Row: {
          auth_user_id: string | null
          balance: number
          clerk_user_id: string | null
          created_at: string
          email: string | null
          guest_token: string | null
          id: string
          is_guest: boolean
          name: string | null
          phone: string | null
          phone_verified_at: string | null
          updated_at: string
        }
        Insert: {
          auth_user_id?: string | null
          balance?: number
          clerk_user_id?: string | null
          created_at?: string
          email?: string | null
          guest_token?: string | null
          id?: string
          is_guest?: boolean
          name?: string | null
          phone?: string | null
          phone_verified_at?: string | null
          updated_at?: string
        }
        Update: {
          auth_user_id?: string | null
          balance?: number
          clerk_user_id?: string | null
          created_at?: string
          email?: string | null
          guest_token?: string | null
          id?: string
          is_guest?: boolean
          name?: string | null
          phone?: string | null
          phone_verified_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sms_whatsapp_verifications: {
        Row: {
          code: string
          created_at: string
          expires_at: string
          id: string
          phone: string
          sms_user_id: string | null
          status: string
          verified_at: string | null
        }
        Insert: {
          code: string
          created_at?: string
          expires_at?: string
          id?: string
          phone: string
          sms_user_id?: string | null
          status?: string
          verified_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          phone?: string
          sms_user_id?: string | null
          status?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sms_whatsapp_verifications_sms_user_id_fkey"
            columns: ["sms_user_id"]
            isOneToOne: false
            referencedRelation: "sms_users"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_admin_audit: {
        Row: {
          action: string
          admin_telegram_user_id: number
          created_at: string
          id: string
          metadata: Json
          scope: string | null
          target_telegram_user_id: number | null
        }
        Insert: {
          action: string
          admin_telegram_user_id: number
          created_at?: string
          id?: string
          metadata?: Json
          scope?: string | null
          target_telegram_user_id?: number | null
        }
        Update: {
          action?: string
          admin_telegram_user_id?: number
          created_at?: string
          id?: string
          metadata?: Json
          scope?: string | null
          target_telegram_user_id?: number | null
        }
        Relationships: []
      }
      telegram_admin_state: {
        Row: {
          admin_telegram_user_id: number
          created_at: string
          pending_action: string | null
          pending_scope: string | null
          updated_at: string
        }
        Insert: {
          admin_telegram_user_id: number
          created_at?: string
          pending_action?: string | null
          pending_scope?: string | null
          updated_at?: string
        }
        Update: {
          admin_telegram_user_id?: number
          created_at?: string
          pending_action?: string | null
          pending_scope?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      telegram_admin_targets: {
        Row: {
          created_at: string
          first_name: string
          last_seen: string
          telegram_user_id: number
          username: string
        }
        Insert: {
          created_at?: string
          first_name?: string
          last_seen?: string
          telegram_user_id: number
          username?: string
        }
        Update: {
          created_at?: string
          first_name?: string
          last_seen?: string
          telegram_user_id?: number
          username?: string
        }
        Relationships: []
      }
      telegram_channel_members: {
        Row: {
          chat_id: number
          course_id: string | null
          created_at: string
          id: string
          invite_link: string | null
          invited_at: string
          joined_at: string | null
          removed_at: string | null
          status: string
          telegram_user_id: number
          updated_at: string
        }
        Insert: {
          chat_id: number
          course_id?: string | null
          created_at?: string
          id?: string
          invite_link?: string | null
          invited_at?: string
          joined_at?: string | null
          removed_at?: string | null
          status?: string
          telegram_user_id: number
          updated_at?: string
        }
        Update: {
          chat_id?: number
          course_id?: string | null
          created_at?: string
          id?: string
          invite_link?: string | null
          invited_at?: string
          joined_at?: string | null
          removed_at?: string | null
          status?: string
          telegram_user_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "telegram_channel_members_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_course_channels: {
        Row: {
          added_by: number | null
          chat_id: number
          course_id: string | null
          created_at: string
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          added_by?: number | null
          chat_id: number
          course_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Update: {
          added_by?: number | null
          chat_id?: number
          course_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "telegram_course_channels_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_delivery_groups: {
        Row: {
          added_by: number | null
          created_at: string
          group_id: number
          id: string
          is_active: boolean
          title: string | null
        }
        Insert: {
          added_by?: number | null
          created_at?: string
          group_id: number
          id?: string
          is_active?: boolean
          title?: string | null
        }
        Update: {
          added_by?: number | null
          created_at?: string
          group_id?: number
          id?: string
          is_active?: boolean
          title?: string | null
        }
        Relationships: []
      }
      telegram_device_alerts: {
        Row: {
          created_at: string
          id: string
          new_platform: string
          old_platform: string
          telegram_user_id: number
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          new_platform?: string
          old_platform?: string
          telegram_user_id: number
          username?: string
        }
        Update: {
          created_at?: string
          id?: string
          new_platform?: string
          old_platform?: string
          telegram_user_id?: number
          username?: string
        }
        Relationships: []
      }
      telegram_device_attempts: {
        Row: {
          created_at: string
          device_hash: string
          device_info: Json
          fingerprint_hash: string
          id: string
          ip_hash: string | null
          match_score: number
          outcome: string
          telegram_user_id: number
          user_agent: string | null
          username: string
        }
        Insert: {
          created_at?: string
          device_hash: string
          device_info?: Json
          fingerprint_hash?: string
          id?: string
          ip_hash?: string | null
          match_score?: number
          outcome?: string
          telegram_user_id: number
          user_agent?: string | null
          username?: string
        }
        Update: {
          created_at?: string
          device_hash?: string
          device_info?: Json
          fingerprint_hash?: string
          id?: string
          ip_hash?: string | null
          match_score?: number
          outcome?: string
          telegram_user_id?: number
          user_agent?: string | null
          username?: string
        }
        Relationships: []
      }
      telegram_device_checks: {
        Row: {
          awaiting_recheck: boolean
          created_at: string
          last_notified_at: string | null
          last_verified_at: string
          next_check_at: string
          telegram_user_id: number
          updated_at: string
        }
        Insert: {
          awaiting_recheck?: boolean
          created_at?: string
          last_notified_at?: string | null
          last_verified_at?: string
          next_check_at?: string
          telegram_user_id: number
          updated_at?: string
        }
        Update: {
          awaiting_recheck?: boolean
          created_at?: string
          last_notified_at?: string | null
          last_verified_at?: string
          next_check_at?: string
          telegram_user_id?: number
          updated_at?: string
        }
        Relationships: []
      }
      telegram_devices: {
        Row: {
          app_version: string
          created_at: string
          device_hash: string
          device_info: Json
          fingerprint_hash: string | null
          first_name: string
          first_seen: string
          foreign_attempts: number
          id: string
          ip_hash: string | null
          last_seen: string
          platform: string
          telegram_user_id: number
          updated_at: string
          user_agent: string | null
          username: string
          verified: boolean
        }
        Insert: {
          app_version?: string
          created_at?: string
          device_hash: string
          device_info?: Json
          fingerprint_hash?: string | null
          first_name?: string
          first_seen?: string
          foreign_attempts?: number
          id?: string
          ip_hash?: string | null
          last_seen?: string
          platform?: string
          telegram_user_id: number
          updated_at?: string
          user_agent?: string | null
          username?: string
          verified?: boolean
        }
        Update: {
          app_version?: string
          created_at?: string
          device_hash?: string
          device_info?: Json
          fingerprint_hash?: string | null
          first_name?: string
          first_seen?: string
          foreign_attempts?: number
          id?: string
          ip_hash?: string | null
          last_seen?: string
          platform?: string
          telegram_user_id?: number
          updated_at?: string
          user_agent?: string | null
          username?: string
          verified?: boolean
        }
        Relationships: []
      }
      telegram_lesson_media: {
        Row: {
          caption: string
          created_at: string
          duration_seconds: number
          file_id: string
          id: string
          is_active: boolean
          lesson_id: string
          updated_at: string
        }
        Insert: {
          caption?: string
          created_at?: string
          duration_seconds?: number
          file_id: string
          id?: string
          is_active?: boolean
          lesson_id: string
          updated_at?: string
        }
        Update: {
          caption?: string
          created_at?: string
          duration_seconds?: number
          file_id?: string
          id?: string
          is_active?: boolean
          lesson_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "telegram_lesson_media_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_sent_videos: {
        Row: {
          chat_id: number
          created_at: string
          delete_at: string
          deleted_at: string | null
          delivery_group_id: number | null
          id: string
          invite_link: string | null
          lesson_id: string | null
          message_id: number
          student_chat_id: number | null
        }
        Insert: {
          chat_id: number
          created_at?: string
          delete_at: string
          deleted_at?: string | null
          delivery_group_id?: number | null
          id?: string
          invite_link?: string | null
          lesson_id?: string | null
          message_id: number
          student_chat_id?: number | null
        }
        Update: {
          chat_id?: number
          created_at?: string
          delete_at?: string
          deleted_at?: string | null
          delivery_group_id?: number | null
          id?: string
          invite_link?: string | null
          lesson_id?: string | null
          message_id?: number
          student_chat_id?: number | null
        }
        Relationships: []
      }
      telegram_subscriptions: {
        Row: {
          clerk_user_id: string | null
          course_id: string | null
          created_at: string
          expires_at: string | null
          id: string
          module_id: string | null
          status: string
          telegram_user_id: number
          updated_at: string
        }
        Insert: {
          clerk_user_id?: string | null
          course_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          module_id?: string | null
          status?: string
          telegram_user_id: number
          updated_at?: string
        }
        Update: {
          clerk_user_id?: string | null
          course_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          module_id?: string | null
          status?: string
          telegram_user_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "telegram_subscriptions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "telegram_subscriptions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_user_settings: {
        Row: {
          created_at: string
          language: string
          telegram_user_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          language?: string
          telegram_user_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          language?: string
          telegram_user_id?: number
          updated_at?: string
        }
        Relationships: []
      }
      universities: {
        Row: {
          code: string
          created_at: string
          id: string
          name_ar: string
          name_en: string
          sort_order: number
          tagline_ar: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name_ar: string
          name_en: string
          sort_order?: number
          tagline_ar?: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name_ar?: string
          name_en?: string
          sort_order?: number
          tagline_ar?: string
          updated_at?: string
        }
        Relationships: []
      }
      ya_assets: {
        Row: {
          coingecko_id: string | null
          created_at: string
          is_mineable: boolean
          is_stakeable: boolean
          min_withdrawal: number
          mining_rate: number
          name: string
          sort_order: number
          symbol: string
          updated_at: string
        }
        Insert: {
          coingecko_id?: string | null
          created_at?: string
          is_mineable?: boolean
          is_stakeable?: boolean
          min_withdrawal?: number
          mining_rate?: number
          name: string
          sort_order?: number
          symbol: string
          updated_at?: string
        }
        Update: {
          coingecko_id?: string | null
          created_at?: string
          is_mineable?: boolean
          is_stakeable?: boolean
          min_withdrawal?: number
          mining_rate?: number
          name?: string
          sort_order?: number
          symbol?: string
          updated_at?: string
        }
        Relationships: []
      }
      ya_bot_sessions: {
        Row: {
          chat_id: number
          step: string
          title: string | null
          updated_at: string
          url: string | null
        }
        Insert: {
          chat_id: number
          step: string
          title?: string | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          chat_id?: number
          step?: string
          title?: string | null
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      ya_conversions: {
        Row: {
          created_at: string
          from_amount: number
          from_asset: string
          from_usd: number
          id: string
          telegram_id: number
          to_amount: number
          to_asset: string
          to_usd: number
        }
        Insert: {
          created_at?: string
          from_amount: number
          from_asset: string
          from_usd: number
          id?: string
          telegram_id: number
          to_amount: number
          to_asset: string
          to_usd: number
        }
        Update: {
          created_at?: string
          from_amount?: number
          from_asset?: string
          from_usd?: number
          id?: string
          telegram_id?: number
          to_amount?: number
          to_asset?: string
          to_usd?: number
        }
        Relationships: [
          {
            foreignKeyName: "ya_conversions_from_asset_fkey"
            columns: ["from_asset"]
            isOneToOne: false
            referencedRelation: "ya_assets"
            referencedColumns: ["symbol"]
          },
          {
            foreignKeyName: "ya_conversions_to_asset_fkey"
            columns: ["to_asset"]
            isOneToOne: false
            referencedRelation: "ya_assets"
            referencedColumns: ["symbol"]
          },
        ]
      }
      ya_payments: {
        Row: {
          amount_ton: number
          created_at: string
          id: string
          server_id: string | null
          status: string
          telegram_id: number
          tx_hash: string | null
          updated_at: string
        }
        Insert: {
          amount_ton: number
          created_at?: string
          id?: string
          server_id?: string | null
          status?: string
          telegram_id: number
          tx_hash?: string | null
          updated_at?: string
        }
        Update: {
          amount_ton?: number
          created_at?: string
          id?: string
          server_id?: string | null
          status?: string
          telegram_id?: number
          tx_hash?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ya_payments_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "ya_servers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ya_payments_telegram_id_fkey"
            columns: ["telegram_id"]
            isOneToOne: false
            referencedRelation: "ya_users"
            referencedColumns: ["telegram_id"]
          },
        ]
      }
      ya_servers: {
        Row: {
          created_at: string
          duration_days: number
          hashrate: number
          id: string
          is_active: boolean
          name: string
          price_ton: number
          sort_order: number
          tier: string
        }
        Insert: {
          created_at?: string
          duration_days: number
          hashrate: number
          id: string
          is_active?: boolean
          name: string
          price_ton: number
          sort_order?: number
          tier: string
        }
        Update: {
          created_at?: string
          duration_days?: number
          hashrate?: number
          id?: string
          is_active?: boolean
          name?: string
          price_ton?: number
          sort_order?: number
          tier?: string
        }
        Relationships: []
      }
      ya_stakes: {
        Row: {
          amount: number
          claimed: boolean
          created_at: string
          id: string
          plan_id: string
          reward: number
          telegram_id: number
          unlock_at: string
        }
        Insert: {
          amount: number
          claimed?: boolean
          created_at?: string
          id?: string
          plan_id: string
          reward: number
          telegram_id: number
          unlock_at: string
        }
        Update: {
          amount?: number
          claimed?: boolean
          created_at?: string
          id?: string
          plan_id?: string
          reward?: number
          telegram_id?: number
          unlock_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ya_stakes_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "ya_staking_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ya_stakes_telegram_id_fkey"
            columns: ["telegram_id"]
            isOneToOne: false
            referencedRelation: "ya_users"
            referencedColumns: ["telegram_id"]
          },
        ]
      }
      ya_staking_plans: {
        Row: {
          apy: number
          days: number
          id: string
          min_amount: number
          name: string
          sort_order: number
        }
        Insert: {
          apy: number
          days: number
          id: string
          min_amount?: number
          name: string
          sort_order?: number
        }
        Update: {
          apy?: number
          days?: number
          id?: string
          min_amount?: number
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      ya_task_completions: {
        Row: {
          created_at: string
          task_id: string
          telegram_id: number
        }
        Insert: {
          created_at?: string
          task_id: string
          telegram_id: number
        }
        Update: {
          created_at?: string
          task_id?: string
          telegram_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "ya_task_completions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "ya_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ya_task_completions_telegram_id_fkey"
            columns: ["telegram_id"]
            isOneToOne: false
            referencedRelation: "ya_users"
            referencedColumns: ["telegram_id"]
          },
        ]
      }
      ya_tasks: {
        Row: {
          id: string
          image_url: string | null
          is_active: boolean
          kind: string
          reward: number
          reward_asset: string
          share_text: string | null
          sort_order: number
          title: string
          url: string | null
        }
        Insert: {
          id: string
          image_url?: string | null
          is_active?: boolean
          kind?: string
          reward: number
          reward_asset?: string
          share_text?: string | null
          sort_order?: number
          title: string
          url?: string | null
        }
        Update: {
          id?: string
          image_url?: string | null
          is_active?: boolean
          kind?: string
          reward?: number
          reward_asset?: string
          share_text?: string | null
          sort_order?: number
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      ya_user_balances: {
        Row: {
          asset_symbol: string
          balance: number
          created_at: string
          last_claim_at: string
          telegram_id: number
          total_mined: number
          updated_at: string
        }
        Insert: {
          asset_symbol: string
          balance?: number
          created_at?: string
          last_claim_at?: string
          telegram_id: number
          total_mined?: number
          updated_at?: string
        }
        Update: {
          asset_symbol?: string
          balance?: number
          created_at?: string
          last_claim_at?: string
          telegram_id?: number
          total_mined?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ya_user_balances_asset_symbol_fkey"
            columns: ["asset_symbol"]
            isOneToOne: false
            referencedRelation: "ya_assets"
            referencedColumns: ["symbol"]
          },
          {
            foreignKeyName: "ya_user_balances_telegram_id_fkey"
            columns: ["telegram_id"]
            isOneToOne: false
            referencedRelation: "ya_users"
            referencedColumns: ["telegram_id"]
          },
        ]
      }
      ya_user_servers: {
        Row: {
          created_at: string
          expires_at: string
          hashrate: number
          id: string
          server_id: string
          telegram_id: number
        }
        Insert: {
          created_at?: string
          expires_at: string
          hashrate: number
          id?: string
          server_id: string
          telegram_id: number
        }
        Update: {
          created_at?: string
          expires_at?: string
          hashrate?: number
          id?: string
          server_id?: string
          telegram_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "ya_user_servers_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "ya_servers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ya_user_servers_telegram_id_fkey"
            columns: ["telegram_id"]
            isOneToOne: false
            referencedRelation: "ya_users"
            referencedColumns: ["telegram_id"]
          },
        ]
      }
      ya_users: {
        Row: {
          balance: number
          created_at: string
          first_name: string
          last_claim_at: string
          mining_asset: string
          photo_url: string | null
          ref_code: string
          ref_earned: number
          referred_by: number | null
          telegram_id: number
          total_mined: number
          updated_at: string
          username: string
          wallet_address: string | null
        }
        Insert: {
          balance?: number
          created_at?: string
          first_name?: string
          last_claim_at?: string
          mining_asset?: string
          photo_url?: string | null
          ref_code?: string
          ref_earned?: number
          referred_by?: number | null
          telegram_id: number
          total_mined?: number
          updated_at?: string
          username?: string
          wallet_address?: string | null
        }
        Update: {
          balance?: number
          created_at?: string
          first_name?: string
          last_claim_at?: string
          mining_asset?: string
          photo_url?: string | null
          ref_code?: string
          ref_earned?: number
          referred_by?: number | null
          telegram_id?: number
          total_mined?: number
          updated_at?: string
          username?: string
          wallet_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ya_users_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "ya_users"
            referencedColumns: ["telegram_id"]
          },
        ]
      }
      ya_withdrawals: {
        Row: {
          amount: number
          asset_symbol: string
          created_at: string
          destination: string
          id: string
          note: string | null
          status: string
          telegram_id: number
          tx_hash: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          asset_symbol: string
          created_at?: string
          destination: string
          id?: string
          note?: string | null
          status?: string
          telegram_id: number
          tx_hash?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          asset_symbol?: string
          created_at?: string
          destination?: string
          id?: string
          note?: string | null
          status?: string
          telegram_id?: number
          tx_hash?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ya_withdrawals_asset_symbol_fkey"
            columns: ["asset_symbol"]
            isOneToOne: false
            referencedRelation: "ya_assets"
            referencedColumns: ["symbol"]
          },
          {
            foreignKeyName: "ya_withdrawals_telegram_id_fkey"
            columns: ["telegram_id"]
            isOneToOne: false
            referencedRelation: "ya_users"
            referencedColumns: ["telegram_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_clerk_user_id: { Args: never; Returns: string }
      current_user_id: { Args: never; Returns: string }
      sms_credit_deposit: { Args: { _reference: string }; Returns: Json }
      ya_claim: { Args: { _tg: number }; Returns: Json }
      ya_claim_asset: { Args: { _asset: string; _tg: number }; Returns: Json }
      ya_claim_dual: { Args: { _tg: number }; Returns: Json }
      ya_claim_free_server: { Args: { _tg: number }; Returns: Json }
      ya_claim_pair: { Args: { _tg: number }; Returns: Json }
      ya_complete_task: { Args: { _task: string; _tg: number }; Returns: Json }
      ya_confirm_payment: {
        Args: { _payment: string; _tx: string }
        Returns: Json
      }
      ya_convert_asset: {
        Args: {
          _amount: number
          _from: string
          _from_usd: number
          _tg: number
          _to: string
          _to_usd: number
        }
        Returns: Json
      }
      ya_ensure_balances: { Args: { _tg: number }; Returns: undefined }
      ya_hashrate: { Args: { _tg: number }; Returns: number }
      ya_request_withdrawal: {
        Args: {
          _amount: number
          _asset: string
          _destination: string
          _tg: number
        }
        Returns: Json
      }
      ya_select_mining_asset: {
        Args: { _asset: string; _tg: number }
        Returns: Json
      }
      ya_stake: {
        Args: { _amount: number; _plan: string; _tg: number }
        Returns: Json
      }
      ya_unstake: { Args: { _stake: string; _tg: number }; Returns: Json }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
