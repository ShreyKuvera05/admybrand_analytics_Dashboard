"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Play, Pause, Edit, Trash2 } from "lucide-react"
import { DataTable } from "@/components/dashboard/data-table"
import { NewCampaignModal } from "@/components/campaigns/new-campaign-modal"
import { useToast } from "@/hooks/use-toast"

interface Campaign {
  id: number
  name: string
  status: "Active" | "Paused" | "Completed" | "Draft"
  budget: string
  spent: string
  roi: string
  type?: string
  startDate?: string
  endDate?: string
  targetAudience?: string
  platform?: string
}

export default function CampaignsPage() {
  const { toast } = useToast()
  const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 1, name: "Summer Sale 2024", status: "Active", budget: "$5,000", spent: "$3,200", roi: "145%" },
    { id: 2, name: "Black Friday", status: "Paused", budget: "$10,000", spent: "$8,500", roi: "230%" },
    { id: 3, name: "Holiday Special", status: "Completed", budget: "$7,500", spent: "$7,500", roi: "180%" },
    { id: 4, name: "Spring Launch", status: "Draft", budget: "$3,000", spent: "$0", roi: "0%" },
  ])

  const handleCreateCampaign = (campaignData: any) => {
    const newCampaign: Campaign = {
      id: campaigns.length + 1,
      name: campaignData.name,
      status: "Draft",
      budget: `$${campaignData.budget.toLocaleString()}`,
      spent: "$0",
      roi: "0%",
      type: campaignData.type,
      startDate: campaignData.startDate,
      endDate: campaignData.endDate,
      targetAudience: campaignData.targetAudience,
      platform: campaignData.platforms.join(", "),
    }

    setCampaigns((prev) => [newCampaign, ...prev])
    setIsNewCampaignModalOpen(false)

    toast({
      title: "Campaign Created Successfully!",
      description: `${campaignData.name} has been created and saved as draft.`,
      duration: 4000,
    })
  }

  const handleStatusChange = (campaignId: number, currentStatus: string) => {
    setCampaigns((prev) =>
      prev.map((campaign) => {
        if (campaign.id === campaignId) {
          const newStatus = currentStatus === "Active" ? "Paused" : "Active"
          return { ...campaign, status: newStatus as Campaign["status"] }
        }
        return campaign
      }),
    )

    const campaign = campaigns.find((c) => c.id === campaignId)
    const newStatus = currentStatus === "Active" ? "Paused" : "Active"

    toast({
      title: `Campaign ${newStatus}`,
      description: `${campaign?.name} has been ${newStatus.toLowerCase()}.`,
      duration: 3000,
    })
  }

  const handleDeleteCampaign = (campaignId: number) => {
    const campaign = campaigns.find((c) => c.id === campaignId)
    setCampaigns((prev) => prev.filter((c) => c.id !== campaignId))

    toast({
      title: "Campaign Deleted",
      description: `${campaign?.name} has been deleted.`,
      variant: "destructive",
      duration: 3000,
    })
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400",
      Paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400",
      Completed: "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400",
      Draft: "bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-400",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Campaign Management
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
              Create, manage, and optimize your marketing campaigns
            </p>
          </div>
          <Button
            onClick={() => setIsNewCampaignModalOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Campaign Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {campaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none hover:shadow-xl dark:hover:bg-black/30 transition-all duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-gray-900 dark:text-white text-lg truncate pr-2">{campaign.name}</CardTitle>
                {getStatusBadge(campaign.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Budget:</span>
                  <span className="text-gray-900 dark:text-white font-semibold">{campaign.budget}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Spent:</span>
                  <span className="text-gray-900 dark:text-white font-semibold">{campaign.spent}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">ROI:</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">{campaign.roi}</span>
                </div>
                {campaign.platform && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Platform:</span>
                    <span className="text-gray-900 dark:text-white font-semibold text-xs truncate">
                      {campaign.platform}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusChange(campaign.id, campaign.status)}
                  className="flex-1 bg-white/50 dark:bg-black/10 border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/20 transition-colors"
                  title={campaign.status === "Active" ? "Pause Campaign" : "Start Campaign"}
                >
                  {campaign.status === "Active" ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-white/50 dark:bg-black/10 border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/20 transition-colors"
                  title="Edit Campaign"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteCampaign(campaign.id)}
                  className="flex-1 bg-white/50 dark:bg-black/10 border-gray-300 dark:border-white/20 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  title="Delete Campaign"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Campaign Data */}
      <DataTable />

      {/* New Campaign Modal */}
      <NewCampaignModal
        isOpen={isNewCampaignModalOpen}
        onClose={() => setIsNewCampaignModalOpen(false)}
        onSubmit={handleCreateCampaign}
      />
    </motion.div>
  )
}
