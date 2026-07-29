import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  ShieldCheck, 
  UserCheck, 
  Store, 
  Search, 
  Trash2, 
  AlertTriangle, 
  RefreshCw, 
  ArrowLeft, 
  LayoutGrid, 
  UserX, 
  CheckCircle2, 
  Ban,
  SlidersHorizontal
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import type { UserResponse, UserStatsResponse } from '../../api/adminApi';

export function AdminUserManagementPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [stats, setStats] = useState<UserStatsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Selected User for Deletion Modal
  const [deleteTargetUser, setDeleteTargetUser] = useState<UserResponse | null>(null);

  const fetchUsersAndStats = async () => {
    setLoading(true);
    try {
      const [fetchedUsers, fetchedStats] = await Promise.all([
        adminApi.getUsers({ query: searchQuery, role: roleFilter, status: statusFilter }),
        adminApi.getUserStats(),
      ]);
      setUsers(fetchedUsers);
      setStats(fetchedStats);
    } catch (error) {
      console.error('Failed to fetch admin users data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndStats();
  }, [searchQuery, roleFilter, statusFilter]);

  const handleRoleChange = async (userId: number, newRole: 'ROLE_CUSTOMER' | 'ROLE_OWNER' | 'ROLE_ADMIN') => {
    try {
      await adminApi.updateRole(userId, newRole);
      fetchUsersAndStats();
    } catch (err) {
      alert('권한 변경 실패');
    }
  };

  const handleToggleStatus = async (user: UserResponse) => {
    const nextStatus = user.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    try {
      await adminApi.updateStatus(user.id, nextStatus);
      fetchUsersAndStats();
    } catch (err) {
      alert('상태 변경 실패');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetUser) return;
    try {
      await adminApi.deleteUser(deleteTargetUser.id);
      setDeleteTargetUser(null);
      fetchUsersAndStats();
    } catch (err) {
      alert('회원 삭제 실패');
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center gap-1 w-fit">
            <ShieldCheck className="w-3 h-3" /> 최고관리자
          </span>
        );
      case 'ROLE_OWNER':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center gap-1 w-fit">
            <Store className="w-3 h-3" /> 사장님
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 w-fit">
            <UserCheck className="w-3 h-3" /> 손님 (고객)
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUSPENDED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-1 w-fit">
            <Ban className="w-3 h-3" /> 정지됨
          </span>
        );
      case 'INACTIVE':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1 w-fit">
            <UserX className="w-3 h-3" /> 탈퇴/비활성
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 w-fit">
            <CheckCircle2 className="w-3 h-3" /> 정상 (활성)
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060608] text-neutral-900 dark:text-neutral-100 font-sans selection:bg-purple-500/20">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0b0b0e]/80 backdrop-blur-xl border-b border-neutral-200 dark:border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight">ZariYo 회원 관리 모드</h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  Admin Console
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">전체 서비스 사용자 계정 조회, 검색 및 권한 상태 제어 대시보드</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/owner/stores')}
            className="px-4 py-2 text-xs font-extrabold rounded-xl border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <LayoutGrid className="w-4 h-4" /> 사장님 모드 전환
          </button>
          <button
            onClick={fetchUsersAndStats}
            className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-white/10 transition-colors"
            title="새로고침"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* 1. Stat Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e0e12] border border-neutral-200/80 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="text-xs font-bold">전체 회원</span>
              <Users className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-2xl font-black">{stats?.totalUsers ?? 0}명</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e0e12] border border-neutral-200/80 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="text-xs font-bold">사장님 계정</span>
              <Store className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{stats?.ownerCount ?? 0}명</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e0e12] border border-neutral-200/80 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="text-xs font-bold">손님 계정</span>
              <UserCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{stats?.customerCount ?? 0}명</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e0e12] border border-neutral-200/80 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="text-xs font-bold">관리자 계정</span>
              <ShieldCheck className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-2xl font-black text-purple-600 dark:text-purple-400">{stats?.adminCount ?? 0}명</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e0e12] border border-neutral-200/80 dark:border-white/5 shadow-sm col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="text-xs font-bold">정지 계정</span>
              <Ban className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-black text-red-600 dark:text-red-400">{stats?.suspendedCount ?? 0}명</p>
          </div>
        </div>

        {/* 2. Filter Controls & Search */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-neutral-200/80 dark:border-white/5 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="이메일 주소 또는 이름 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-bold bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
              <SlidersHorizontal className="w-4 h-4" /> 필터:
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 text-xs font-bold bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-800 dark:text-neutral-200"
            >
              <option value="ALL">모든 역할</option>
              <option value="ROLE_OWNER">사장님 (OWNER)</option>
              <option value="ROLE_CUSTOMER">손님 (CUSTOMER)</option>
              <option value="ROLE_ADMIN">관리자 (ADMIN)</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs font-bold bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-purple-500 text-neutral-800 dark:text-neutral-200"
            >
              <option value="ALL">모든 상태</option>
              <option value="ACTIVE">정상 (ACTIVE)</option>
              <option value="SUSPENDED">정지 (SUSPENDED)</option>
            </select>
          </div>

        </div>

        {/* 3. User Table */}
        <div className="rounded-2xl bg-white dark:bg-[#0e0e12] border border-neutral-200/80 dark:border-white/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100/70 dark:bg-white/[0.02] border-b border-neutral-200 dark:border-white/10 font-black text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">회원 ID</th>
                  <th className="py-4 px-6">이름</th>
                  <th className="py-4 px-6">이메일</th>
                  <th className="py-4 px-6">역할 (권한)</th>
                  <th className="py-4 px-6">계정 상태</th>
                  <th className="py-4 px-6">가입 일자</th>
                  <th className="py-4 px-6 text-right">관리 액션</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-200/60 dark:divide-white/5 font-semibold">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-neutral-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-purple-500" />
                      회원 데이터를 불러오는 중입니다...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-neutral-400">
                      검색 조건에 일치하는 회원이 존재하지 않습니다.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-neutral-50 dark:hover:bg-white/[0.01] transition-colors">
                      <td className="py-4 px-6 font-mono text-neutral-400">#{user.id}</td>
                      <td className="py-4 px-6 font-bold">{user.name}</td>
                      <td className="py-4 px-6 font-mono text-neutral-600 dark:text-neutral-300">{user.email}</td>
                      <td className="py-4 px-6">{getRoleBadge(user.role)}</td>
                      <td className="py-4 px-6">{getStatusBadge(user.status)}</td>
                      <td className="py-4 px-6 text-neutral-400 font-mono text-[11px]">{user.createdAt}</td>
                      <td className="py-4 px-6 text-right space-x-2">
                        {/* Role Select */}
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                          className="px-2.5 py-1 text-[11px] font-bold bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg focus:outline-none"
                        >
                          <option value="ROLE_CUSTOMER">고객 전환</option>
                          <option value="ROLE_OWNER">사장님 전환</option>
                          <option value="ROLE_ADMIN">관리자 지정</option>
                        </select>

                        {/* Status Toggle Button */}
                        <button
                          onClick={() => handleToggleStatus(user)}
                          className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg border transition-colors ${
                            user.status === 'SUSPENDED'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                          }`}
                        >
                          {user.status === 'SUSPENDED' ? '정지 해제' : '계정 정지'}
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteTargetUser(user)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition-colors inline-flex items-center"
                          title="회원 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Delete Confirmation Modal */}
      {deleteTargetUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0e0e12] border border-neutral-200 dark:border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black">회원 삭제 확인</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium leading-relaxed">
                정말로 <span className="font-bold text-neutral-900 dark:text-white">{deleteTargetUser.name} ({deleteTargetUser.email})</span> 회원을 영구 삭제하시겠습니까? 삭제된 계정 정보는 복구할 수 없습니다.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTargetUser(null)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5"
              >
                취소
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-black rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
